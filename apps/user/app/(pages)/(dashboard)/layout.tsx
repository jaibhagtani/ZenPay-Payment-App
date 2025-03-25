import { JSX } from "react"
import { Metadata } from "next"; 
import SideBarMobile from "../../../components/SideBarMobile";
import SidebarPC from "../../../components/SideBarPC";


export const metadata: Metadata = {
  title: "ZenPay App",
  description: "A wallet app",
};


export default function({children} : {children: React.ReactNode}) : JSX.Element{
    return ( <>
        
        <div className="flex bg-pink-50/70 min-w-screen min-h-screen z-50 static">
            <div className="pt-16 relative">
                <div className="lg:invisible">
                    <SideBarMobile />
                </div>
                <div className="hidden lg:block lg:w-64 border-r h-full min-h-screen border-slate-300 border-sm">
                    <SidebarPC />
                </div>
            </div>
                
            <div className="bg-pink-50">
                {children}
            </div>
        </div>
    </>
    )
}
