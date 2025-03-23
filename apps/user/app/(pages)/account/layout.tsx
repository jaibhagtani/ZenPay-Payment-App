import React, { JSX } from "react";



export default function AcountSection({children} : {children : React.ReactNode}) : JSX.Element
{
    return (
        <div className="bg-white h-max w-screen">
            <div className="flex justify-center">
                Account Details
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}