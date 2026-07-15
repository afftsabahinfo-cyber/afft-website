export type AliceHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AliceQuestionPayload = {
  question: string;
  history: AliceHistoryMessage[];
};

export type AlicePublicAnswer = {
  answer: string;
  needsHumanConfirmation: boolean;
  sources: Array<{ title: string; publicHref: string }>;
  suggestedQuestions: string[];
  handoff: { recommended: boolean; topic: string };
  knowledgeGap: {
    detected: boolean;
    category: string | null;
    topic: string | null;
  };
};

const allowedSourceRoutes = new Set([
  "/",
  "/camping",
  "/rent-it",
  "/private-tours",
  "/car-rental",
  "/camping-spots",
  "/faq",
]);

const allowedGapCategories = new Set([
  "Camping",
  "Rent It",
  "Tours",
  "Transport",
  "Camp Spots",
  "Booking Policy",
  "Safety",
  "Other",
]);

const forbiddenInput = /(?:https?:\/\/|www\.|<\/?[a-z][^>]*>|\b(?:data|file):)/iu;

export const aliceSecurityHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
};

export function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders: HeadersInit = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...aliceSecurityHeaders,
      ...extraHeaders,
    },
  });
}

function hasExactKeys(
  value: Record<string, unknown>,
  expected: string[],
) {
  const keys = Object.keys(value).sort();
  return (
    keys.length === expected.length &&
    expected.slice().sort().every((key, index) => key === keys[index])
  );
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;

  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return (
      originUrl.origin === requestUrl.origin &&
      (requestUrl.hostname === "afft.club" ||
        requestUrl.hostname === "www.afft.club") &&
      requestUrl.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export function validateAliceQuestionPayload(
  value: unknown,
): AliceQuestionPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (!hasExactKeys(record, ["history", "question"])) return null;

  const question =
    typeof record.question === "string" ? record.question.trim() : "";
  if (
    question.length < 2 ||
    question.length > 800 ||
    forbiddenInput.test(question) ||
    !Array.isArray(record.history) ||
    record.history.length > 4
  ) {
    return null;
  }

  const history: AliceHistoryMessage[] = [];
  for (const item of record.history) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const message = item as Record<string, unknown>;
    if (!hasExactKeys(message, ["content", "role"])) return null;

    const content =
      typeof message.content === "string" ? message.content.trim() : "";
    if (
      (message.role !== "user" && message.role !== "assistant") ||
      content.length < 1 ||
      content.length > 600 ||
      forbiddenInput.test(content)
    ) {
      return null;
    }
    history.push({
      role: message.role,
      content,
    });
  }

  return { question, history };
}

export function sanitizeHandoffTopic(value: unknown) {
  if (typeof value !== "string") return "AFFT outdoor enquiry";
  const sanitized = value
    .replace(/[\u0000-\u001f\u007f]/gu, " ")
    .replace(/[<>{}\[\]]/gu, " ")
    .replace(/https?:\/\/\S+/giu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, 250);
  return sanitized || "AFFT outdoor enquiry";
}

export function toPublicAliceAnswer(value: unknown): AlicePublicAnswer | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const source = value as Record<string, unknown>;
  const answer =
    typeof source.answer === "string" ? source.answer.trim().slice(0, 4000) : "";
  if (!answer) return null;

  const sources = Array.isArray(source.sources)
    ? source.sources
        .flatMap((item) => {
          if (!item || typeof item !== "object" || Array.isArray(item)) return [];
          const candidate = item as Record<string, unknown>;
          const title =
            typeof candidate.title === "string"
              ? candidate.title.trim().slice(0, 120)
              : "";
          const publicHref =
            typeof candidate.publicHref === "string"
              ? candidate.publicHref
              : "";
          return title && allowedSourceRoutes.has(publicHref)
            ? [{ title, publicHref }]
            : [];
        })
        .slice(0, 3)
    : [];

  const suggestedQuestions = Array.isArray(source.suggestedQuestions)
    ? source.suggestedQuestions
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim().slice(0, 160))
        .filter(Boolean)
        .slice(0, 4)
    : [];

  const handoffSource =
    source.handoff && typeof source.handoff === "object"
      ? (source.handoff as Record<string, unknown>)
      : {};
  const gapSource =
    source.knowledgeGap && typeof source.knowledgeGap === "object"
      ? (source.knowledgeGap as Record<string, unknown>)
      : {};
  const category =
    typeof gapSource.category === "string" &&
    allowedGapCategories.has(gapSource.category)
      ? gapSource.category
      : null;

  return {
    answer,
    needsHumanConfirmation: source.needsHumanConfirmation === true,
    sources,
    suggestedQuestions,
    handoff: {
      recommended: handoffSource.recommended === true,
      topic: sanitizeHandoffTopic(handoffSource.topic),
    },
    knowledgeGap: {
      detected: gapSource.detected === true,
      category,
      topic:
        gapSource.detected === true
          ? sanitizeHandoffTopic(gapSource.topic)
          : null,
    },
  };
}
