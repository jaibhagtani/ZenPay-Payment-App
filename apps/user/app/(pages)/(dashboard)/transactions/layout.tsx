import React, { JSX } from "react";
import TransferButton from "../../../../components/transferButton";


export default function({children} : {children: React.ReactNode}) : JSX.Element
{
    return (  <div className="min-h-screen">
                <div className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-10 font-bold px-4 mt-12">
                    Transactions
                </div>
                    {/* add select */}
                <div className="pt-5 self-center text-center w-full">
                    <div className="lg:grid grid-cols-5 gap-20">
                        <div className="col-span-1 col-start-2">
                            <TransferButton placeholder="Deposit" path="/transactions/deposit" />
                        </div>
                        <div className="col-span-1 col-start-3">
                            <TransferButton placeholder="Withdraw" path="/transactions/withdraw" />
                        </div>
                        <div className="col-span-1 col-start-4">
                            <TransferButton placeholder="P2P" path="/transactions/p2p" />
                        </div>
                    </div>
                    
                </div>
                <div className="w-full flex justify-center">
                    {children}
                </div>
        </div>
        
    )
}