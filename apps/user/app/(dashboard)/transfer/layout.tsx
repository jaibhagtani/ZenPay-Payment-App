import React, { JSX } from "react";
import TransferButton from "../../../components/transferButton";

export default function TransferLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="max-w-screen">
            <div className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
                Transfer
            </div>

            <div className="grid grid-cols-4 gap-4 pt-5">
                <div className="col-span-1 col-start-2">
                    <TransferButton placeholder="Deposit" path="/transfer/deposit" />
                </div>
                <div className="col-span-1 col-start-3">
                    <TransferButton placeholder="Withdraw" path="/transfer/withdraw" />
                </div>
            </div>
            
            <div className="mt-8">{children}</div>
        </div>
    );
}
