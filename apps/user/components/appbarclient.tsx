"use client"
import { AppBar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { BrowserRouter, RouterProvider } from "react-router-dom";

export function AppBarClient() {

    const session = useSession();
    const router = useRouter();
    return (
        <div>
            <AppBar onSignin={signIn} onSignout={async () => {
                await signOut();
                router.push("/api/auth/signin");
            }} user={session?.data?.user}></AppBar>
        </div>
    )
}