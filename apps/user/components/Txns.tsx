import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../app/lib/auth";
import { prisma } from "@repo/db/client";
import TransactionStyle from "@repo/ui/transactionbox";

interface TransactionCardProps {
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default async function TxnsPage({transactions} : {transactions: TransactionCardProps[]})
{


    return (    <div>
        {transactions ? 
        <div className="flex">
            <div className="m-2 w-screen">
                {transactions.map(transaction => (
                    <TransactionStyle transaction={transaction}></TransactionStyle>
                ))}
            </div>
        </div>
        : <div>
            No Recent transactions
        </div>}
    </div> )
}