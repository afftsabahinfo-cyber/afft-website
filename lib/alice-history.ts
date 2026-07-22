export const ALICE_HISTORY_MAX_MESSAGES = 8;
export const ALICE_HISTORY_MAX_CHARACTERS = 600;

export type AliceHistoryDisplayMessage = {
  role: "user" | "assistant";
  content: string;
  status: "pending" | "complete" | "failed";
};

export type AliceHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export function normalizeAliceHistoryContent(content: string) {
  const trimmed = content.trim();
  if (trimmed.length <= ALICE_HISTORY_MAX_CHARACTERS) return trimmed;

  return `${trimmed.slice(0, ALICE_HISTORY_MAX_CHARACTERS - 3)}...`;
}

export function buildAliceHistory(
  messages: AliceHistoryDisplayMessage[],
): AliceHistoryMessage[] {
  const completeTurns: AliceHistoryMessage[][] = [];

  for (let index = 0; index < messages.length - 1; index += 1) {
    const userMessage = messages[index];
    const assistantMessage = messages[index + 1];

    if (
      userMessage.role !== "user" ||
      assistantMessage.role !== "assistant" ||
      userMessage.status !== "complete" ||
      assistantMessage.status !== "complete"
    ) {
      continue;
    }

    const userContent = normalizeAliceHistoryContent(userMessage.content);
    const assistantContent = normalizeAliceHistoryContent(
      assistantMessage.content,
    );
    if (!userContent || !assistantContent) continue;

    completeTurns.push([
      { role: "user", content: userContent },
      { role: "assistant", content: assistantContent },
    ]);
    index += 1;
  }

  return completeTurns.slice(-4).flat();
}
