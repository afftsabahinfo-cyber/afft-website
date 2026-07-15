export type AliceSessionPayload = {
  id: string;
  issuedAt: number;
  expiresAt: number;
  version: 1;
};

const SESSION_LIFETIME_SECONDS = 1800;
const CLOCK_SKEW_SECONDS = 60;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/gu, "-")
    .replace(/\//gu, "_")
    .replace(/=+$/gu, "");
}

function base64UrlToBytes(value: string) {
  if (!/^[A-Za-z0-9_-]+$/u.test(value)) {
    throw new Error("Invalid base64url value.");
  }

  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(value.replace(/-/gu, "+").replace(/_/gu, "/") + padding);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function importHmacKey(secret: string) {
  if (secret.length < 32) {
    throw new Error("Alice session secret is not configured.");
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export function parseAliceSession(value: string): AliceSessionPayload | null {
  try {
    const [payloadPart, signaturePart, extra] = value.split(".");
    if (!payloadPart || !signaturePart || extra) return null;

    const payload = JSON.parse(
      decoder.decode(base64UrlToBytes(payloadPart)),
    ) as Partial<AliceSessionPayload>;

    if (
      payload.version !== 1 ||
      typeof payload.id !== "string" ||
      !/^[0-9a-f-]{36}$/iu.test(payload.id) ||
      typeof payload.issuedAt !== "number" ||
      typeof payload.expiresAt !== "number" ||
      !Number.isInteger(payload.issuedAt) ||
      !Number.isInteger(payload.expiresAt)
    ) {
      return null;
    }

    return payload as AliceSessionPayload;
  } catch {
    return null;
  }
}

export async function createAliceSession(
  secret: string,
  options: { now?: number; id?: string } = {},
) {
  const nowSeconds = Math.floor((options.now ?? Date.now()) / 1000);
  const payload: AliceSessionPayload = {
    id: options.id ?? crypto.randomUUID(),
    issuedAt: nowSeconds,
    expiresAt: nowSeconds + SESSION_LIFETIME_SECONDS,
    version: 1,
  };
  const payloadPart = bytesToBase64Url(
    encoder.encode(JSON.stringify(payload)),
  );
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadPart),
  );

  return {
    value: `${payloadPart}.${bytesToBase64Url(new Uint8Array(signature))}`,
    payload,
  };
}

export async function verifyAliceSession(
  value: string,
  secret: string,
  now = Date.now(),
) {
  try {
    const [payloadPart, signaturePart, extra] = value.split(".");
    if (!payloadPart || !signaturePart || extra) return null;

    const payload = parseAliceSession(value);
    if (!payload) return null;

    const nowSeconds = Math.floor(now / 1000);
    const lifetime = payload.expiresAt - payload.issuedAt;
    if (
      payload.issuedAt > nowSeconds + CLOCK_SKEW_SECONDS ||
      payload.expiresAt <= nowSeconds ||
      lifetime !== SESSION_LIFETIME_SECONDS
    ) {
      return null;
    }

    const key = await importHmacKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signaturePart),
      encoder.encode(payloadPart),
    );

    return valid ? payload : null;
  } catch {
    return null;
  }
}

export const aliceSessionCookie = {
  name: "afft_alice_beta",
  maxAge: SESSION_LIFETIME_SECONDS,
};
