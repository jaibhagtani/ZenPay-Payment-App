

interface TransactionStyleProps {
    id: number,
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}

export default function TransactionStyle({transaction} : {transaction : TransactionStyleProps})
{
    return (
        <div className="w-full my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 h-10">
            <div className="flex">
                <div className="content-center mr-5">
                    {transaction?.status == "Processing" ? <div className="h-6 w-6 rounded-full bg-amber-400"></div> : <div></div>}
                    {transaction?.status == "Success" ? <div className="h-6 w-6 rounded-full bg-green-400"></div> : <div></div>}
                    {transaction?.status == "Failure" ? <div className="h-6 w-6 rounded-full bg-red-400"></div> : <div></div>}

                </div>
                <div>
                    <div className="text-sm">
                        Received INR from
                    </div>
                    
                    <div className="text-slate-600 text-xs">
                        {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="text-lg font-bold content-center">{transaction?.provider}</div>
            <div className="mx-5 content-center font-semibold">
                <div>
                    {transaction?.status}
                </div>
            </div>
            <div className="mx-2 flex flex-col justify-center text-lg font-semibold">
                + Rs {(transaction?.amount) ? transaction.amount/100 : 0}
            </div>
        </div>
    )
}