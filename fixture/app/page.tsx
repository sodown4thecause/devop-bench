import Link from "next/link";
import { getDb } from "@/lib/db";
import { listBoardsWithPins } from "@/lib/repo";
import { formatAud, priceForCycle } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export default async function Home() {
  let boards: Awaited<ReturnType<typeof listBoardsWithPins>> = [];
  let dbError: string | null = null;
  try {
    boards = await listBoardsWithPins(getDb());
  } catch (err) {
    dbError = err instanceof Error ? err.message : String(err);
  }
  return (
    <main>
      <h1>Pinboard</h1>
      <p>
        Pro is {formatAud(priceForCycle("pro", "monthly"))}/month or {formatAud(priceForCycle("pro", "annual"))}/year
        (2 months free).
      </p>
      {dbError && <p role="alert">Database unavailable: {dbError}</p>}
      <ul>
        {boards.map((b) => (
          <li key={b.id}>
            <Link href={`/boards/${b.id}`}>{b.title}</Link> ({b.pins.length} pins)
          </li>
        ))}
      </ul>
    </main>
  );
}
