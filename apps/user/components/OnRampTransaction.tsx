import { Card } from "@repo/ui/card";
import TxButton from "@repo/ui/txbutton"
interface TransactionCardProps {
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default function TransactionCard({transactions, href} : {transactions: TransactionCardProps [], href: string})
{
    if(!transactions.length)
    {
        return (
            <div className="w-full">
                <Card title="Recent Transactions">
                    <div key={1} className="mx-4 text-center font-bold py-8">
                        No Recent transactions
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full">
            <Card title="Recent Transactions">
                <div className="flex justify-end">
                <TxButton placeholder={"View all transactions"} href={href}></TxButton>
                </div>
            </Card>
        </div>
    )
}