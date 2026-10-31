import { defineEvalConfig } from "eve/evals";

// Each task is slow (the agent runs real tests), so keep concurrency low and
// give every run plenty of time. Methodology: 3 runs per task (--repeat 3).
export default defineEvalConfig({
  maxConcurrency: 1,
  timeoutMs: 20 * 60 * 1000,
  repeat: 3,
});
