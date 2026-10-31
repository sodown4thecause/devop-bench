# Pinboard (fixture)

A tiny Next.js + Postgres feedback board used as the test fixture for DevOp Bench.

**It contains deliberately planted bugs.** Do not use it as a real app. All credentials in this folder are fake.

```bash
npm ci
npm run build          # builds without a database
npm test               # some tests FAIL on purpose
npm run test:planted   # passes when the fixture is in its known planted state
```
