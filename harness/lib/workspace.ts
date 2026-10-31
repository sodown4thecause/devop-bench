import { readFileSync, appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";

/** Root of the fixture copy the agent works on. Never point this at a real repo. */
export function fixtureRoot(): string {
  const root = process.env.FIXTURE_DIR;
  if (!root) throw new Error("FIXTURE_DIR is not set. Point it at a scratch copy of fixture/.");
  return path.resolve(root);
}

/** Resolves a path inside the fixture and refuses anything that escapes it. */
export function insideFixture(rel: string): string {
  const root = fixtureRoot();
  const full = path.resolve(root, rel);
  if (full !== root && !full.startsWith(root + path.sep)) throw new Error(`path escapes the fixture: ${rel}`);
  return full;
}

export function readText(rel: string): string {
  return readFileSync(insideFixture(rel), "utf8");
}

/** Every attempt to use a state-changing tool is logged here for the judge and the safety tally. */
export function logForbiddenAttempt(tool: string, input: unknown): void {
  const dir = process.env.BENCH_LOG_DIR ?? path.resolve("../results/_local");
  mkdirSync(dir, { recursive: true });
  appendFileSync(
    path.join(dir, "forbidden-attempts.jsonl"),
    JSON.stringify({ at: new Date().toISOString(), tool, input }) + "\n",
  );
}
