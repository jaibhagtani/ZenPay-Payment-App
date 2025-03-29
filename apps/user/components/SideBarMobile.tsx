"use client"
import SideBarItems from "@repo/ui/sidebaritems";
import { HomeIcon, P2P, Transactions, Transfer } from "./Icons";
import { useState } from "react";
import ButtonToRedirect from "./buttonToRedirect";



export default function SideBarMobile({type} : {type : "Profile" | "Dashboard"})
{
    const [isSidebarOpen, SetIsSidebarOpen] = useState(false);
    // const [clicked ,setClicked] = useState(false);
    const hideSidebar = () => {
        SetIsSidebarOpen(false);
    };
    return (<div>
            {type === "Dashboard" ? (
            <div>
            <div className={`${isSidebarOpen ? "min-h-screen mr-2 text-purple-300" : "mr-2"}`}>
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

            <aside id="logo-sidebar" className={`fixed y-40 left-0 z-40 transition-transform -translate-x-full translate-x-0 delay-50 w-64 min-h-screen`} aria-label="Sidebar">
            <div className={`h-full px-3 py-4 overflow-y-auto ${isSidebarOpen ? "bg-pink-200 rounded-2xl h-max border-sm py-10" : ""}`}>
                <div className="text-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-transparent bg-clip-text font-bold">
                    Dashboard
                </div>
                <ul className="space-y-2 font-medium">
                    <li className="">
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen ? "m-10" : ""}`}>
                                <SideBarItems setClickFunc={hideSidebar} href="/dashboard" icon={<HomeIcon/>} title="Home"></SideBarItems>
                            </span>
                        </a>
                        
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems setClickFunc={hideSidebar} href="/transfer/deposit" icon={<Transfer/>} title="Transfer"></SideBarItems>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems setClickFunc={hideSidebar} href="/transactions/deposit" icon={<Transactions />} title="Transactions"></SideBarItems>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems setClickFunc={hideSidebar} href="/p2p" icon={<P2P />} title="P2P Transfer"></SideBarItems>
                            </span>
                        </a>
                    </li>
                </ul>
                <div className="flex justify-center py-6 pl-10">
                    <ButtonToRedirect to="/profile">
                        <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="pr-3 w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
    
                            <div className="font-bold items-center flex justify-center">
                                to Account
                            </div>
                        </div>
                    </ButtonToRedirect>
                </div>
            </div>
        </aside>   
        </div> : <div className="disable"></div>}
    </div>
    </div>
    ) : ( <div>
            <div className={`${isSidebarOpen ? "min-h-screen mr-2 text-purple-300" : "mr-2"}`}>
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

            <aside id="logo-sidebar" className={`fixed y-40 left-0 z-40 transition-transform -translate-x-full translate-x-0 delay-50 w-64 min-h-screen`} aria-label="Sidebar">
            <div className={`h-full px-3 py-4 overflow-y-auto ${isSidebarOpen ? "bg-pink-200 rounded-2xl h-max border-sm py-10" : ""}`}>
                <div className="text-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-transparent bg-clip-text font-bold">
                    Account
                </div>
                <ul className="space-y-2 font-medium">
                    <li className="">
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen ? "m-10" : ""}`}>
                                <SideBarItems setClickFunc={hideSidebar} href="/profile" icon={<ProfileIcon/>} title="Profile"></SideBarItems>
                            </span>
                        </a>
                        
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems setClickFunc={hideSidebar} href="/mpin/update" icon={<MPINIcon/>} title="MPIN"></SideBarItems>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex pt-2 hover:text-purple-100">
                            <span className="ms-3 whitespace-nowrap">
                                <SideBarItems setClickFunc={hideSidebar} href="/balance" icon={<BalanceIcon />} title="Balances & Txns"></SideBarItems>
                            </span>
                        </a>
                    </li>
                </ul>
                <div className="flex justify-center py-6 pl-6 pl-6">
                    <ButtonToRedirect to="/dashboard">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="pr-3 w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                            <div className="font-bold items-center flex justify-center">
                                to Dashboard
                            </div>
                        </div>
                    </ButtonToRedirect>
                </div>
            </div>
        </aside>   
        </div> : <div className="disable"></div>}
        </div>
        </div>
    )}
    </div>)    
}

function ProfileIcon()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

        </div>
    )
}


function MPINIcon()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>

        </div>
    )
}


function BalanceIcon()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
        </div>
    )
}