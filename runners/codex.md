# Codex runner

```bash
cp -r fixture /tmp/run && cd /tmp/run && npm ci && git init -q && git add -A && git commit -qm base
PROMPT="$(cat ../devop-bench/runners/CONTEXT.md ../devop-bench/tasks/T05-ci-red-why/task.md)"
time codex exec --json "$PROMPT" > transcript.jsonl
```

- Use the default sandbox (workspace-write, no network). Do not pass `--dangerously-bypass-approvals-and-sandbox`.
- Record model id, Codex CLI version, plan and token usage.
