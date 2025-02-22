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
            className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
                isScrolled ? "shadow-xl backdrop-blur-2xl" : "bg-transparent"
            }`}
        >
            <AppBar
                onSignin={signIn}
                onSignout={async () => {
                    await signOut();
                    router.push("/api/auth/signin");
                }}
                user={session?.data?.user}
            />
        </nav>
    )
}