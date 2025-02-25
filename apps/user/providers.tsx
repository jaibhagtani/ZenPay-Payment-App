"use client"

import React from "react"
import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react"
import { BrowserRouter } from "react-router"


export default function Providers({children} : {children:React.ReactNode}) {

    return ( <>
        <RecoilRoot> 
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
    </>
    )
}