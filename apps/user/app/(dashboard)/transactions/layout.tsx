import React, { JSX } from "react";


export default function({children} : {children: React.ReactNode}) : JSX.Element
{
    return (  <div>
                <div className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-2 font-bold px-4 mt-12">
                    Transactions
                </div>
                    {/* add select */}
                <div className="max-w-screen">
                    {children}
                </div>
        </div>
        
    )
}