import { describe, expect, it } from "vitest";
import { listBoardsWithPins } from "@/lib/repo";
import { fakeDb } from "./fake-db";

describe("listBoardsWithPins", () => {
  it("returns every board with its pins", async () => {
    const { db } = fakeDb(3, 2);
    const boards = await listBoardsWithPins(db);
    expect(boards).toHaveLength(3);
    expect(boards[0].pins).toHaveLength(2);
  });

  it("uses a constant number of queries regardless of board count", async () => {
    const { db, queries } = fakeDb(25, 1);
    await listBoardsWithPins(db);
    expect(queries.length).toBeLessThanOrEqual(2);
  });
});
