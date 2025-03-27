"use client";
import { useEffect, useState } from "react";
import { AppBarClient } from "./appbarclient";
import SideBarItems from "@repo/ui/sidebaritems";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DownAccountBar() {
    const [isAccountBar, setIsAccountBar] = useState(false);
    const session = useSession();
    // const [clicked, setClicked] = useState(false);

    // useEffect(() => {
    //   setIsAccountBar(!isAccountBar)
    // }, [clicked])
    
    const hideSidebar = () => {
      setIsAccountBar(false);
    };
  
  return (
    <div>
      <AppBarClient setIsAccountBar={setIsAccountBar} isAccountBar={isAccountBar} />
      
      {isAccountBar && (
        <div className="flex justify-center absolute w-64">
          <aside
            id="logo-sidebar"
            className="fixed y-40 right-16 z-40 transition-transform translate-x-0 delay-50 w-64 min-h-max bg-pink-200 rounded-2xl border-sm py-10"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-1 overflow-y-auto">
              <div className="flex justify-center h-max mt-10 mb-2 text-black">
                <Avatar />
              </div>
              <div className="flex justify-center pb-2 font-bold text-2xl">
                Hello {session.data?.user?.name},
              </div>
              <ul className="space-y-2 font-medium">
                <SideBarItems href="/profile" icon={<ProfileIcon />} title="Profile" setClickFunc={hideSidebar} />
                <SideBarItems href="/mpin/update" icon={<MPINIcon />} title="MPIN" setClickFunc={hideSidebar} />
                <SideBarItems href="/balance" icon={<BalanceIcon />} title="Balances & Transfers" setClickFunc={hideSidebar} />
                <LogOut></LogOut>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Avatar() {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>

      </div>
    );
  }
  

  function ProfileIcon()
  {
    return (
        <div className="pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>

        </div>
    )
  }

  function MPINIcon()
  {

    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                >
                <path d="M6 9V7a6 6 0 1 1 12 0v2h1.5A1.5 1.5 0 0 1 21 10.5v9A3.5 3.5 0 0 1 17.5 23h-11A3.5 3.5 0 0 1 3 19.5v-9A1.5 1.5 0 0 1 4.5 9H6zm2-2v2h8V7a4 4 0 0 0-8 0zm.75 6.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm6 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm-6-3.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm6 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" />
            </svg>

        </div>
    )
    
  }

function LogOutIcon()
{
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21h4a2 2 0 002-2V5a2 2 0 00-2-2H3"
                />
            </svg>
        </div>
    )
}

function LogOut()
{
    return (
        <div className="flex ml-8 p-3 cursor-pointer text-lg text-slate-700 min-w-fit">
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-slate-700" onClick={async () => {
                await signOut();
                redirect("/auth/signin");
            }}>
                <div className="flex">
                    <LogOutIcon /> 
                    <div className="pl-4">Logout</div>
                </div> 
            </button>

            
        </div>
    )
}


function BalanceIcon()
{
    return (
        <div className="pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
            <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
            </svg>

        </div>
    )
}
