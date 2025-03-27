import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import { prisma } from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;
    let totalPaid = 0;
    let totalReceived = 0;
    if (id) {
      const txns = await prisma.p2pTransfer.findMany({
        where: { fromUserId: Number(id) }
      });
      
      txns.forEach((t) => {
        if (t.paymentModeP2P === "paid") {
          totalPaid += t.amount;
        } else if (t.paymentModeP2P === "received") {
          totalReceived += t.amount;
        }
      });
      
      const txs = txns.map(t => ({
        id: t.id,
        time: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId,
        toUserName: t.toUserName,
        paymentModeP2P: t.paymentModeP2P
      }));
      const tx = [...txs].reverse();
      
      return Response.json({ tx, totalPaid, totalReceived }, { status: 200 });
    }
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  } catch (e) {
    console.error("Error Occurred in P2P GET", e);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
