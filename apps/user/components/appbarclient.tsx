"use client"
import { AppBar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AppBarClient {
    setIsAccountBar: (e: boolean) => void,
    isAccountBar: boolean
}

export function AppBarClient({setIsAccountBar, isAccountBar} : AppBarClient) {

    const session = useSession();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-shadow duration-300 bg-pink-50 ${
                isScrolled ? "shadow-xl backdrop-blur-xl bg-pink-50/70" : "bg-transparent"
            }`}
        >
            <AppBar
                onSignin={() => {
                    redirect("/auth/signin")
                }}
                onSignout={async () => {
                    await signOut();
                    redirect("/auth/signin");
                }}
                user={session?.data?.user}
                setIsAccountBar={setIsAccountBar}
                isAccountBar ={isAccountBar}
            />
        </nav>
    )
}