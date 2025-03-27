import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import { prisma } from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;
    if (Number(id)) {
      const balance = await prisma.balance.findFirst({
        where: { userId: Number(id) }
      });
      return NextResponse.json({ balance }, { status: 200 });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (e) {
    console.error("Error Occurred in Balance", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
