"use client"
import { usePathname, useRouter } from "next/navigation"


export default function TransferButton({placeholder, path}: {
    placeholder: string,
    path: string
})
{
    const router = useRouter();
    const currpath = usePathname();
    const selected = currpath === path

    return  <div>
        <button onClick={() => {
            router.push(path);
        }} suppressHydrationWarning={true} className={`text-black font-semibold h-10 w-max px-10 rounded-2xl ${selected ? "bg-white" : ""} hover:text-gray-600`}>{placeholder}</button>
    </div>
}