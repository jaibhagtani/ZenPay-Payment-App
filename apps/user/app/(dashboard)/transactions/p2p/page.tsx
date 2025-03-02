import { getServerSession } from "next-auth";

import { prisma } from "@repo/db/client";
import { NEXT_AUTH } from "../../../lib/auth";
import TxnsPage from "../../../../components/Txns";
import P2PTransactionStyle from "@repo/ui/p2ptransactionbox";



async function getp2pTransactions()
{
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;
    if(id)
    {
        // console.log("HERE");
        const txns = await prisma.p2pTransfer.findMany({
            where: {
                fromUserId: Number(id)
            },
        })
        
        // console.log(txns);
        var txs = txns.map(t => ({
            id: t.id,
            time: t.timestamp,
            amount: t.amount,
            toUserId: t.toUserId,
            toUserName: t.toUserName
        }))
        var tx = [...txs].reverse();
        return tx;
    }
    return null;
}

export default async function()
{
    const transactions = await getp2pTransactions();
    return (
        <div className="flex justify-center">
            <div className="max-w-fit h-screen lg:min-w-fit max-w-screen">
                <div className="text-2xl flex flex-row justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
                    Recent P2P Transactions
                </div>
                {transactions && transactions.length > 0 ? <div className="flex justify-center text-2xl text-black-600 pt-2 mb-2 font-bold px-4 mt-5 max-w-full">
                    {transactions?.length} Transaction(s)
                </div> : 
                <div className="font-semibold m-10 text-xl flex justify-self-center font-bold rounded-xl">No Recent Transactions</div>}
                {transactions && transactions.length > 0 ? 
                <div className="grid grid-cols-9 p-2 gap-4 bg-white rounded-3xl lg:px-14 py-6">
                    <div className="col-start-1 col-span-5 lg:col-start-1 col-span-9">
                        {transactions.map(transaction => (
                            <P2PTransactionStyle transaction={transaction}></P2PTransactionStyle>
                        ))}
                    </div>
                </div> : <div></div>}
            </div>
        </div>
    )
}