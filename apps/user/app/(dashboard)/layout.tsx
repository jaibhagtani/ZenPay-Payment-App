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
        
        <div className="flex bg-pink-50 w-screen">
            <div className="mt-16 lg:min-w-60 max-w-96 border-r border-slate-300 border-sm min-h-screen "> 
                <div className="lg:disable block">
                    <SideBarMobile />
                </div>
                <div className="invisible lg:visible">
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
