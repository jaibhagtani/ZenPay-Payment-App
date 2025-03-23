import { redirect } from "next/navigation";
import { Button } from "./button";
import { JSX } from "react";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // figure out what the type should be here ?
    onSignin : any,
    onSignout : any
}

export function AppBar({
    user,
    onSignin,
    onSignout
} : AppbarProps) : JSX.Element
{
    
    let firstch;
    let lastch;
    if(user && user.name && user.name.length > 0)
    {
        let username = user.name.split(" ");
        if(username.length > 0)
        {
            firstch = (username[0])?.toString()
            if(firstch)
            firstch = firstch[0]?.toUpperCase();

            if(username.length > 1)
            {
                lastch = (username[1])?.toString()
                if(lastch)
                lastch = lastch[0]?.toUpperCase();
            }
        }
    }
    return(
        <div className="flex justify-between border-b px-5 py-1 border-slate-400/80 rounded-sm bg-pink-50">
            <div className="flex flex-col justify-center">
                    <div className="text-3xl flex justify-center font-bold">
                        ZenPay
                    </div>
            </div>
            <div className="flex flex-col justify-center pt-2">
                <div className="flex">
                    
                    {user ? <div className="rounded-full bg-slate-400 size-11 flex justify-center items-center mr-16 text-2xl" onClick={() => {
                        redirect("/account");
                    } }>
                        {firstch ? firstch : ""}
                        {lastch ? lastch : ""}
                    </div> : ""}
                    <Button onClickFunc={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
                </div>
            </div>
        </div>
    )
}