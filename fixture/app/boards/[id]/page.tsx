import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { getBoard } from "@/lib/repo";
import { pinDay } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const board = await getBoard(getDb(), Number(id));
  if (!board) notFound();
  return (
    <main>
      <h1>{board.title}</h1>
      <ol>
        {board.pins.map((p) => (
          <li key={p.id}>
            {p.body} ({p.votes} votes, {pinDay(p.created_at)})
          </li>
        ))}
      </ol>
    </main>
  );
}
