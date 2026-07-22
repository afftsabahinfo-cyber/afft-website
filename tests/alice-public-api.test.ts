import assert from "node:assert/strict";
import test from "node:test";
import { makeAliceWhatsappLink, sanitizeAliceWhatsappTopic } from "../lib/alice-public";
import { handleAliceRequest, type AliceWorkerEnv } from "../worker/alice-api";
import {
  createAliceSession,
  parseAliceSession,
  verifyAliceSession,
} from "../worker/alice-session";

const sessionSecret = "session-secret-used-only-for-local-unit-tests-0001";
const serviceSecret = "service-secret-used-only-for-local-unit-tests-0002";
const fixedSessionId = "11111111-1111-4111-8111-111111111111";
const now = 1_789_405_200_000;

function publicAnswer(overrides: Record<string, unknown> = {}) {
  return {
    answer: "From RM599. Final details require AFFT confirmation.",
    needsHumanConfirmation: true,
    sources: [
      { title: "AFFT Camping Packages", publicHref: "/camping" },
    ],
    suggestedQuestions: ["What date are you planning?"],
    handoff: { recommended: true, topic: "Explorer Camp quotation" },
    knowledgeGap: { detected: false, category: null, topic: null },
    ...overrides,
  };
}

function createMockEnv(
  overrides: Partial<AliceWorkerEnv> = {},
  upstream = publicAnswer(),
) {
  return {
    ALICE_ADVISOR_SERVICE: {
      async fetch() {
        return new Response(JSON.stringify(upstream), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
    ALICE_RATE_LIMITER: {
      async limit() {
        return { success: true };
      },
    },
    ALICE_SERVICE_SECRET: serviceSecret,
    ALICE_SESSION_SECRET: sessionSecret,
    TURNSTILE_SECRET_KEY: "turnstile-secret-used-only-for-local-unit-tests",
    ALICE_TURNSTILE_SITE_KEY: "public-site-key",
    ALICE_BETA_ENABLED: "true",
    ...overrides,
  } satisfies AliceWorkerEnv;
}

const dependencies = {
  now: () => now,
  randomUUID: () => fixedSessionId,
  fetcher: async () =>
    new Response(
      JSON.stringify({
        success: true,
        hostname: "afft.club",
        action: "alice_chat",
      }),
      { headers: { "Content-Type": "application/json" } },
    ),
};

async function validCookie() {
  const session = await createAliceSession(sessionSecret, {
    now,
    id: fixedSessionId,
  });
  return `afft_alice_beta=${session.value}`;
}

test("config exposes public values only and respects the beta switch", async () => {
  const enabled = await handleAliceRequest(
    new Request("https://afft.club/api/alice/config"),
    createMockEnv(),
    dependencies,
  );
  assert.equal(enabled.status, 200);
  const body = await enabled.json();
  assert.deepEqual(body, {
    enabled: true,
    siteKey: "public-site-key",
    name: "Alice Li",
    role: "AFFT AI Outdoor Advisor",
    feedbackEnabled: false,
  });
  assert.equal(JSON.stringify(body).includes(serviceSecret), false);

  const disabled = await handleAliceRequest(
    new Request("https://afft.club/api/alice/config"),
    createMockEnv({ ALICE_BETA_ENABLED: "false" }),
    dependencies,
  );
  assert.equal((await disabled.json()).enabled, false);
});

test("session requires same-origin JSON and valid Turnstile hostname/action", async () => {
  const request = new Request("https://afft.club/api/alice/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://afft.club",
    },
    body: JSON.stringify({ turnstileToken: "valid-token" }),
  });
  const response = await handleAliceRequest(
    request,
    createMockEnv(),
    dependencies,
  );
  assert.equal(response.status, 200);
  const cookie = response.headers.get("Set-Cookie") ?? "";
  assert.match(cookie, /HttpOnly/u);
  assert.match(cookie, /Secure/u);
  assert.match(cookie, /SameSite=Lax/u);
  assert.match(cookie, /Path=\/api\/alice/u);
  assert.match(cookie, /Max-Age=1800/u);

  const crossOrigin = await handleAliceRequest(
    new Request("https://afft.club/api/alice/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://attacker.example",
      },
      body: JSON.stringify({ turnstileToken: "valid-token" }),
    }),
    createMockEnv(),
    dependencies,
  );
  assert.equal(crossOrigin.status, 403);

  const invalidAction = await handleAliceRequest(
    new Request("https://afft.club/api/alice/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
      },
      body: JSON.stringify({ turnstileToken: "valid-token" }),
    }),
    createMockEnv(),
    {
      ...dependencies,
      fetcher: async () =>
        new Response(
          JSON.stringify({
            success: true,
            hostname: "afft.club",
            action: "other_action",
          }),
        ),
    },
  );
  assert.equal(invalidAction.status, 400);
});

