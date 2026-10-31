# Codex runner (Windows)

```powershell
cd C:\Users\install\devop-bench
git pull
.\runners\codex.ps1 -Task T05-ci-red-why -Run 1
```

The script copies the fixture outside the repo, runs `codex exec` with `runners/prompts/<task>.md`, and saves `transcript.jsonl`, `final-message.md`, `changes.diff` and `meta.json` to `C:\Users\install\bench-runs\codex\<task>\run-<n>\`.

Fixed settings for every Codex run (don't change between runs):
- `--sandbox workspace-write`: may edit files in the run folder, network off. Never `danger-full-access` or `--dangerously-bypass-approvals-and-sandbox`.
- `--ignore-user-config`: your personal Codex config doesn't leak into the bench.
- Same model and reasoning setting for all 30 runs; record them in `meta.json`.

After each run, copy the run folder into `results/codex/<task>/run-<n>/`, minus `work/`.
