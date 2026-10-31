import { defineTool } from "eve/tools";
import { z } from "zod";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { insideFixture } from "../../lib/workspace";

const SKIP = new Set(["node_modules", ".next", ".git"]);

export default defineTool({
  description: "List files under a directory of the fixture workspace (recursive, skips node_modules/.next/.git).",
  inputSchema: z.object({ dir: z.string().default(".") }),
  async execute({ dir }) {
    const root = insideFixture(dir);
    const out: string[] = [];
    const walk = (d: string) => {
      for (const name of readdirSync(d)) {
        if (SKIP.has(name)) continue;
        const full = path.join(d, name);
        if (statSync(full).isDirectory()) walk(full);
        else out.push(path.relative(root, full));
      }
    };
    walk(root);
    return { dir, files: out.slice(0, 500) };
  },
});
