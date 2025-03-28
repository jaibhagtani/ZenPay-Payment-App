"use client"
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import React from "react";



export default function ButtonToRedirect({children, to} : {children : React.ReactNode, to: string})
{   
    const router = useRouter();
    return (
        <div>   
            <Button onClickFunc={() => {
                router.push(to);
            }}>{children}</Button>
        </div>
    )
}