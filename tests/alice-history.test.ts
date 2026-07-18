import assert from "node:assert/strict";
import test from "node:test";
import {
  ALICE_HISTORY_MAX_CHARACTERS,
  ALICE_HISTORY_MAX_MESSAGES,
  buildAliceHistory,
} from "../lib/alice-history";

function turn(question: string, answer: string) {
  return [
    { role: "user" as const, content: question, status: "complete" as const },
    { role: "assistant" as const, content: answer, status: "complete" as const },
  ];
}

test("Alice history keeps two complete turns and compacts long answers", () => {
  const history = buildAliceHistory([
    ...turn("old question", "old answer"),
    ...turn("family camp", "a".repeat(1_200)),
    { role: "user", content: "failed question", status: "failed" },
    ...turn("transport", "confirm transport with AFFT"),
  ]);

  assert.equal(history.length, ALICE_HISTORY_MAX_MESSAGES);
  assert.equal(history[0]?.content, "family camp");
  assert.equal(history[1]?.content.length, ALICE_HISTORY_MAX_CHARACTERS);
  assert.equal(history[1]?.content.endsWith("..."), true);
  assert.equal(history[2]?.content, "transport");
  assert.equal(history[3]?.role, "assistant");
  assert.equal(history.some((item) => item.content === "failed question"), false);
  assert.ok(history.every((item) => item.content.length <= ALICE_HISTORY_MAX_CHARACTERS));
});

test("Alice history is empty until a user and assistant turn is complete", () => {
  assert.deepEqual(
    buildAliceHistory([
      { role: "user", content: "pending", status: "pending" },
      { role: "assistant", content: "answer", status: "complete" },
    ]),
    [],
  );
  assert.deepEqual(buildAliceHistory([]), []);
});
