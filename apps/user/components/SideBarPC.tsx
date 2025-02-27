import SideBarItems from "@repo/ui/sidebaritems";
import { HomeIcon, P2P, Transactions, Transfer } from "./Icons";



export default function SidebarPC()
{
    return ( <div className="disable lg:fixed top-40 left-0 z-40 font-medium">
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