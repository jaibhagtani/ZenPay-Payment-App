import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import { prisma } from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;
    if (id) {

      const txns = await prisma.onRampTransaction.findMany({
        where: { userId: Number(id) }
      });

      let totalWithdrawalAmount = 0;

      txns.forEach(t => {
        if (t.status === "Success") {
          totalWithdrawalAmount += t.amount;
        }
      });

      const txs = txns.map(t => ({
        id: t.id,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
      }));

      const tx = [...txs].reverse();
      
      return Response.json({ tx, totalWithdrawalAmount }, { status: 200 });
    }
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  } 
  catch (e) 
  {
    console.error("Error Occurred in Withdrawal", e);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
