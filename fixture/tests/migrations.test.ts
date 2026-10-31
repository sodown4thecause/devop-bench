import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");
const migrationsSql = readdirSync(path.join(root, "db/migrations"))
  .filter((f) => f.endsWith(".sql"))
  .map((f) => readFileSync(path.join(root, "db/migrations", f), "utf8"))
  .join("\n");

function columnsUsedOnPins(source: string): string[] {
  const cols = new Set<string>();
  for (const m of source.matchAll(/FROM pins WHERE ([^"]+?)(ORDER|"|$)/g)) {
    for (const c of m[1].matchAll(/([a-z_]+)\s*(=|IS)/g)) cols.add(c[1]);
  }
  return [...cols];
}

describe("schema", () => {
  it("every pins column the repo filters on exists in a migration", () => {
    const repo = readFileSync(path.join(root, "lib/repo.ts"), "utf8");
    for (const col of columnsUsedOnPins(repo)) {
      expect(migrationsSql, `column pins.${col} missing from migrations`).toMatch(new RegExp(`\\b${col}\\b`));
    }
  });
});
