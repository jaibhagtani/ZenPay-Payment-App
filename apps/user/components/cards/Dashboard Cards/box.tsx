"use client"
import { useRouter } from "next/navigation";

export function ActionCard({ icon, label, to } : any) {
  const router = useRouter();
  return (
    <button onClick={() => {
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