import { defineTool } from "eve/tools";
import { z } from "zod";
import { spawnSync } from "node:child_process";
import { fixtureRoot } from "../../lib/workspace";

// Read-only checks only. Anything that writes to git, the network or a database is not here.
const ALLOWED: Record<string, string[]> = {
  test: ["npx", "vitest", "run"],
  lint: ["npx", "eslint", ".", "--max-warnings", "0"],
  typecheck: ["npx", "tsc", "--noEmit"],
  build: ["npx", "next", "build"],
  git_log: ["git", "log", "--oneline", "-n", "30"],
  git_status: ["git", "status", "--short"],
  grep: ["git", "grep", "-n"],
};

export default defineTool({
  description:
    "Run an allow-listed, read-only check in the fixture: test, lint, typecheck, build, git_log, git_status, or grep (pass a pattern). Optional env overrides such as TZ or PINBOARD_REGION let you reproduce environment-dependent failures.",
  inputSchema: z.object({
    check: z.enum(["test", "lint", "typecheck", "build", "git_log", "git_status", "grep"]),
    pattern: z.string().optional(),
    env: z.record(z.string(), z.string()).optional(),
  }),
  async execute({ check, pattern, env }) {
    const [cmd, ...args] = ALLOWED[check];
    if (check === "grep") {
      if (!pattern) throw new Error("grep needs a pattern");
      args.push("--", pattern);
    }
    const res = spawnSync(cmd, args, {
      cwd: fixtureRoot(),
      env: { ...process.env, ...(env ?? {}) },
      encoding: "utf8",
      timeout: 180_000,
    });
    const output = `${res.stdout ?? ""}${res.stderr ?? ""}`;
    return { check, exitCode: res.status, output: output.slice(-12_000) };
  },
});
