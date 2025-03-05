import { Link } from "react-router-dom";
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
    return(
        <div className="flex justify-between border-b px-5 py-1 border-slate-400/80 rounded-sm bg-pink-50">
            <div className="flex flex-col justify-center">
                {/* <Link to="/"> */}
                    <div className="text-3xl flex justify-center font-bold">
                        ZenPay
                    </div>
                {/* </Link> */}
            </div>
        
            <div className="flex flex-col justify-center pt-2">
                <Button onClickFunc={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}