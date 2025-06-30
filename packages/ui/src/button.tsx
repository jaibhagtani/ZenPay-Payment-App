"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  // ******** V.V.V.Imp ********
  onClickFunc: () => void;
  state?: boolean;
  className?: string;
}

export const Button = ({onClickFunc, children, state, className }: ButtonProps) => {
  return (
    <button onClick={onClickFunc} disabled={state || false} className={className ? className : "h-11 mr-2 items-center flex justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition delay-50 duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-700"}>
      {children} 
    </button>
  );
};
