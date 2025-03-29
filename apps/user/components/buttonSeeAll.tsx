"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react";


export default function ButtonSeeAllCard({link, children} : {link:string, children: React.ReactNode})
{
    const router = useRouter();
    const [IsDisable, setIsDisable] = useState(false)

    if(IsDisable)
    {
        return (
            <button disabled className="flex hover:underline py-1" onClick={() => {
                setIsDisable(true)
                router.push(link)
            }}>
                {children}
            </button>
        )
    }
    return (
        <button className="flex hover:underline py-1" onClick={() => {
            setIsDisable(true)
            router.push(link)
        }}>
            {children}
        </button>
    )
}