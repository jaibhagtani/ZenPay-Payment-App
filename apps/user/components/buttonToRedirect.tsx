"use client"
import { Button } from "@repo/ui/button";
import { redirect } from "next/navigation";
import React from "react";



export default function ButtonToRedirect({children, to} : {children : React.ReactNode, to: string})
{   
    return (
        <div>   
            <Button onClickFunc={() => {
                redirect(to);
            }}>{children}</Button>
        </div>
    )
}