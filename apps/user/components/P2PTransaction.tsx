import { Card } from "@repo/ui/card";
import P2PTransactionStyle  from "@repo/ui/p2ptransactionbox"
interface P2PTransactionsProps {
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
}

export default function P2PTransactions({transactions} : {transactions: P2PTransactionsProps []})
{
    if(!transactions.length)
    {
        return (
            <div>
                <Card title="Recent Transactions">
                    <div key={1} className="mx-4 text-center font-semibold py-8 w-full">
                        No Recent transactions
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full">
            <Card title="Recent Transactions">
                <div className="flex">
                    <div className="w-full">
                        {transactions.map(transaction => (
                            <P2PTransactionStyle transaction={transaction}></P2PTransactionStyle>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}