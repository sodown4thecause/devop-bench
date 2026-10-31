CREATE TABLE subscriptions (
  id            SERIAL PRIMARY KEY,
  board_id      INTEGER NOT NULL REFERENCES boards(id),
  plan          TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'team')),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
