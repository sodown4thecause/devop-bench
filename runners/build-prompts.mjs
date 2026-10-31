#!/usr/bin/env node
// Builds one ready-to-paste prompt per task: runners/CONTEXT.md + task.md + inputs/.
// Output: runners/prompts/<task-id>.md. Never includes rubric.yaml.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const context = readFileSync(path.join(root, "runners/CONTEXT.md"), "utf8");
const outDir = path.join(root, "runners/prompts");
mkdirSync(outDir, { recursive: true });

for (const id of readdirSync(path.join(root, "tasks")).filter((d) => /^T\d+/.test(d)).sort()) {
  const dir = path.join(root, "tasks", id);
  let body = readFileSync(path.join(dir, "task.md"), "utf8");
  const inputs = path.join(dir, "inputs");
  if (existsSync(inputs)) {
    for (const f of readdirSync(inputs).filter((f) => !f.startsWith(".")).sort()) {
      body += `\n\n--- ${f} ---\n${readFileSync(path.join(inputs, f), "utf8")}`;
    }
  }
  const prompt = `${context}\n---\n\n${body}`;
  writeFileSync(path.join(outDir, `${id}.md`), prompt);
  console.log(`wrote runners/prompts/${id}.md`);
}
