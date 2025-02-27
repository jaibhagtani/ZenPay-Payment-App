import { getServerSession } from "next-auth";

import { prisma } from "@repo/db/client";
import { NEXT_AUTH } from "../../../lib/auth";
import TxnsPage from "../../../../components/Txns";



async function getOnRampTransactions()
{
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;
    if(id)
    {
        // console.log("HERE");
        const txns = await prisma.onRampTransaction.findMany({
            where: {
                userId: Number(id)
            }
        })
    
        // console.log(txns);
        return txns.map(t => ({
            id: t.id,
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        }))
    }
    return null;
}

export default async function()
{
    const transactions = await getOnRampTransactions();
    return (
        <div>
            <div className="max-w-fit lg:min-w-fit max-w-screen">
                <div className="text-2xl flex flex-row justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
                    Recent Deposit Transactions
                </div>
                {transactions && transactions.length > 0 ? <div className="flex justify-center text-2xl text-black-600 pt-2 mb-2 font-bold px-4 mt-5 min-w-full">
                    {transactions?.length} Transaction(s)
                </div> : 
                <div className="font-semibold m-10 text-xl flex justify-self-center font-bold">No Recent Transactions</div>}
                <div className="grid grid-cols-9 p-2 gap-4">
                    <div className="col-start-1 col-span-7 lg:col-start-2 col-span-8">
                        {transactions && transactions.length > 0 ? <div className="bg-white min-w-full rounded-3xl py-3 px-10 lg:w-full">
                            <TxnsPage transactions = {transactions} typeofPayment="deposit"></TxnsPage>
                        </div> : <div></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}