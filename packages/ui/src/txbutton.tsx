"use client"
import { redirect } from "next/navigation";



export default function TxButton({href, placeholder}: {
    href: string,
    placeholder: string
})
{
    return <div>
        <button onClick={() => {
            redirect(href);
        }} className="bg-indigo-200 text-indigo-700 rounded-3xl w-60 h-10 text-center font-semibold my-8 mx-40">{placeholder}</button>
    </div>
}