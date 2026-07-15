import {
  aliceSecurityHeaders,
  isSameOrigin,
  jsonResponse,
  toPublicAliceAnswer,
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
  ALICE_BETA_LABEL: string;
};

export type AliceApiDependencies = {
  fetcher: typeof fetch;
  now: () => number;
  randomUUID: () => string;
};

const defaultDependencies: AliceApiDependencies = {
  fetcher: fetch,
  now: Date.now,
  randomUUID: crypto.randomUUID.bind(crypto),
};

const allowedHostnames = new Set(["afft.club", "www.afft.club"]);
const maxBodyBytes = 12_000;
const turnstileAction = "alice_chat";
const roleName = "AFFT AI Outdoor Advisor";

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

async function validateTurnstile(
  token: string,
  request: Request,
  env: AliceWorkerEnv,
  dependencies: AliceApiDependencies,
) {
  const body = new FormData();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await dependencies.fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (!response.ok) return false;

    const result = (await response.json()) as {
      success?: boolean;
      hostname?: string;
      action?: string;
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
          10_000,
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

    return jsonResponse(answer);
  } catch {
    return safeFailure(
      "Alice is temporarily offline. Please try again or contact AFFT on WhatsApp.",
      503,
    );
  }
}

function handleConfig(env: AliceWorkerEnv) {
  const label = env.ALICE_BETA_LABEL || "Beta";
  return jsonResponse({
    enabled: isEnabled(env),
    siteKey: env.ALICE_TURNSTILE_SITE_KEY,
    name: "Alice Li",
    role: `${roleName} \u00b7 ${label}`,
  });
}

export async function handleAliceRequest(
  request: Request,
  env: AliceWorkerEnv,
  dependencies: AliceApiDependencies = defaultDependencies,
) {
  const path = new URL(request.url).pathname;

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
  fetch: handleAliceRequest,
};

export default aliceApiWorker;
