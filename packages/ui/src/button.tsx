"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  // ******** V.V.V.Imp ********
  onClickFunc: () => void;
}

export const Button = ({onClickFunc, children }: ButtonProps) => {
  return (
    <button onClick={onClickFunc} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children} 
    </button>
  );
};
