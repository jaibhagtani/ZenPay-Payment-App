import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../../lib/auth";
import { prisma } from "@repo/db/client";
import { AddMoney } from "../../../../../components/AddMoneyCard";
import BalanceCard from "../../../../../components/BalanceCard";
import TransactionCard from "../../../../../components/OnRampTransaction";


async function getBalance()
{
    
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id
    // console.log(id)
    if(id)
    {
        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(id)
            }
        })
        // console.log(balance);

        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
    }
    return null;
    
}

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
    const balance = await getBalance();
    const txns = await getOnRampTransactions();
    return (
        <div className="flex justify-center">
            <div className="mx-10 grid grid-cols-1 gap-10 lg:grid-cols-12 p-2 gap-4">
                <div className="bg-white min-w-fit lg:min-w-full rounded-3xl col-span-7">
                    <AddMoney title="Withdraw" buttonThing="Withdraw Money"></AddMoney>
                </div>
                <div className="col-span-4">
                    <div className=" bg-white min-w-fit lg:max-w-full min-w-96 rounded-3xl py-2">
                        <BalanceCard amount={balance ? balance.amount : 0} locked={balance ? balance.locked : 0}></BalanceCard>
                    </div>
                    <div className="bg-white min-w-fit lg:pt-4 max-w-full rounded-3xl my-5">
                        <TransactionCard transactions={txns ? txns : []} href="/transactions/withdraw"></TransactionCard>
                    </div>
                </div>
            </div>
        </div>
    )
}