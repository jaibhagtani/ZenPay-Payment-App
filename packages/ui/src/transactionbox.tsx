

interface TransactionStyleProps {
    id: number,
    amount: number;
    time: Date;
    status: string;
    provider: string;
}

export default function TransactionStyle({ transaction, typeofPayment }: { transaction: TransactionStyleProps, typeofPayment?: "deposit" | "withdraw" }) {
    return (
        <div className="w-full my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 grid grid-cols-4 gap-2 h-max lg:h-10">
            <div className="flex col-span-4 lg:col-span-1">
                <div className="text-center mr-5 mt-2 ">
                    {transaction?.status == "Processing" ? <div className="h-6 w-6 rounded-full bg-amber-400 lg:h-6 w-6"></div> : <div></div>}
                    {transaction?.status == "Success" ? <div className="h-6 w-6 rounded-full bg-green-400 lg:h-6 w-6"></div> : <div></div>}
                    {transaction?.status == "Failure" ? <div className="h-6 w-6 rounded-full bg-red-400 lg:h-6 w-6"></div> : <div></div>}

                </div>
                <div>
                    <div className="text-sm">
                        {typeofPayment == "deposit" ? "Received INR from" : "Withdrawal INR on"}
                    </div>

                    <div className="text-slate-600 text-xs">
                        {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="text-md font-bold text-center col-span-2 lg:col-span-1 text-lg ml-5">{transaction?.provider}</div>
            <div className="hidden col-span-0 lg:block lg:mx-5 my-1 text-center font-semibold visible col-span-1">
                <div>
                    {transaction?.status}
                </div>
            </div>
            <div className="flex flex-col text-center justify-center text-md font-bold col-span-2 lg:col-span-1 mx-2 text-lg">
                {typeofPayment == "deposit" ? "+" : "-"} Rs {(transaction?.amount) ? transaction.amount / 100 : 0}
            </div>
        </div>
    )
}