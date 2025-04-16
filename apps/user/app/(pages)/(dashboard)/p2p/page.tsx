import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";
import { prisma } from "@repo/db/client";
import SendCard from "../../../../components/SendCard";
import P2PTransactions from "../../../../components/P2PTransaction";

async function getTransactions() {
  const session = await getServerSession(NEXT_AUTH);
  const id = session?.user?.id;
  if (id) {
    const p2ptransactions = await prisma.p2pTransfer.findMany({
      where: { fromUserId: Number(id) },
      include: {
        toUser: true
      }
    });

    return p2ptransactions.map(t => ({
      amount: t.amount,
      time: t.timestamp,
      toUserId: Number(t.toUserId),
      toUserName: t.toUser.name?.toString() || "",
      paymentModeP2P: t.paymentModeP2P
    }));
  }

  return null;
}

export default async function P2PTransferPage() {
  const txns = await getTransactions();

  return (
    <div className="w-full px-4 sm:px-6">
      <h1 className="mx-4 mt-20 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-6">
        P2P Transfer
      </h1>

      <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="mb-6 lg:mb-0">
            <SendCard />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-3xl p-6 w-full shadow-sm">
            <P2PTransactions transactions={txns || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
