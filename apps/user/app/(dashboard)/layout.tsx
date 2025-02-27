import { JSX } from "react"
import { Metadata } from "next"; 
import SideBarMobile from "../../components/SideBarMobile";
import SidebarPC from "../../components/SideBarPC";


export const metadata: Metadata = {
  title: "ZenPay App",
  description: "A wallet app",
};


export default function({children} : {children: React.ReactNode}) : JSX.Element{
    return ( <>
        
        <div className="flex bg-pink-50 min-w-screen min-h-screen z-50">
            <div className="mt-16">
                <div className="lg:invisible">
                    <SideBarMobile />
                </div>
                <div className="hidden lg:block lg:w-64 border-r border-slate-300 border-sm h-screen">
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
