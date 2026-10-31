import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { deletePin } from "@/lib/repo";

// Admin-only: remove a pin (moderation).
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deletePin(getDb(), Number(id));
  return NextResponse.json({ ok: true });
}
