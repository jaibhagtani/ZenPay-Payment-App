// File: components/NotificationsAndPendingsClient.tsx (Fully Responsive Client Component)
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, AlertCircle, IndianRupee } from "lucide-react";
import { getRouterDetails } from "../../app/lib/actions/getRouteApprove";

interface Notification {
  action: "APPROVE" | "PAY" | "VIEW";
  id: number;
  userId: number;
  title: string;
  message: string;
  type: "SPLIT" | "PAYMENT" | "TRANSFER";
  createdAt: Date;
  splitId: number;
}

type Props = { initialNotifications: Notification[] };

export default function NotificationsAndPendingsClient({ initialNotifications }: Props) {
  const router = useRouter();
  const [data] = useState<Notification[]>(initialNotifications);
  const tabs = ["All", "Pendings"];
  const [activeTab, setActiveTab] = useState<string>("All");

  const handleAction = async (id: number, action: Notification['action']) => {
    const routerDetails = await getRouterDetails({ id, action });
    if (routerDetails) {
      const path = action === "APPROVE" ? "approve" : "pay";
      router.push(`/split-bill/${path}/${routerDetails.token}/${routerDetails.splitId}/${routerDetails.splitBillId}`);
    }
  };

  const filtered = activeTab === "All" ? data : data.filter(n => n.action !== "VIEW");

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition duration-200 ${
              activeTab === tab
                ? "bg-[#a259ff] text-white shadow"
                : "bg-[#efe5fb] text-[#7c3aed] hover:bg-[#e4d6f7]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop/Table view */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">No notifications found.</div>
        ) : (
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="p-4">Type</th>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Time</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b last:border-none hover:bg-gray-100">
                  <td className="p-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      item.type === "PAYMENT" ? "bg-[#fde4e1]" : item.type === "TRANSFER" ? "bg-[#e0f2f1]" : "bg-[#e0f2ff]"
                    }`}
                    >
                      {item.type === "PAYMENT" ? (
                        <Bell className="w-5 h-5 text-[#b45309]" strokeWidth={1.5} />
                      ) : item.type === "TRANSFER" ? (
                        <IndianRupee className="w-5 h-5 text-[#047857]" strokeWidth={1.5} />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#1e40af]" strokeWidth={1.5} />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-sm truncate max-w-[180px]">{item.title}</td>
                  <td className="p-4 text-gray-600 text-sm truncate max-w-[250px]">{item.message}</td>
                  <td className="p-4 text-xs text-gray-500 whitespace-nowrap">{new Date(item.createdAt).toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right">
                    {item.action !== "VIEW" && (
                      <button
                        onClick={() => handleAction(item.id, item.action)}
                        className={`text-sm px-4 py-2 rounded-full font-medium transition duration-200 ${
                          item.action === "APPROVE" ? "bg-[#a259ff] text-white" : "bg-[#f14668] text-white"
                        } hover:opacity-90`}
                      >
                        {item.action === "APPROVE" ? "Approve" : "Pay Now"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile/Card view */}
      <div className="md:hidden space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-4">No notifications found.</div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    item.type === "PAYMENT" ? "bg-[#fde4e1]" : item.type === "TRANSFER" ? "bg-[#e0f2f1]" : "bg-[#e0f2ff]"
                  }`}
                  >
                    {item.type === "PAYMENT" ? (
                      <Bell className="w-4 h-4 text-[#b45309]" strokeWidth={1.5} />
                    ) : item.type === "TRANSFER" ? (
                      <IndianRupee className="w-4 h-4 text-[#047857]" strokeWidth={1.5} />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#1e40af]" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
                {item.action !== "VIEW" && (
                  <button
                    onClick={() => handleAction(item.id, item.action)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition duration-200 ${
                      item.action === "APPROVE" ? "bg-[#a259ff] text-white" : "bg-[#f14668] text-white"
                    } hover:opacity-90`}
                  >
                    {item.action === "APPROVE" ? "Approve" : "Pay"}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-600 mb-2 truncate">{item.message}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
