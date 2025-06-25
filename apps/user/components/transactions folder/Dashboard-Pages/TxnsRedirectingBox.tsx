import { Card } from "@repo/ui/card";
import P2PTransactionStyle from "@repo/ui/p2ptransactionbox";
import TxButton from "@repo/ui/txbutton"
interface TransactionCardProps {
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}
interface P2PTransactionsProps {
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
    paymentModeP2P: "paid" | "received"
}

export function TransactionCard({transactions, href} : {transactions: TransactionCardProps [], href: string})
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

export function P2PTransactions({ transactions }: { transactions: P2PTransactionsProps[] }) {
  return (
    <div className="min-w-full">
      {(!transactions || transactions.length === 0) ? (
        <Card title="Recent Transactions">
          <div className="mx-2 text-center font-bold py-6 w-full text-sm">
            No Recent transactions
          </div>
        </Card>
      ) : (
        <Card title="Recent Transactions" IsviewAll>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.map(tx => (
              <P2PTransactionStyle transaction={tx} />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}