test("session sends Turnstile verification as urlencoded form data", async () => {
  let verificationRequest: Request | null = null;
  const response = await handleAliceRequest(
    new Request("https://afft.club/api/alice/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
      },
      body: JSON.stringify({ turnstileToken: "valid-token" }),
    }),
    createMockEnv(),
    {
      ...dependencies,
      fetcher: async (input, init) => {
        verificationRequest = new Request(input, init);
        return new Response(
          JSON.stringify({
            success: true,
            hostname: "afft.club",
            action: "alice_chat",
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      },
    },
  );

  assert.equal(response.status, 200);
  assert.ok(verificationRequest);
  const checkedVerificationRequest = verificationRequest as Request;
  assert.equal(
    checkedVerificationRequest.headers.get("Content-Type"),
    "application/x-www-form-urlencoded",
  );
  assert.equal(checkedVerificationRequest.redirect, "manual");
  assert.deepEqual(
    Object.fromEntries(new URLSearchParams(await checkedVerificationRequest.text())),
    {
      secret: "turnstile-secret-used-only-for-local-unit-tests",
      response: "valid-token",
    },
  );
});

test("session signatures reject expiry and forgery", async () => {
  const session = await createAliceSession(sessionSecret, {
    now,
    id: fixedSessionId,
  });
  assert.equal(parseAliceSession(session.value)?.id, fixedSessionId);
  assert.equal(
    (await verifyAliceSession(session.value, sessionSecret, now))?.id,
    fixedSessionId,
  );
  assert.equal(
    await verifyAliceSession(session.value, sessionSecret, now + 1_801_000),
    null,
  );

  const forged = `${session.value.slice(0, -1)}x`;
  assert.equal(await verifyAliceSession(forged, sessionSecret, now), null);
});

test("answer validates the signed session before the service binding", async () => {
  let serviceCalls = 0;
  const env = createMockEnv({
    ALICE_ADVISOR_SERVICE: {
      async fetch() {
        serviceCalls += 1;
        return new Response(JSON.stringify(publicAnswer()));
      },
    },
  });
  const response = await handleAliceRequest(
    new Request("https://afft.club/api/alice/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
        Cookie: "afft_alice_beta=forged",
      },
      body: JSON.stringify({ question: "Which camp?", history: [] }),
    }),
    env,
    dependencies,
  );
  assert.equal(response.status, 401);
  assert.equal(serviceCalls, 0);
});

