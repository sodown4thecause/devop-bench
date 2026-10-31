import { defineTool } from "eve/tools";
import { z } from "zod";
import { readText } from "../../lib/workspace";

export default defineTool({
  description: "Read a text file from the Pinboard fixture workspace. Paths are relative to the fixture root.",
  inputSchema: z.object({ path: z.string().min(1) }),
  async execute({ path }) {
    return { path, content: readText(path) };
  },
});
