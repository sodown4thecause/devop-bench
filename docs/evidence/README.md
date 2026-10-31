# Build and test evidence (31 Oct 2026)

Captured in a Linux arm64 sandbox before the first commit. Fixture: Node 22.23.3, npm 10.9.9. Harness: Node 24.22.2.

| File | Command | Result |
|---|---|---|
| [fixture-build.txt](fixture-build.txt) | `npm run typecheck`, `npm run build` | both exit 0 (Next.js 15.5.28) |
| [fixture-test.txt](fixture-test.txt) | `TZ=UTC npm test` | exit 1 **as planned**: pricing, N+1, migration fail; admin auth skipped; debounce flaked on this run |
| [fixture-env-dependent.txt](fixture-env-dependent.txt) | `TZ=Australia/Brisbane PINBOARD_REGION=us npx vitest run ...` | timezone and region tests fail only under that environment |
| [fixture-flaky-debounce.txt](fixture-flaky-debounce.txt) | debounce test x12 | 8 pass, 4 fail |
| [fixture-lint.txt](fixture-lint.txt) | `npm run lint` | exit 1 **as planned** (2 unused-variable warnings, max 0) |
| [fixture-planted-check.txt](fixture-planted-check.txt) | `npm run test:planted` | exit 0: fixture matches its planted state |
| [harness-check.txt](harness-check.txt) | `npx tsc`, `npx eve eval --list`, `npx eve build` | all exit 0; 10 tasks discovered |
