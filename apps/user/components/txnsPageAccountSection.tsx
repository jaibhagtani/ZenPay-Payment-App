import TransactionStyle from "@repo/ui/transactionbox";
import TransactionStyleAccountSection from "./transactionStyleAccountSection";

interface TxnsPageAccountSectionInput {
    id: number,
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default async function TxnsPageAccountSection({transactions, typeofPayment} : {transactions: TxnsPageAccountSectionInput [], typeofPayment ?: "deposit" | "withdraw"})
{


    return (    <div>
        {transactions ? 
        <div className="flex">
            <div className="p-2 w-full min-w-60 lg:min-w-72 max-w-full">
                {transactions.map(transaction => (
                    <TransactionStyleAccountSection transaction={transaction} typeofPayment={typeofPayment}></TransactionStyleAccountSection>
                ))}
            </div>
        </div>
        : <div>
            No Recent transactions
        </div>}
    </div> )
}