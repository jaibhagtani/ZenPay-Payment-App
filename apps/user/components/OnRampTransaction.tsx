import { Card } from "@repo/ui/card";
import TransactionStyle from "@repo/ui/transactionbox"
import { redirect } from "next/navigation";
import TxButton from "@repo/ui/txbutton"
interface TransactionCardProps {
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default function TransactionCard({transactions} : {transactions: TransactionCardProps []})
{
    if(!transactions.length)
    {
        return (
            <div className="min-w-max">
                <Card title="Recent Transactions">
                    <div key={1} className="mx-4 text-center font-semibold py-8 mx-40 font-sm">
                        No Recent transactions
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-w-max">
            <Card title="Recent Transactions">
            <TxButton placeholder={"View all transactions"} href={"/transfer/txns"}></TxButton>
            </Card>
        </div>
    )
}