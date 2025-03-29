"use client"
import { useRouter } from "next/navigation"
import React from "react";


export default function ButtonSeeAllCard({link, children} : {link:string, children: React.ReactNode})
{
    const router = useRouter();
    return (
        <div>
            <button className="flex hover:underline py-1" onClick={() => {
                router.push(link)
            }}>
                {children}
            </button>
        </div>
    )
}