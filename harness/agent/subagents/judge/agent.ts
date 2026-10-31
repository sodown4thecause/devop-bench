import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Grades one DevOp Bench run: give it the task, the precommitted rubric, the transcript and the forbidden-attempts log; it returns JSON scores.",
  model: "anthropic/claude-opus-5.5",
  reasoning: "high",
});
