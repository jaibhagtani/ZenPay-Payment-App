import { Card } from "@repo/ui/card";
import TransactionStyle from "@repo/ui/transactionbox"
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
            <div>
                <Card title="Recent Transactions">
                    <div key={1} className="mx-4 text-center font-semibold py-8">
                        No Recent transactions
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <Card title="Recent Transactions">
                <div className="flex">
                    <div className="m-2 w-max">
                        {transactions.map(transaction => (
                            <TransactionStyle transaction={transaction}></TransactionStyle>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}