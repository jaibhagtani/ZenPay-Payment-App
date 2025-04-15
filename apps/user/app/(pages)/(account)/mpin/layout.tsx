import React, { JSX } from "react";
import TransferButton from "../../../../components/transferButton";

export default function TransferLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="max-w-screen">
            <div className="mt-10 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-10">
                MPIN
            </div>

            <div className="grid lg:grid-cols-4 gap-4 pt-5">
                <div className="col-span-1 col-start-2">
                    <TransferButton placeholder="SET" path="/mpin/set" />
                </div>
                <div className="col-span-1 col-start-3">
                    <TransferButton placeholder="UPDATE" path="/mpin/update" />
                </div>
            </div>
            
            <div className="mt-8">{children}</div>
        </div>
    );
}
