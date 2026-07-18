export function validateAliceQuestion(
  rawQuestion: string,
  chinese = false,
): string | null {
  const length = rawQuestion.trim().length;
  if (length === 0) {
    return chinese ? "\u8bf7\u8f93\u5165\u95ee\u9898\u3002" : "Please enter a question.";
  }
  if (length < 2) {
    return chinese
      ? "\u8bf7\u8f93\u5165\u81f3\u5c11 2 \u4e2a\u5b57\u7b26\u3002"
      : "Please enter at least 2 characters.";
  }
  if (length > 800) {
    return chinese
      ? "\u95ee\u9898\u4e0d\u80fd\u8d85\u8fc7 800 \u4e2a\u5b57\u7b26\u3002"
      : "Your question must be 800 characters or fewer.";
  }
  return null;
}

export function updateAliceQuestion(
  currentError: string,
  value: string,
): { value: string; error: string } {
  return { value, error: currentError ? "" : currentError };
}

export function canStartAliceRequest(
  sending: boolean,
  sessionReady: boolean,
): boolean {
  return !sending && sessionReady;
}

export function createAliceRequestGuard() {
  let currentSequence = 0;

  return {
    start() {
      currentSequence += 1;
      return currentSequence;
    },
    invalidate() {
      currentSequence += 1;
    },
    isCurrent(sequence: number) {
      return sequence === currentSequence;
    },
  };
}
