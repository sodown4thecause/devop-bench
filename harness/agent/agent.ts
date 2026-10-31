import { defineAgent } from "eve";

// The contender model for the "eve agent" runner. Change it with `eve set`
// or edit here; record the exact model id in every results file.
export default defineAgent({
  model: "openai/gpt-6-luna-fast",
  reasoning: "high",
});
