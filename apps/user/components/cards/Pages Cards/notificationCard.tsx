

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  AlertCircle,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

type NotificationType = {
  id: number;
  title: string;
  description: string;
  type: "payment" | "pay" | "approve";
  status: "read" | "unread" | "pending" | "approved";
  time: string;
  action?: "pay" | "approve";
  actionRoute?: string; // 👈 New: where to go when clicking the action
};

const initialData: NotificationType[] = [
  {
    id: 1,
    title: "Payment of ₹500 received",
    description: "From Ankit Sharma",
    type: "payment",
    status: "read",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "You owe ₹120 to Shruti",
    description: "Lunch split",
    type: "pay",
    status: "unread",
    time: "1 hour ago",
    action: "pay",
    actionRoute: "/split/pay?id=120",
  },
  {
    id: 3,
    title: "Pending approval for trip",
    description: "₹240 approval pending",
    type: "approve",
    status: "pending",
    time: "3 days ago",
    action: "approve",
    actionRoute: "/split/approve?id=240",
  },
];

const tabs = ["All", "Unread", "Pendings"];

export function NotificationsAndPendingsComponent() {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("All");

  const handleAction = (id: number, action: "pay" | "approve", route?: string) => {
    setData((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: action === "approve" ? "approved" : "read",
              type: action === "approve" ? "pay" : "payment",
              title:
                action === "approve"
                  ? "Payment Approved"
                  : "Payment of ₹240 sent",
              description:
                action === "approve"
                  ? "Please proceed to pay ₹240"
                  : "To Trip Organizer",
              action: action === "approve" ? "pay" : undefined,
            }
          : n
      )
    );

    if (route) {
      router.push(route);
    }
  };

  const filteredData =
    activeTab === "All"
      ? data
      : activeTab === "Unread"
      ? data.filter((n) => n.status === "unread")
      : data.filter((n) => n.status === "pending" || n.action === "approve" || n.action === "pay");

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
        Notifications & Pendings
      </h1>

      <div className="flex space-x-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {filteredData.length === 0 ? (
          <div className="text-slate-500 text-sm">No notifications found.</div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="p-2 rounded-full bg-pink-100 text-pink-600">
                {item.type === "payment" && <Bell className="w-5 h-5" />}
                {item.type === "pay" && <IndianRupee className="w-5 h-5" />}
                {item.type === "approve" && <AlertCircle className="w-5 h-5" />}
                {item.status === "approved" && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-slate-800">{item.title}</div>
                <div className="text-sm text-slate-600">{item.description}</div>
                <div className="text-xs text-slate-400 mt-1">{item.time}</div>
              </div>

              {item.action && (
                <button
                  onClick={() => handleAction(item.id, item.action!, item.actionRoute)}
                  className={`text-sm text-white px-3 py-1 rounded-full ${
                    item.action === "approve"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-rose-500 hover:bg-rose-600"
                  }`}
                >
                  {item.action === "approve" ? "Approve" : "Pay Now"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
