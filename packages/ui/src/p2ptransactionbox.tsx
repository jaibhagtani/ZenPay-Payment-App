

interface P2PTransactionStyleProps {
    id: number;
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
}


export default function P2PTransactionStyle({transaction} : {transaction : P2PTransactionStyleProps})
{
    return (
        <div className="w-full min-w-40 my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 grid grid-cols-4 gap-2 lg:grid-cols-3 gap-2 h-max lg:h-10">
            <div className="flex col-span-3 ml-2 lg:col-span-1">
                <div>
                    <div className="text-sm">
                        Sent INR to 
                    </div>

                    <div className="text-slate-600 text-xs flex justify-center">
                        {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="text-md font-bold text-center col-span-2 lg:col-span-1 text-lg ml-5 pt-1 min-w-40">{transaction?.toUserName}</div>
            <div className="flex flex-col text-center justify-center text-md font-bold col-span-2 lg:col-span-1 mx-2 text-lg">
                - Rs {(transaction?.amount) ? transaction.amount / 100 : 0}
            </div>
        </div>
    )
}