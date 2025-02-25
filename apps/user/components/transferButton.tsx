"use client"
import { redirect, useRouter } from "next/navigation"


export default function TransferButton({placeholder, path}: {
    placeholder: string,
    path: string
})
{
    const router = useRouter();
    return  <div>
        <button onClick={() => {
            // redirect(path)
            router.push(path);
        }} className="bg-white text-black font-semibold h-10 w-max px-8 rounded-2xl">{placeholder}</button>
    </div>
}