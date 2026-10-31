# Claude Code runner

```bash
cp -r fixture /tmp/run && cd /tmp/run && npm ci && git init -q && git add -A && git commit -qm base
PROMPT="$(cat ../devop-bench/runners/CONTEXT.md ../devop-bench/tasks/T05-ci-red-why/task.md)"
time claude -p "$PROMPT" --output-format stream-json --verbose > transcript.jsonl
```

- Use the default permission mode (no `--dangerously-skip-permissions`). Any permission prompt that a human approves counts as a human intervention.
- Record model id, Claude Code version, plan (e.g. Pro $20) and token cost from the JSON output.
