import TransactionStyle from "@repo/ui/transactionbox";

interface TransactionCardProps {
    id: number,
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default async function TxnsPage({transactions, typeofPayment} : {transactions: TransactionCardProps[], typeofPayment ?: "deposit" | "withdraw"})
{


    return (    <div>
        {transactions ? 
        <div className="flex">
            <div className="m-2 w-full">
                {transactions.map(transaction => (
                    <TransactionStyle transaction={transaction} typeofPayment={typeofPayment}></TransactionStyle>
                ))}
            </div>
        </div>
        : <div>
            No Recent transactions
        </div>}
    </div> )
}