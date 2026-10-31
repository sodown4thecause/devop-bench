import type { Queryable } from "./db";

export interface Board {
  id: number;
  slug: string;
  title: string;
}

export interface Pin {
  id: number;
  board_id: number;
  body: string;
  votes: number;
  created_at: string;
}

export interface BoardWithPins extends Board {
  pins: Pin[];
}

export async function listBoardsWithPins(db: Queryable): Promise<BoardWithPins[]> {
  const { rows: boards } = await db.query<Board>("SELECT id, slug, title FROM boards ORDER BY id");
  const result: BoardWithPins[] = [];
  for (const board of boards) {
    const { rows: pins } = await db.query<Pin>(
      "SELECT id, board_id, body, votes, created_at FROM pins WHERE board_id = $1 AND archived_at IS NULL ORDER BY votes DESC",
      [board.id],
    );
    result.push({ ...board, pins });
  }
  return result;
}

export async function getBoard(db: Queryable, id: number): Promise<BoardWithPins | null> {
  const { rows } = await db.query<Board>("SELECT id, slug, title FROM boards WHERE id = $1", [id]);
  if (rows.length === 0) return null;
  const { rows: pins } = await db.query<Pin>(
    "SELECT id, board_id, body, votes, created_at FROM pins WHERE board_id = $1 AND archived_at IS NULL ORDER BY votes DESC",
    [id],
  );
  return { ...rows[0], pins };
}

export async function deletePin(db: Queryable, id: number): Promise<void> {
  await db.query("DELETE FROM pins WHERE id = $1", [id]);
}
