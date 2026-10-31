import type { Queryable } from "@/lib/db";

/** In-memory stand-in for Postgres that records every query it receives. */
export function fakeDb(boardCount: number, pinsPerBoard: number) {
  const queries: string[] = [];
  const boards = Array.from({ length: boardCount }, (_, i) => ({ id: i + 1, slug: `b${i + 1}`, title: `Board ${i + 1}` }));
  const pins = boards.flatMap((b) =>
    Array.from({ length: pinsPerBoard }, (_, j) => ({
      id: b.id * 100 + j,
      board_id: b.id,
      body: `pin ${j}`,
      votes: j,
      created_at: "2026-10-01T00:00:00Z",
    })),
  );
  const db: Queryable = {
    async query<T>(sql: string, params?: unknown[]) {
      queries.push(sql);
      if (/FROM boards/i.test(sql)) return { rows: boards as unknown as T[] };
      if (/FROM pins/i.test(sql)) {
        if (params && params.length === 1 && typeof params[0] === "number") {
          return { rows: pins.filter((p) => p.board_id === params[0]) as unknown as T[] };
        }
        return { rows: pins as unknown as T[] };
      }
      return { rows: [] };
    },
  };
  return { db, queries };
}
