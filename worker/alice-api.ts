import {
  aliceSecurityHeaders,
  isSameOrigin,
  jsonResponse,
  toPublicAliceAnswer,
  type AlicePublicAnswer,
  validateAliceQuestionPayload,
} from "./alice-contract";
import {
  aliceSessionCookie,
  createAliceSession,
  verifyAliceSession,
} from "./alice-session";

export type AliceWorkerEnv = {
  ALICE_ADVISOR_SERVICE: {
    fetch(request: Request): Promise<Response>;
  };
  ALICE_RATE_LIMITER: {
    limit(input: { key: string }): Promise<{ success: boolean }>;
  };
  ALICE_SERVICE_SECRET: string;
  ALICE_SESSION_SECRET: string;
  TURNSTILE_SECRET_KEY: string;
  ALICE_TURNSTILE_SITE_KEY: string;
  ALICE_BETA_ENABLED: string;
  AIP_WEBSITE_CATALOG_SECRET: string;
};

export type AliceApiDependencies = {
  fetcher: typeof fetch;
  now: () => number;
  randomUUID: () => string;
};

const defaultDependencies: AliceApiDependencies = {
  fetcher: globalThis.fetch.bind(globalThis),
  now: Date.now,
  randomUUID: crypto.randomUUID.bind(crypto),
};

const allowedHostnames = new Set(["afft.club", "www.afft.club"]);
const maxBodyBytes = 12_000;
const turnstileAction = "alice_chat";
const roleName = "AFFT AI Outdoor Advisor";
const aliceServiceTimeoutMs = 30_000;

function isEnabled(env: AliceWorkerEnv) {
  return env.ALICE_BETA_ENABLED.toLowerCase() === "true";
}

function isJsonRequest(request: Request) {
  return request.headers
    .get("Content-Type")
    ?.toLowerCase()
    .startsWith("application/json");
}

async function readJsonBody(
  request: Request,
): Promise<Record<string, unknown> | null> {
  const declaredLength = Number(request.headers.get("Content-Length") ?? "0");
  if (
    !isJsonRequest(request) ||
    (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes)
  ) {
    return null;
  }

  try {
    const text = await request.text();
    if (!text || new TextEncoder().encode(text).byteLength > maxBodyBytes) {
      return null;
    }
    const value = JSON.parse(text) as unknown;
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const [key, ...valueParts] = part.trim().split("=");
    if (key === name) return valueParts.join("=");
  }
  return "";
}

function expiredSessionCookie() {
  return [
    `${aliceSessionCookie.name}=`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/api/alice",
    "Max-Age=0",
  ].join("; ");
}

function safeFailure(message: string, status: number, headers: HeadersInit = {}) {
  return jsonResponse({ error: message }, status, headers);
}

function ensurePublicPolicySource(question: string, answer: AlicePublicAnswer) {
  if (
    answer.sources.length > 0 ||
    !/(?:toilets?|toilet facilities?|campsite facilities?|厕所|设施)/iu.test(
      question,
    )
  ) {
    return answer;
  }

  return {
    ...answer,
    sources: [{ title: "AFFT Customer FAQ", publicHref: "/faq" }],
  };
}

async function validateTurnstile(
  token: string,
  request: Request,
  env: AliceWorkerEnv,
  dependencies: AliceApiDependencies,
) {
  const body = new URLSearchParams();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await dependencies.fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        cache: "no-store",
        // Workers does not implement redirect: "error"; manual never follows it.
        redirect: "manual",
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (!response.ok) return false;

    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
      action?: string;
      [key: string]: unknown;
    };
    return (
      result.success === true &&
      typeof result.hostname === "string" &&
      allowedHostnames.has(result.hostname) &&
      result.action === turnstileAction
    );
  } catch {
    return false;
  }
}

async function handleSession(
  request: Request,
  env: AliceWorkerEnv,
  dependencies: AliceApiDependencies,
) {
  if (!isEnabled(env)) {
    return safeFailure("Alice is temporarily unavailable.", 503);
  }
  if (request.method !== "POST" || !isSameOrigin(request)) {
    return safeFailure("Request not accepted.", 403);
  }

  const body = await readJsonBody(request);
  const keys = body ? Object.keys(body) : [];
  const token =
    body && keys.length === 1 && keys[0] === "turnstileToken"
      ? body.turnstileToken
      : null;
  if (
    typeof token !== "string" ||
    token.length < 1 ||
    token.length > 2048 ||
    !(await validateTurnstile(token, request, env, dependencies))
  ) {
    return safeFailure("Verification failed. Please try again.", 400);
  }

  try {
    const session = await createAliceSession(env.ALICE_SESSION_SECRET, {
      now: dependencies.now(),
      id: dependencies.randomUUID(),
    });
    const cookie = [
      `${aliceSessionCookie.name}=${session.value}`,
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Path=/api/alice",
      `Max-Age=${aliceSessionCookie.maxAge}`,
    ].join("; ");

    return jsonResponse(
      { ok: true, expiresIn: aliceSessionCookie.maxAge },
      200,
      { "Set-Cookie": cookie },
    );
  } catch {
    return safeFailure("Alice is temporarily unavailable.", 503);
  }
}

