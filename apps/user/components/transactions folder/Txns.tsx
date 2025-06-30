import {TransactionStyle} from "@repo/ui/transactionbox";
import { TransactionStyleAccountSection } from "./Accounts/TransactionShowBox";

interface TransactionCardProps {
    id: number,
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

interface TxnsPageAccountSectionInput {
    id: number,
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export async function TxnsPage({transactions, typeofPayment} : {transactions: TransactionCardProps[], typeofPayment ?: "deposit" | "withdraw"})
{


    return (    <div>
        {transactions ? 
        <div className="flex">
            <div className="w-full">
                {transactions.map(tx => (
                    <TransactionStyle transaction={tx} typeofPayment={typeofPayment}></TransactionStyle>
                ))}
            </div>
        </div>
        : <div>
            No Recent transactions
        </div>}
    </div> )
}



export function TxnsPageAccountSection({transactions, typeofPayment} : {transactions: TxnsPageAccountSectionInput [], typeofPayment ?: "deposit" | "withdraw"})
{


    return (    <div>
        {transactions ? 
        <div className="flex">
            <div className="p-2 w-full min-w-60 lg:min-w-72 max-w-full">
                {transactions.map(transaction => (
                    <TransactionStyleAccountSection transaction={transaction} typeOfPayment={typeofPayment}></TransactionStyleAccountSection>
                ))}
            </div>
        </div>
        : <div>
            No Recent transactions
        </div>}
    </div> )
}

