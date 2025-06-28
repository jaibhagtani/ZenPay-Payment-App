import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";
import { prisma } from "@repo/db/client";
import { P2PTransactions } from "../../../../components/transactions folder/Dashboard-Pages/TxnsRedirectingBox";
import { getContacts } from "../../../lib/actions/getContacts";
import { SendAndSearchContacts } from "../../../../components/cards/sendAndSearch";
import { getP2PTxns } from "../../../lib/actions/getP2P-txns";

// async function getTransactions() {
//   const session = await getServerSession(NEXT_AUTH);
//   const id = session?.user?.id;
//   if (id) {
//     const p2ptransactions = await prisma.p2pTransfer.findMany({
//       where: { fromUserId: Number(id) },
//       orderBy: {
//         timestamp: 'desc'
//       },
//       include: {
//         toUser: true
//       }
//     });
    
//     return p2ptransactions.map(t => ({
//       amount: t.amount,
//       time: t.timestamp,
//       toUserId: Number(t.toUserId),
//       toUserName: t.toUser.name?.toString() || "",
//       paymentModeP2P: t.paymentModeP2P
//     }));
//   }

//   return null;
// }

export default async function P2PTransferPage() {
  // const txns = await getTransactions();
  const txns = await getP2PTxns();
  const contacts = await getContacts();
  return (
    <div className="w-full px-4 sm:px-6">
      <h1 className="mx-4 mt-20 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-6">
        P2P Transfer
      </h1>
      
      <div className="my-3 grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="col-span-2 lg:col-span-2">
          <SendAndSearchContacts AllMyContacts = {contacts.AllMyContacts} numberOfContacts={contacts.numberOfContacts || 0}></SendAndSearchContacts>
        </div>

        <div className="col-span-1 lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 w-max shadow-sm">
            <P2PTransactions transactions={txns?.tx || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

