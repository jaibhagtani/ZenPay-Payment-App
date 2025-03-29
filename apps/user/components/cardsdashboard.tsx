"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ActionCard({ icon, label, to } : any) {
    const router = useRouter();
    const [IsDisable, setIsDisable] = useState(false);

    if(IsDisable)
    {
      return (
        <button disabled onClick={() => {
          setIsDisable(true)
          router.push(to)
        }} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          {/* Icon Circle */}
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
            {icon}
          </div>
          {/* Label */}
          <p className="text-sm font-semibold text-gray-700">{label}</p>
        </button>
      );
    }

    return (
      <button onClick={() => {
        setIsDisable(true)
        router.push(to)
      }} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        {/* Icon Circle */}
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
          {icon}
        </div>
        {/* Label */}
        <p className="text-sm font-semibold text-gray-700">{label}</p>
      </button>
    );
    
  }