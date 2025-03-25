"use client"
import { AppBar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AppBarClient() {

    const session = useSession();
    const router = useRouter();
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
                    router.push("/auth/signin")
                }}
                onSignout={async () => {
                    await signOut();
                    router.push("/auth/signin");
                }}
                user={session?.data?.user}
            />
        </nav>
    )
}