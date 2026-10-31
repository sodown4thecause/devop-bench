import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { listBoardsWithPins } from "@/lib/repo";

export const dynamic = "force-dynamic";

export async function GET() {
  const boards = await listBoardsWithPins(getDb());
  return NextResponse.json({ boards });
}