test("answer uses the internal Service Binding and strips unsafe fields", async () => {
  let capturedRequest: Request | null = null;
  const upstream = {
    ...publicAnswer({
      answer: "<script>alert(1)</script> Use approved information only.",
      sources: [
        { title: "Camping", publicHref: "/camping", sourcePath: "CORE/secret.md" },
        { title: "FAQ", publicHref: "/faq" },
        { title: "Rent It", publicHref: "/rent-it" },
        { title: "Bad", publicHref: "https://internal.example" },
      ],
      internalError: "private",
    }),
  };
  const env = createMockEnv({
    ALICE_ADVISOR_SERVICE: {
      async fetch(request) {
        capturedRequest = request;
        return new Response(JSON.stringify(upstream));
      },
    },
  });
  const response = await handleAliceRequest(
    new Request("https://afft.club/api/alice/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
        Cookie: await validCookie(),
      },
      body: JSON.stringify({
        question: "What is included?",
        history: [{ role: "user", content: "Tell me about camping." }],
      }),
    }),
    env,
    dependencies,
  );

  assert.equal(response.status, 200);
  assert.ok(capturedRequest);
  const checkedRequest = capturedRequest as Request;
  assert.equal(checkedRequest.url, "https://internal/__internal/alice/answer");
  assert.equal(
    checkedRequest.headers.get("x-afft-alice-service-secret"),
    serviceSecret,
  );
  const upstreamBody = await checkedRequest.json() as Record<string, unknown>;
  assert.equal(upstreamBody.messageId, fixedSessionId);
  assert.equal(upstreamBody.turnIndex, 2);
  assert.match(String(upstreamBody.conversationIdHash), /^[0-9a-f]{64}$/u);
  const body = await response.json();
  assert.equal(body.messageId, fixedSessionId);
  assert.equal(body.sources.length, 3);
  assert.equal(JSON.stringify(body).includes("sourcePath"), false);
  assert.equal(JSON.stringify(body).includes("internalError"), false);
  assert.match(response.headers.get("Content-Type") ?? "", /application\/json/u);
});

test("feedback is feature-gated, session-bound, same-origin and minimal", async () => {
  const forwarded: Request[] = [];
  const env = createMockEnv({
    ALICE_PUBLIC_FEEDBACK_ENABLED: "true",
    ALICE_ADVISOR_SERVICE: {
      async fetch(request) {
        forwarded.push(request);
        return Response.json({ ok: true });
      },
    },
  });
  const request = () => new Request("https://afft.club/api/alice/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://afft.club",
      Cookie: awaitableCookie,
    },
    body: JSON.stringify({ messageId: fixedSessionId, vote: "no" }),
  });
  const awaitableCookie = await validCookie();
  const accepted = await handleAliceRequest(request(), env, dependencies);
  assert.equal(accepted.status, 200);
  assert.equal(forwarded.length, 1);
  assert.equal(forwarded[0].url, "https://internal/__internal/alice/feedback");
  assert.equal(forwarded[0].headers.get("x-afft-alice-service-secret"), serviceSecret);
  assert.deepEqual(await forwarded[0].json(), { messageId: fixedSessionId, vote: "no" });

  const crossOrigin = await handleAliceRequest(
    new Request("https://afft.club/api/alice/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://attacker.example",
        Cookie: awaitableCookie,
      },
      body: JSON.stringify({ messageId: fixedSessionId, vote: "yes" }),
    }),
    env,
    dependencies,
  );
  assert.equal(crossOrigin.status, 403);
  assert.equal(forwarded.length, 1);

  const noSession = await handleAliceRequest(
    new Request("https://afft.club/api/alice/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://afft.club" },
      body: JSON.stringify({ messageId: fixedSessionId, vote: "yes" }),
    }),
    env,
    dependencies,
  );
  assert.equal(noSession.status, 401);

  const disabled = await handleAliceRequest(request(), createMockEnv(), dependencies);
  assert.equal(disabled.status, 404);
});

