

interface P2PTransactionStyleProps {
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
}


export default function P2PTransactionStyle({transaction} : {transaction : P2PTransactionStyleProps})
{
    return (
        <div className="w-full my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 h-10">
            <div className="flex">
                <div>
                    <div className="text-sm font-semibold">
                        Sent INR to 
                    </div>
                    
                    <div className="text-slate-600 text-xs">
                        {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
                    </div>
                </div>
            </div>
            <div className="content-center font-bold">
                <div>
                    {transaction?.toUserName}
                </div>
                
                
            </div>
            <div className="mx-2 flex flex-col justify-center text-lg font-bold">
                - Rs {(transaction?.amount) ? transaction.amount/100 : 0}
            </div>
        </div>
    )
}