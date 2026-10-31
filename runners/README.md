# Runners

Every contender gets the **same inputs**: a fresh copy of `fixture/` (with `npm ci` done, git history intact), `task.md` and `inputs/` for one task, and the same shared context file, [`runners/CONTEXT.md`](CONTEXT.md). Never the rubric. Never real or production credentials.

| Runner | How it runs | Timing notes |
|---|---|---|
| [Hark](hark.md) | Manual: a human pastes the task into a Hark project and exports the transcript. Hark has no headless API. | Wall-clock includes human copy/paste and waiting time; reported separately from agent time. **Disclosed in every result.** |
| [Claude Code](claude-code.md) | `claude -p` headless in the fixture copy | Measured end to end by the runner script |
| [Codex](codex.md) | `codex exec` headless in the fixture copy | Measured end to end |
| [eve agent](../harness/README.md) | `eve eval` in `harness/` | Measured by eve |
| eve GitHub Maintainer (later) | Self-hosted fork of the [eve GitHub Maintainer template](https://vercel.com/templates/eve/eve-github-maintainer) pointed at a sandbox copy of the repo | Planned, not yet wired |
| OpenCode + DeepSeek (optional) | `opencode run` with a DeepSeek model | Optional open-weights baseline |

Each run produces `results/<runner>/<task>/run-<n>/` with `transcript.md` (or `.jsonl`), `meta.json` and the judge's `score.json`. See [docs/methodology.md](../docs/methodology.md).
