import assert from "node:assert/strict";
import test from "node:test";
import {
  canStartAliceRequest,
  createAliceRequestGuard,
  updateAliceQuestion,
  validateAliceQuestion,
} from "../lib/alice-advisor-state";

test("blank Alice questions are rejected before an API request", () => {
  assert.equal(validateAliceQuestion(""), "Please enter a question.");
  assert.equal(validateAliceQuestion("   ", true), "\u8bf7\u8f93\u5165\u95ee\u9898\u3002");
  assert.equal(validateAliceQuestion("A"), "Please enter at least 2 characters.");
  assert.equal(validateAliceQuestion("valid question"), null);
});

test("typing clears the current error without changing the input value", () => {
  assert.deepEqual(updateAliceQuestion("Previous request failed.", "Sabah"), {
    value: "Sabah",
    error: "",
  });
  assert.deepEqual(updateAliceQuestion("", "Sabah"), {
    value: "Sabah",
    error: "",
  });
});

test("request guard blocks duplicates and ignores stale responses", () => {
  const guard = createAliceRequestGuard();
  assert.equal(canStartAliceRequest(false, true), true);
  assert.equal(canStartAliceRequest(true, true), false);
  assert.equal(canStartAliceRequest(false, false), false);

  const first = guard.start();
  const second = guard.start();
  assert.equal(guard.isCurrent(first), false);
  assert.equal(guard.isCurrent(second), true);
  guard.invalidate();
  assert.equal(guard.isCurrent(second), false);
});
