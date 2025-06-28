"use client";
import { JSX, useState } from "react";
import Link from "next/link";
import { Button } from "./button";

interface AppbarProps {
  user?: { name?: string | null };
  onSignin: any;
  onSignout: any;
  setIsAccountBar: (e: boolean) => void;
  isAccountBar: boolean;
}

export function AppBar({
  user,
  onSignin,
  onSignout,
  setIsAccountBar,
  isAccountBar,
}: AppbarProps): JSX.Element {
  const [showNotifications, setShowNotifications] = useState(false);

  let firstch: string | undefined;
  let lastch: string | undefined;

  if (user?.name) {
    const username = user.name.split(" ");
    firstch = username[0]?.[0]?.toUpperCase();
    if (username.length > 1) {
      lastch = username[1]?.[0]?.toUpperCase();
    }
  }

  const mockNotifications = [
    "₹500 received from Ankit",
    "You created a new Split",
    "Pending payment: ₹240",
    "Pending payment: ₹240",
    "Pending payment: ₹240",
    "Pending payment: ₹240",
    "Pending payment: ₹240",
  ];

  return (
    <div className="flex justify-between items-center border-b px-5 py-2 border-slate-300 bg-pink-50">
      <div className="text-xl md:text-3xl font-bold text-slate-800">ZenPay</div>

      <div className="flex items-center space-x-3 relative">
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition"
          >
            <BellIcon />
            <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-0 rounded-full">
              {mockNotifications.length}
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <ul className="divide-y text-sm max-h-64 overflow-y-auto">
                {mockNotifications.map((n, i) => (
                  <li key={i} className="px-4 py-3 hover:bg-slate-50">
                    {n}
                  </li>
                ))}
              </ul>
              <Link
                href="/notificationsnpendings"
                className="block text-center py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-semibold text-sm"
              >
                See all
              </Link>
            </div>
          )}
        </div>

        {user && (
          <div
            className="hidden lg:flex rounded-full justify-center items-center text-white font-semibold text-sm md:text-xl size-11 bg-slate-400 cursor-pointer hover:border-2 border-black border-solid"
            onClick={() => setIsAccountBar(!isAccountBar)}
          >
            {firstch}
            {lastch}
          </div>
        )}

        <button
          onClick={() => setIsAccountBar(!isAccountBar)}
          aria-controls="logo-sidebar"
          type="button"
          className="h-11 px-5 py-2.5 flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm transition hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-700"
        >
          <span className="sr-only">Open sidebar</span>
          Account Details
        </button>

        <Button onClickFunc={user ? onSignout : onSignin}>
          <div className="flex items-center">
            <LogOutIcon />
            <span className="hidden md:block ml-2">
              {user ? "Log Out" : "Login"}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}

function LogOutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h4a2 2 0 002-2V5a2 2 0 00-2-2H3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
           a6.002 6.002 0 00-4-5.659V4
           a2 2 0 00-4 0v1.341
           C7.67 6.165 6 8.388 6 11v3.159
           c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1
           a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}
