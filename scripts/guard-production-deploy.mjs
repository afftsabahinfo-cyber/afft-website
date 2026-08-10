import { execFileSync } from "node:child_process";

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function stop(message) {
  console.error(`Production deploy blocked: ${message}`);
  process.exit(1);
}

try {
  const status = git(["status", "--porcelain", "--untracked-files=normal"]);
  if (status) {
    stop("the worktree has uncommitted or untracked files.");
  }

  const head = git(["rev-parse", "HEAD"]);
  const remoteOutput = git([
    "ls-remote",
    "--exit-code",
    "origin",
    "refs/heads/main",
  ]);
  const remoteMain = remoteOutput.split(/\s+/u)[0] ?? "";

  if (!/^[0-9a-f]{40}$/u.test(remoteMain)) {
    stop("origin/main could not be verified.");
  }
  if (head !== remoteMain) {
    stop(
      `HEAD ${head.slice(0, 12)} is not the latest origin/main ${remoteMain.slice(0, 12)}. Fetch and switch to origin/main before deploying.`,
    );
  }

  console.log(
    `Production deploy guard passed: ${head.slice(0, 12)} matches origin/main.`,
  );
} catch {
  stop("the latest origin/main could not be verified safely.");
}
