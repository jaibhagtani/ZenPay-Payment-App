"use client"
import { Button } from "./button";
import { JSX, useEffect, useState } from "react";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // figure out what the type should be here ?
    onSignin : any,
    onSignout : any,
    setIsAccountBar: (e : boolean) => void,
    isAccountBar: boolean
}

export function AppBar({
    user,
    onSignin,
    onSignout,
    setIsAccountBar,
    isAccountBar
} : AppbarProps) : JSX.Element
{
    const [downAccountBar, setDownAccountBar] = useState(false)
    let firstch;
    let lastch;

    // useEffect(() => {
    //     if (typeof setIsAccountBar === "function") {
    //         setIsAccountBar(downAccountBar);
    //     }
    // }, [downAccountBar]);

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
                <div className="flex justify-center">
                    
                    {user ? <div>
                        <div className="hidden lg:block lg:rounded-full text-center bg-slate-400 size-11 pt-1 flex justify-center items-center mr-16 text-2xl cursor-pointer hover:border-2 border-solid border-black" onClick={() => {
                            setIsAccountBar(!isAccountBar);
                        } }>
                            {firstch ? firstch : ""}
                            {lastch ? lastch : ""}
                        </div>
                    </div>
                         : ""}

                    <button
                        onClick={() =>setIsAccountBar(!isAccountBar)}
                        aria-controls="logo-sidebar"
                        type="button"
                        className="mr-10 items-center flex justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-slate-700"
                    >
                        <span className="sr-only">Open sidebar</span>
                        Account Details
                    </button>
                    <Button onClickFunc={user ? onSignout : onSignin}>{user ? <div className="flex">
                        <LogOutIcon />
                        <div className="ml-4">
                            Log Out
                        </div>
                    </div> : "Login"}</Button>
                </div>
            </div>
        </div>
    )
}


function LogOutIcon()
{
    return (
        <div>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h4a2 2 0 002-2V5a2 2 0 00-2-2H3"
            />
            </svg>
        </div>
    )
}