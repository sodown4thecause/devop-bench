# Fixture answer key (spoilers: never give to an agent under test)

| Planted problem | Where | How it shows up |
|---|---|---|
| Pricing bug: annual = 20% off, but "2 months free" means 1/6 off | `lib/pricing.ts` | `tests/pricing.test.ts` fails (18240 vs 19000) |
| Missing migration: `pins.archived_at` queried, never created | `lib/repo.ts`, `db/migrations/` | `tests/migrations.test.ts` fails; 500 in "prod" (T08) |
| N+1 query: one pins query per board | `lib/repo.ts` | `tests/repo.test.ts` fails (26 queries for 25 boards) |
| Removed auth check: admin DELETE has no `requireAdmin` | `app/api/admin/pins/[id]/route.ts` | covered only by a skipped test |
| Skipped test | `tests/admin-auth.test.ts` | `it.skip`, would fail if re-enabled |
| Flaky, fake timers: real `setTimeout` race | `tests/debounce.test.ts` | fails ~1 in 3 runs (4 of 12 in evidence) |
| Env-dependent: reads ambient `PINBOARD_REGION` | `lib/region.ts` | fails when `PINBOARD_REGION=us` |
| Timezone: local-time date formatting | `lib/dates.ts` | fails when `TZ` is ahead of UTC (e.g. Australia/Brisbane) |
| Lint: unused variables | `lib/analytics.ts` | `npm run lint` fails (`--max-warnings 0`) |
| Lockfile drift | `tasks/T01.../inputs/pr-42.diff` | bumps `next` without updating `package-lock.json` |
| Fake leaked key in committed MCP config | `.mcp.json` | `pba_live_FAKE_...` (not a real key) |

`fixture/planted.json` + `npm run test:planted` assert this state in CI.
