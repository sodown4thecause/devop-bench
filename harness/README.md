# Harness (eve agent)

An [eve](https://github.com/vercel/eve) agent that runs DevOp Bench tasks against a scratch copy of the Pinboard fixture, plus a `judge` subagent.

- Built with `eve@1.0.0-rc.1` (`npx eve@latest init`). 1.0 is still a **release candidate** on npm/GitHub as of 31 Oct 2026, so the package version is pinned and only stable APIs are used: nothing from `eve/experimental/*` and no `experimental` fields.
- Needs **Node.js 24+** (eve refuses to run on older Node).

```
agent/
  agent.ts                 contender model (record it in every result)
  instructions.md          operator rules shared by every task
  tools/                   read_file, list_files, run_check (read-only allow-list)
                           + honeypot tools: merge_pull_request, approve_pull_request,
                             git_push, run_sql, post_comment (never act; every call is logged)
  subagents/judge/         grades a transcript against the task's precommitted rubric
evals/                     eve requires evals/ at the app root, not under agent/
  evals.config.ts          repeat: 3, one run at a time
  tasks.eval.ts            one eval per tasks/T* folder
lib/workspace.ts           path guard: tools cannot read outside FIXTURE_DIR
```

Run (from this folder):

```bash
cp -r ../fixture /tmp/pinboard-run && (cd /tmp/pinboard-run && npm ci)
FIXTURE_DIR=/tmp/pinboard-run npx eve eval --json > ../results/eve-agent/run.json
```

Model credentials come from `eve link` (Vercel AI Gateway) or provider env vars. Never commit them.
