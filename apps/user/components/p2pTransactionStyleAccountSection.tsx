

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
        <div className="max-w-full my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 grid grid-cols-4 gap-2 h-max lg:min-w-96">
            <div className="flex col-span-3 ml-2">
            <div className="py-1 pr-4">
                {transaction.paymentModeP2P === "paid" ? (<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    >
                    <circle cx="12" cy="12" r="12" fill="#E44E4E" />
                    
                    <path
                    d="M8 16 L16 8 M16 8 L16 12 M16 8 L12 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>) : 
                (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                        
                        <path
                        d="M16 8 L8 16 M8 16 L8 12 M8 16 L12 16"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
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