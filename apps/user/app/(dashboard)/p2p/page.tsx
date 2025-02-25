import SendCard from "../../../components/SendCard";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import P2PTransactions from "../../../components/P2PTransaction";


async function getTransactions()
{
    const session = await getServerSession(NEXT_AUTH);

    const id = session?.user?.id;
    if(id)
    {
       const transactions = await prisma.p2pTransfer.findMany({
            where: {
                fromUserId: Number(id)
            },
            include: {
                toUser: true
            }
        })

        var txns = transactions.map(t => ({
            amount : t.amount,
            time: t.timestamp,
            toUserId: Number(t.toUserId),
            toUserName: t.toUser.name?.toString() || ""
        })) 
        var y = [...txns].reverse();
        return y;
    }
    
    return null;
}


export default async function()
{
    const txns = await getTransactions(); 
    return <div className="max-w-full">
            <div>   
                <div className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
                    P2P Transfer
                </div>
            </div>
            <div className="grid grid-cols-7 w-fit">
                <div className="col-start-1 ">
                    <div className="ml-10 grid grid-rows-9 max-h-screen">
                        <div className="row-start-2">
                            <SendCard></SendCard>
                        </div>
                    </div>
                </div>
                <div className="col-start-4 bg-white rounded-3xl col-end-7 h-max">
                    <div className="mx-4 my-5">
                        <div className="flex justify-center min-w-fit">
                            <P2PTransactions transactions={txns ? txns : []}></P2PTransactions>
                        </div>
                    </div>
                </div>
            </div>
        </div>

}