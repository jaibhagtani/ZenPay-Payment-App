import TransactionStyle from "@repo/ui/transactionbox";

interface TransactionCardProps {
    id: number,
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