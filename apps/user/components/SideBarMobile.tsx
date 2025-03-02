"use client"
import SideBarItems from "@repo/ui/sidebaritems";
import { HomeIcon, P2P, Transactions, Transfer } from "./Icons";
import { useState } from "react";



export default function SideBarMobile()
{
    const [isSidebarOpen, SetIsSidebarOpen] = useState(false);

    return <div className={`${isSidebarOpen ? "h-screen mr-2 text-purple-300" : "mr-2"}`}>
            <button onClick={() => {
                SetIsSidebarOpen(!isSidebarOpen);
            }} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center mt-4 p-2.5 text-sm text-purple-500 rounded-lg lg:hidden hover:bg-purple-100">
                <span className="sr-only">Open sidebar</span>
                {!isSidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                </svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
              </svg>
              }
            </button>
            {isSidebarOpen ? <div className={`flex justify-center ${isSidebarOpen ? "absolute w-64" : "invisible disable"}`}>

            <aside id="logo-sidebar" className={`fixed y-40 left-0 z-40 transition-transform -translate-x-full translate-x-0 delay-50 w-64 h-screen`} aria-label="Sidebar">
            <div className={`h-full px-3 py-4 overflow-y-auto ${isSidebarOpen ? "bg-pink-200 rounded-2xl h-max border-sm py-10" : ""}`}>
                <ul className="space-y-2 font-medium">
                    <li className="">
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen ? "m-10" : ""}`}>
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
        </aside>   
        </div> : <div className="disable"></div>}
    </div>
}