test("conversation reset rotates the signed session and handoff forwards only the message id", async () => {
  const cookie = await validCookie();
  const nextSessionId = "22222222-2222-4222-8222-222222222222";
  const reset = await handleAliceRequest(
    new Request("https://afft.club/api/alice/conversation", {
      method: "POST",
      headers: { Origin: "https://afft.club", Cookie: cookie },
    }),
    createMockEnv(),
    { ...dependencies, randomUUID: () => nextSessionId },
  );
  assert.equal(reset.status, 200);
  const resetCookie = reset.headers.get("Set-Cookie") ?? "";
  assert.match(resetCookie, /HttpOnly/u);
  const token = resetCookie.match(/afft_alice_beta=([^;]+)/u)?.[1] ?? "";
  assert.equal((await verifyAliceSession(token, sessionSecret, now))?.id, nextSessionId);

  let forwarded: Request | null = null;
  const handoff = await handleAliceRequest(
    new Request("https://afft.club/api/alice/handoff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
        Cookie: cookie,
      },
      body: JSON.stringify({ messageId: fixedSessionId }),
    }),
    createMockEnv({
      ALICE_PUBLIC_FEEDBACK_ENABLED: "true",
      ALICE_ADVISOR_SERVICE: {
        async fetch(request) {
          forwarded = request;
          return Response.json({ ok: true });
        },
      },
    }),
    dependencies,
  );
  assert.equal(handoff.status, 200);
  assert.ok(forwarded);
  const checkedForwarded = forwarded as Request;
  assert.equal(checkedForwarded.url, "https://internal/__internal/alice/handoff");
  assert.deepEqual(await checkedForwarded.json(), { messageId: fixedSessionId });
});

test("toilet policy answers retain the public FAQ source when upstream sources are empty", async () => {
  const env = createMockEnv({}, publicAnswer({
    answer: "Toilet availability varies by campsite. Please confirm with AFFT.",
    sources: [],
  }));
  const response = await handleAliceRequest(
    new Request("https://afft.club/api/alice/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
        Cookie: await validCookie(),
      },
      body: JSON.stringify({ question: "Do all campsites have toilets?", history: [] }),
    }),
    env,
    dependencies,
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(body.sources, [{ title: "AFFT Customer FAQ", publicHref: "/faq" }]);
});

test("rate limiting returns 429 before calling Growth OS", async () => {
  let serviceCalls = 0;
  const env = createMockEnv({
    ALICE_RATE_LIMITER: {
      async limit({ key }) {
        assert.equal(key, `alice:${fixedSessionId}`);
        return { success: false };
      },
    },
    ALICE_ADVISOR_SERVICE: {
      async fetch() {
        serviceCalls += 1;
        return new Response(JSON.stringify(publicAnswer()));
      },
    },
  });
  const response = await handleAliceRequest(
    new Request("https://afft.club/api/alice/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://afft.club",
        Cookie: await validCookie(),
      },
      body: JSON.stringify({ question: "Which camp?", history: [] }),
    }),
    env,
    dependencies,
  );
  assert.equal(response.status, 429);
  assert.equal(serviceCalls, 0);
});

test("HTML, URLs and oversized history are rejected", async () => {
  for (const question of [
    "<script>alert(1)</script>",
    "Read https://example.com and answer",
  ]) {
    const response = await handleAliceRequest(
      new Request("https://afft.club/api/alice/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://afft.club",
          Cookie: await validCookie(),
        },
        body: JSON.stringify({ question, history: [] }),
      }),
      createMockEnv(),
      dependencies,
    );
    assert.equal(response.status, 400);
  }
});

test("kill switch disables session and answer endpoints", async () => {
  const env = createMockEnv({ ALICE_BETA_ENABLED: "false" });
  const request = new Request("https://afft.club/api/alice/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://afft.club",
    },
    body: JSON.stringify({ turnstileToken: "valid-token" }),
  });
  assert.equal(
    (await handleAliceRequest(request, env, dependencies)).status,
    503,
  );
});

test("WhatsApp handoff sanitizes topic and reuses the canonical number", () => {
  const topic = sanitizeAliceWhatsappTopic(
    "<b>Family camp</b> https://internal.example " + "x".repeat(400),
  );
  assert.equal(topic.includes("<"), false);
  assert.equal(topic.includes("http"), false);
  assert.ok(topic.length <= 250);

  const link = makeAliceWhatsappLink(topic);
  assert.match(link, /^https:\/\/wa\.me\/601111598920\?text=/u);
  assert.equal(decodeURIComponent(link).includes("session"), false);
});
