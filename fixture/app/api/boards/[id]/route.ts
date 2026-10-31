import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getBoard } from "@/lib/repo";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const board = await getBoard(getDb(), Number(id));
  if (!board) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ board });
}
