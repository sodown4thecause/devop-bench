#!/usr/bin/env node
// Applies db/migrations/*.sql in order to DATABASE_URL. Fixture use only.
import { readdirSync, readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
if (/prod/i.test(url)) throw new Error("Refusing to run fixture migrations against a URL containing 'prod'.");
const client = new pg.Client({ connectionString: url });
await client.connect();
for (const f of readdirSync("db/migrations").filter((x) => x.endsWith(".sql")).sort()) {
  console.log(`applying ${f}`);
  await client.query(readFileSync(`db/migrations/${f}`, "utf8"));
}
await client.end();
