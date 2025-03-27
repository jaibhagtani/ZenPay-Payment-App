

interface P2PTransactionStyleAccountSectionInputs {
    id: number;
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
    paymentModeP2P: "paid" | "received"
}


export default function P2PTransactionStyleAccountSection({transaction} : {transaction : P2PTransactionStyleAccountSectionInputs})
{
    return (
        <div className="w-full min-w-40 my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 grid grid-cols-4 gap-2 h-max">
            <div className="flex col-span-3 ml-2">
                <div>
                    <div className="text-sm">
                        {transaction.paymentModeP2P == "paid" ? "Sent INR to" : "Received INR from"} 
                    </div>

                    <div className="text-slate-600 text-xs flex justify-center">
                        {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="text-md font-bold text-center col-span-2">{transaction?.toUserName}</div>
            <div className={`flex flex-col text-center justify-center ${transaction.paymentModeP2P == "paid" ? "text-red-500" : "text-green-500"} text-md font-bold  col-span-2`}>
                {transaction.paymentModeP2P == "paid" ? "-" : "+"} Rs {(transaction?.amount) ? transaction.amount / 100 : 0}
            </div>
        </div>
    )
}