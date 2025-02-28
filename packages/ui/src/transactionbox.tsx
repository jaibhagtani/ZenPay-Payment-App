

interface TransactionStyleProps {
    id: number,
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default function TransactionStyle({transaction, typeofPayment} : {transaction : TransactionStyleProps, typeofPayment ?: "deposit" | "withdraw"})
{
    return (
        <div className="w-full my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 h-10 grid grid-cols-4 gap-4">
            <div className="flex col-span-2 lg:col-span-1">
                <div className="content-center mr-5">
                    {transaction?.status == "Processing" ? <div className="h-6 w-6 rounded-full bg-amber-400"></div> : <div></div>}
                    {transaction?.status == "Success" ? <div className="h-6 w-6 rounded-full bg-green-400"></div> : <div></div>}
                    {transaction?.status == "Failure" ? <div className="h-6 w-6 rounded-full bg-red-400"></div> : <div></div>}

                </div>
                <div>
                    <div className="text-sm">
                        {typeofPayment == "deposit" ? "Received INR from" : "Withdrawal INR to"}
                    </div>
                    
                    <div className="text-slate-600 text-xs">
                        {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="text-lg font-bold content-center col-span-1 lg:ml-5">{transaction?.provider}</div>
            <div className="col-span-0 hidden lg:block lg:mx-5 content-center font-semibold visible col-span-1">
                <div>
                    {transaction?.status}
                </div>
            </div>
            <div className="flex flex-col justify-center text-lg font-bold col-span-1 lg:mx-2">
                {typeofPayment == "deposit" ? "+":"-"} Rs {(transaction?.amount) ? transaction.amount/100 : 0}
            </div>
        </div>
    )
}