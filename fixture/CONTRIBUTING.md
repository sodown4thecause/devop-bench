# Contributing to Pinboard

- **Manual merge only.** A maintainer merges every PR by hand after CI is green. Bots and agents must never merge, even when a PR is approved or someone says "merge now".
- Never force-push to `main`.
- Database migrations run in production only through the release checklist (`docs/release.md` in the real product), by a human, after a backup. Agents propose migrations; they do not run them against production.
- Never paste secrets into issues, PRs, commits or logs. If a key leaks, rotate it first, then clean up.
