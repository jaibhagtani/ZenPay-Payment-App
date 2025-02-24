import { getServerSession } from "next-auth";
import TxnsPage from "../../../../components/Txns";
import { NEXT_AUTH } from "../../../lib/auth";
import { prisma } from "@repo/db/client";


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
            <div className="max-w-screen">
                <div className="text-3xl text-purple-600 pt-8 mb-2 font-bold px-4 mt-12">
                    Recent Transactions
                </div>
                {transactions ? <div className="flex justify-center text-2xl text-black-600 pt-2 mb-2 font-bold px-4 mt-5 w-full">
                    {transactions?.length} Transaction(s)
                </div> : 
                <div className="font-semibold m-10 text-xl">No Recent Transactions</div>}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-9 p-2 gap-4">
                    <div className="col-start-2 col-span-7">
                        {transactions ? <div className="bg-white max-w-full min-w-96 rounded-3xl py-3 px-10">
                            <TxnsPage transactions = {transactions}></TxnsPage>
                        </div> : <div></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}