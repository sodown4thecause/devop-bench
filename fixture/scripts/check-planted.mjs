#!/usr/bin/env node
// Verifies the fixture is in its known "planted" state: the tests that are
// SUPPOSED to fail do fail, the skipped test is still skipped, and nothing else
// broke. CI uses this so the repo stays green while the fixture stays buggy.
import { execSync, spawnSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";

const expected = JSON.parse(readFileSync(new URL("../planted.json", import.meta.url), "utf8"));
const env = { ...process.env, TZ: "UTC" };
delete env.PINBOARD_REGION;

const out = "/tmp/pinboard-vitest.json";
rmSync(out, { force: true });
spawnSync("npx", ["vitest", "run", "--reporter=json", `--outputFile=${out}`], { env, stdio: "inherit" });
const report = JSON.parse(readFileSync(out, "utf8"));

const failed = [], skipped = [], passed = [];
for (const file of report.testResults) {
  for (const t of file.assertionResults) {
    const name = t.fullName;
    if (t.status === "failed") failed.push(name);
    else if (t.status === "pending" || t.status === "skipped") skipped.push(name);
    else if (t.status === "passed") passed.push(name);
  }
}

const flaky = new Set(expected.flaky_or_env_dependent);
const problems = [];
for (const name of expected.must_fail) if (!failed.includes(name)) problems.push(`expected to FAIL but did not: ${name}`);
for (const name of expected.must_skip) if (!skipped.includes(name)) problems.push(`expected to be SKIPPED but was not: ${name}`);
for (const name of failed) if (!expected.must_fail.includes(name) && !flaky.has(name)) problems.push(`unexpected failure: ${name}`);

let lintFailed = false;
try {
  execSync("npx eslint . --max-warnings 0", { stdio: "pipe" });
} catch {
  lintFailed = true;
}
if (expected.lint_must_fail && !lintFailed) problems.push("expected lint to fail (planted unused vars) but it passed");

console.log(`\nplanted-state check: ${passed.length} passed, ${failed.length} failed, ${skipped.length} skipped, lint ${lintFailed ? "failed (expected)" : "passed"}`);
if (problems.length) {
  console.error("Fixture drifted from its planted state:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("OK: fixture matches its planted state.");