async function fetchAliceService(
  requestBody: string,
  env: AliceWorkerEnv,
) {
  const upstreamRequest = new Request(
    "https://internal/__internal/alice/answer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-afft-alice-service-secret": env.ALICE_SERVICE_SECRET,
      },
      body: requestBody,
    },
  );

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      env.ALICE_ADVISOR_SERVICE.fetch(upstreamRequest),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error("Alice service timeout.")),
          aliceServiceTimeoutMs,
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function handleAnswer(
  request: Request,
  env: AliceWorkerEnv,
  dependencies: AliceApiDependencies,
) {
  if (!isEnabled(env)) {
    return safeFailure("Alice is temporarily unavailable.", 503);
  }
  if (request.method !== "POST" || !isSameOrigin(request)) {
    return safeFailure("Request not accepted.", 403);
  }

  const cookieValue = getCookie(request, aliceSessionCookie.name);
  const session = await verifyAliceSession(
    cookieValue,
    env.ALICE_SESSION_SECRET,
    dependencies.now(),
  );
  if (!session) {
    return safeFailure(
      "Please verify again to continue.",
      401,
      { "Set-Cookie": expiredSessionCookie() },
    );
  }

  const body = await readJsonBody(request);
  const payload = validateAliceQuestionPayload(body);
  if (!payload) {
    return safeFailure("Please enter a valid question.", 400);
  }

  const rateLimit = await env.ALICE_RATE_LIMITER.limit({
    key: `alice:${session.id}`,
  });
  if (!rateLimit.success) {
    return safeFailure(
      "Alice has received several questions in a short time. Please wait a moment and try again.",
      429,
    );
  }

  try {
    const upstream = await fetchAliceService(JSON.stringify(payload), env);
    if (!upstream.ok) {
      return safeFailure(
        "Alice could not complete that answer. Please try again or contact AFFT.",
        502,
      );
    }

    const text = await upstream.text();
    if (text.length > 32_000) {
      return safeFailure("Alice returned an invalid response.", 502);
    }
    const answer = toPublicAliceAnswer(JSON.parse(text) as unknown);
    if (!answer) {
      return safeFailure("Alice returned an invalid response.", 502);
    }

    return jsonResponse(ensurePublicPolicySource(payload.question, answer));
  } catch {
    return safeFailure(
      "Alice is temporarily offline. Please try again or contact AFFT on WhatsApp.",
      503,
    );
  }
}

async function handleRentItCatalog(request: Request, env: AliceWorkerEnv) {
  if (request.method !== "GET") {
    return safeFailure("Not found.", 404);
  }

  const secret = env.AIP_WEBSITE_CATALOG_SECRET;
  if (!secret) return safeFailure("Catalog temporarily unavailable.", 503);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const upstream = await Promise.race([
      env.ALICE_ADVISOR_SERVICE.fetch(
        new Request("https://internal/__internal/aip/public/rent-it", {
          method: "GET",
          headers: { "x-afft-website-catalog-secret": secret },
          signal: controller.signal,
        }),
      ),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Catalog service timeout.")), 10_000);
      }),
    ]);
    if (!upstream.ok) return safeFailure("Catalog temporarily unavailable.", 503);
    const text = await upstream.text();
    if (text.length > 1_000_000) return safeFailure("Catalog returned an invalid response.", 502);
    const payload = JSON.parse(text) as { version?: unknown; updatedAt?: unknown; products?: unknown };
    if (!Array.isArray(payload.products)) return safeFailure("Catalog returned an invalid response.", 502);
    return jsonResponse(
      { version: payload.version ?? null, updatedAt: payload.updatedAt ?? null, products: payload.products },
      200,
      {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex",
      },
    );
  } catch {
    return safeFailure("Catalog temporarily unavailable.", 503);
  } finally {
    clearTimeout(timeout);
  }
}
function handleConfig(env: AliceWorkerEnv) {
  return jsonResponse({
    enabled: isEnabled(env),
    siteKey: env.ALICE_TURNSTILE_SITE_KEY,
    name: "Alice Li",
    role: roleName,
  });
}

export async function handleAliceRequest(
  request: Request,
  env: AliceWorkerEnv,
  dependencies: AliceApiDependencies = defaultDependencies,
) {
  const path = new URL(request.url).pathname;

  if (path === "/api/rent-it/catalog") {
    return handleRentItCatalog(request, env);
  }
  if (path === "/api/alice/config" && request.method === "GET") {
    return handleConfig(env);
  }
  if (path === "/api/alice/session") {
    return handleSession(request, env, dependencies);
  }
  if (path === "/api/alice/answer") {
    return handleAnswer(request, env, dependencies);
  }

  return new Response("Not found", {
    status: 404,
    headers: aliceSecurityHeaders,
  });
}

const aliceApiWorker = {
  fetch(request: Request, env: AliceWorkerEnv) {
    return handleAliceRequest(request, env);
  },
};

export default aliceApiWorker;
