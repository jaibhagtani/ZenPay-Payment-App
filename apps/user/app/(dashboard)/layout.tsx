import SideBarItems from "@repo/ui/sidebaritems"
import { JSX } from "react"
import { Metadata } from "next"; 


export const metadata: Metadata = {
  title: "ZenPay App",
  description: "A wallet app",
};


export default function({children} : {children: React.ReactNode}) : JSX.Element{
    return ( <>
            <div className="flex bg-pink-50 w-screen">
                <div className="min-w-60 max-w-96 border-r border-slate-300 border-sm h-screen mt-16 ">
                    <div className="pt-4">
                        <SideBarItems href="/dashboard" icon={<HomeIcon/>} title="Home"></SideBarItems>
                    </div>
                    <div className="pt-4">
                        <SideBarItems href="/transfer/deposit" icon={<Transfer/>} title="Transfer"></SideBarItems>
                    </div>
                    <div className="pt-4">
                        <SideBarItems href="/transactions/deposit" icon={<Transactions />} title="Transactions"></SideBarItems>
                    </div>
                    <div className="pt-4">
                        <SideBarItems href="/p2p" icon={<P2P />} title="P2P Transfer"></SideBarItems>
                    </div>
                </div>
                <div className="bg-pink-50">
                    {children}
                </div>
            </div>
        </>
    )
}

function P2P()
{
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="2.0" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>

    </div>
}
function HomeIcon()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={2.0} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </div>
    )
}

function Transfer()
{
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={2.0} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
    </div>
}

function Transactions()
{
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={2.0} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </div>
}