
interface P2PTransactionStyleAccountSectionInputs {
    id: number;
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
    paymentModeP2P: "paid" | "received";
    type: "P2P" | "SPLIT";
}


export function P2PTransactionStyleAccountSection({ transaction }: { transaction: P2PTransactionStyleAccountSectionInputs }) {
    return (
        <div className="max-w-full my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 grid grid-cols-4 gap-2 h-max lg:min-w-96">
            <div className="flex col-span-3 ml-2">
                <div className="py-1 pr-4">
                    {transaction.paymentModeP2P === "paid" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="#E44E4E" />
                            <path d="M8 16 L16 8 M16 8 L16 12 M16 8 L12 8"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                            <path d="M16 8 L8 16 M8 16 L8 12 M8 16 L12 16"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
                <div>
                    <div className="text-sm">
                        {transaction.paymentModeP2P === "paid"
                            ? (transaction.type === "P2P" ? "Sent INR to" : "Paid Split to")
                            : (transaction.type === "P2P" ? "Received INR from" : "Received Split from")}
                    </div>
                    <div className="text-slate-600 text-xs flex justify-center">
                        {transaction.time.toLocaleDateString()} {transaction.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="text-md font-bold text-center col-span-2">{transaction.toUserName}</div>
            <div className={`flex flex-col text-center justify-center ${transaction.paymentModeP2P === "paid" ? "text-red-500" : "text-green-500"} text-md font-bold col-span-2`}>
                {transaction.paymentModeP2P === "paid" ? "-" : "+"} ₹ {(transaction.amount / 100).toFixed(2)}
            </div>
        </div>
    )
}

interface TransactionCardProps {
    id: number,
    amount: number;
    time: Date;
    status: string;
    provider: string;
    type: "P2P" | "SPLIT";
}


export interface TransactionStyleProps {
  transaction: TransactionCardProps
  typeOfPayment: "deposit" | "withdraw" | null;
}


export function TransactionStyleAccountSection({ transaction, typeOfPayment }: TransactionStyleProps) {
    type TransactionStatus = "Processing" | "Success" | "Failure";

    const statusColors: Record<TransactionStatus, string> = {
        Processing: "bg-amber-400",
        Success: "bg-green-400",
        Failure: "bg-red-400",
    };

    const dotColor = statusColors[transaction.status as TransactionStatus] ?? "bg-gray-300";

    return (
        <div className="grid grid-cols-12 gap-2 items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="col-span-1 flex justify-center">
                <div className={`h-4 w-4 rounded-full ${dotColor}`}></div>
            </div>
            <div className="col-span-5">
                <p className="text-sm text-gray-600">
                    {transaction.type === "P2P"
                        ? typeOfPayment === "deposit"
                            ? `Received via P2P`
                            : `Sent via P2P`
                        : typeOfPayment === "deposit"
                            ? `Received via Split`
                            : `Paid via Split`}
                </p>
                <p className="text-xs text-gray-400">
                    {transaction.time.toLocaleDateString()} • {transaction.time.toLocaleTimeString()}
                </p>
            </div>
            <div className="col-span-4 text-center font-medium text-gray-700">
                {transaction.provider}
            </div>
            <div className="col-span-2 text-right font-bold text-gray-800">
                {typeOfPayment === "deposit" ? '+' : '-'} ₹ {(transaction.amount / 100).toFixed(2)}
            </div>
        </div>
    )
}
