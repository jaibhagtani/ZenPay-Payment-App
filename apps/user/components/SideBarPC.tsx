import SideBarItems from "@repo/ui/sidebaritems";
import { HomeIcon, P2P, Transactions, Transfer } from "./Icons";
import { Button } from "@repo/ui/button";
import ButtonToRedirect from "./buttonToRedirect";



export default function SidebarPC({type} : {type: "Dashboard" | "Profile"})
{
    if(type === "Dashboard")
    {
        return ( <div className="disable lg:fixed top-20 left-0 z-30 font-medium">
            <div className="flex justify-center text-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-transparent bg-clip-text font-bold pb-6 pt-6 pl-5">
                DASHBOARD
            </div>
            <div className="flex justify-center py-6 pl-10">
                <ButtonToRedirect to="/profile">
                    <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="1.5" stroke="currentColor" className="pr-3 w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>

                        <div className="font-bold items-center flex justify-center">
                            to Account
                        </div>
                    </div>
                </ButtonToRedirect>
            </div>
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
        )
        
    }
    else 
    {
        return ( <div className="disable lg:fixed top-20 left-0 z-30 font-medium">
            <div className="flex justify-center text-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-transparent bg-clip-text font-bold pb-6 pt-6 pl-2">
                ACCOUNT
            </div>
            <div className="flex justify-center py-6 pl-6 pl-6">
                <ButtonToRedirect to="/dashboard">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="1.5" stroke="currentColor" className="pr-3 w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                        <div className="font-bold items-center flex justify-center">
                            to Dashboard
                        </div>
                    </div>
                </ButtonToRedirect>
            </div>
            <div className="pt-4">
                <SideBarItems href="/profile" icon={<HomeIcon/>} title="Profile"></SideBarItems>
            </div>
            <div className="pt-4">
                <SideBarItems href="/mpin/update" icon={<Transfer/>} title="MPIN"></SideBarItems>
            </div>
            <div className="pt-4">
                <SideBarItems href="/balance" icon={<Transactions />} title={`Balances & Txns`}></SideBarItems>
            </div>
        </div>
        )
    }
    
}