import { AddMoney } from "../../../components/AddMoneyCard";
import BalanceCard from "../../../components/BalanceCard";
import TransactionCard from "../../../components/OnRampTransaction";
import React from "react"
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";

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
        <div className="max-w-screen">
            <div className="text-4xl text-purple-600 pt-8 mb-6 font-bold px-4 mt-12">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-9 p-2 gap-4">
                <div className="mx-10 bg-white min-w-fit rounded-3xl max-h-fit col-span-4">
                    <AddMoney></AddMoney>
                </div>
                <div className="col-span-5">
                    <div className="bg-white max-w-fit min-w-96 rounded-3xl py-2">
                        <BalanceCard amount={balance ? balance.amount : 0} locked={balance ? balance.locked : 0}></BalanceCard>
                    </div>
                    <div className="pt-4 bg-white w-max rounded-3xl my-5">
                        <TransactionCard transactions={txns ? txns : []}></TransactionCard>
                    </div>
                </div>
            </div>
        </div>
    )
}