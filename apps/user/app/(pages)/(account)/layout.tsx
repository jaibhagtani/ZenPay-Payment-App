import React from "react";
import SideBarMobile from "../../../components/SideBarMobile";
import SidebarPC from "../../../components/SideBarPC";




export default function({children} : {children :React.ReactNode})
{
    return (
        <>  
            <div className="flex bg-pink-50/70 min-w-screen min-h-screen z-50 static">
                <div className="pt-16 relative">
                    <div className="lg:invisible">
                        <SideBarMobile type={"Profile"} />
                    </div>
                    <div className="hidden lg:block lg:w-64 border-r h-full min-h-screen border-slate-300 border-sm">
                        
                        <SidebarPC type="Profile" />
                    </div>
                </div>
                    
                <div className="bg-pink-50">
                    {children}
                </div>
            </div>
            </>
    )
}