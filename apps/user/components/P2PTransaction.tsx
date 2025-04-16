import { Card } from "@repo/ui/card";
import TxButton from "@repo/ui/txbutton";

interface P2PTransactionsProps {
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
    paymentModeP2P: "paid" | "received";
}

export default function P2PTransactions({ transactions }: { transactions: P2PTransactionsProps[] }) {
    if(!transactions.length) {
        return (
            <div className="w-full">
                <Card title="Recent Transactions">
                    <div className="mx-4 text-center font-bold py-8">
                        No Recent transactions
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Card title="Recent Transactions">
                <div className="flex justify-end">
                    <TxButton placeholder={"View all transactions"} href={"/transactions/p2p"} />
                </div>
            </Card>
        </div>
    );
}
