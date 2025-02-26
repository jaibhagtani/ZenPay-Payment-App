"use client"
import SideBarItems from "@repo/ui/sidebaritems";
import { HomeIcon, P2P, Transactions, Transfer } from "./Icons";
import { useState } from "react";



export default function SideBarMobile()
{
    const [isSidebarOpen, SetIsSidebarOpen] = useState(false);
    return <div>
            <button onClick={() => {
                SetIsSidebarOpen(!isSidebarOpen);
            }} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex min-w-60 items-center p-2 mt-2 ms-3 text-sm text-purple-500 rounded-lg lg:hidden hover:bg-purple-100">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            {isSidebarOpen ? <div className="flex justify-center">

            <aside id="logo-sidebar" className="transition-transform -translate-x-full sm:translate-x-0 delay-50 fixed top-40 left-0 z-40 w-64 h-screen " aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li className="">
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems href="/dashboard" icon={<HomeIcon/>} title="Home"></SideBarItems>
                            </span>
                        </a>
                        
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems href="/transfer/deposit" icon={<Transfer/>} title="Transfer"></SideBarItems>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems href="/transactions/deposit" icon={<Transactions />} title="Transactions"></SideBarItems>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems href="/p2p" icon={<P2P />} title="P2P Transfer"></SideBarItems>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>   </div> : <div className="disable"></div>}
    </div>
}