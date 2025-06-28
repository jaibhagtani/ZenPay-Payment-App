"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  FaPlus,
  FaChevronDown,
  FaChevronRight,
  FaClock,
  FaCreditCard,
  FaListOl,
  FaBolt,
} from "react-icons/fa";
import SplitBillComponent from "../../../../components/cards/Pages Cards/splitCards";
import { CreateSplit } from "../../../lib/actions/createSplit";
import { getSplitDetails } from "../../../lib/actions/getSplitDetails";

const themeBtn = "bg-[#6e3cbc] hover:bg-[#593397] text-white";

type Tab = "All" | "Pending" | "Completed";

interface SplitItem {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  amount: number;
  description: string;
  paid: boolean;
}

export default function SplitBillPage() {
  const [splits, setSplits] = useState<SplitItem[][]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [splitSearch, setSplitSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [totalAmt, setTotalAmt] = useState(0);
  const [personalDesc, setPersonalDesc] = useState("");

  const [paymentsPending, setPaymentsPending] = useState("₹0.00");
  const [pendingCredits, setPendingCredits] = useState("₹0.00");
  const [totalSplits, setTotalSplits] = useState("0");
  const [activeSplits, setActiveSplits] = useState("0");

  const getAndSetSplitDetails = async () => {
    const res = await getSplitDetails();
    console.log(res)
    if (
      res?.paymentsPending !== undefined &&
      res?.pendingCredits !== undefined &&
      res?.totalSplits !== undefined &&
      res?.activeSplits !== undefined &&
      res?.allSplits !== undefined
    ) {
      setPaymentsPending(`₹${res.paymentsPending.toFixed(2)}`);
      setPendingCredits(`₹${res.pendingCredits.toFixed(2)}`);
      setTotalSplits(res.totalSplits.toString());
      setActiveSplits(res.activeSplits.toString());
      setSplits(res.allSplits);
    }
  };

  useEffect(() => {
    getAndSetSplitDetails();
  }, []);

  const handleCreateSplit = async (newGroup: SplitItem[], creatorDesc: string) => {
    const res = await CreateSplit(newGroup, totalAmt, creatorDesc);
    alert(res.msg);
    if (res.msg === "Split successfully created") {
      await getAndSetSplitDetails();
    }
    setShowForm(false);
  };

  const filteredSplits = useMemo(
    () =>
      splits.filter(group => {
        const first = group[0];
        const descMatch = first?.description.toLowerCase().includes(splitSearch.toLowerCase());
        const phoneMatch = group.some(i => i.phoneNumber.includes(splitSearch));
        const statusMatch =
          activeTab === "All"
            ? true
            : activeTab === "Pending"
            ? group.some(i => !i.paid)
            : group.every(i => i.paid);
        return (descMatch || phoneMatch) && statusMatch;
      }),
    [splits, splitSearch, activeTab]
  );

  return (
    <div className="flex-auto mt-20 mx-10">
      <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent font-bold mb-6">
        Bills Split
      </h1>
      <h4 className="text-xl sm:text-2xl bg-purple-700 bg-clip-text text-transparent font-bold mb-6">
        Manage shared expenses
      </h4>
      <div className="mb-4 px-8 py-6 bg-white min-h-screen lg:mx-auto rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card icon={<FaClock className="text-purple-600" />} label="Pending payments" value={paymentsPending} classes="bg-purple-50 border-purple-200 text-purple-800" />
          <Card icon={<FaCreditCard className="text-green-600" />} label="Pending credits" value={pendingCredits} classes="bg-green-50 border-green-200 text-green-800" />
          <Card icon={<FaListOl className="text-blue-600" />} label="Total splits" value={totalSplits} classes="bg-blue-50 border-blue-200 text-blue-800" />
          <Card icon={<FaBolt className="text-yellow-600" />} label="Active splits" value={activeSplits} classes="bg-yellow-50 border-yellow-200 text-yellow-800" />
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className={`${themeBtn} px-6 py-3 rounded-lg flex items-center space-x-2 shadow-md`}
          >
            <FaPlus /> <span>Create Split</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <div className="flex items-center space-x-3">
            {(["All", "Pending", "Completed"] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm border ${
                  activeTab === tab ? "bg-[#6e3cbc] text-white" : "text-gray-700 bg-white hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search splits..."
            value={splitSearch}
            onChange={e => setSplitSearch(e.target.value)}
            className="border rounded-md px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[#6e3cbc]"
          />
        </div>

        <div className="space-y-5">
          {filteredSplits.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-sm border rounded-xl bg-gray-50">
              No splits yet
            </div>
          ) : (
            filteredSplits.map((group, idx) => (
              <div key={idx} className="rounded-xl border shadow-sm bg-white overflow-hidden">
                <HeaderRow group={group} expanded={expanded === idx} onClick={() => setExpanded(expanded === idx ? null : idx)} />
                {expanded === idx && <Details group={group} themeBtn={themeBtn} />}
              </div>
            ))
          )}
        </div>

        {showForm && (
          <SplitBillComponent
            setPersonalDescription={setPersonalDesc}
            setAmount={setTotalAmt}
            onClose={() => setShowForm(false)}
            onCreateSplit={handleCreateSplit}
          />
        )}
      </div>
    </div>
  );
}

function Card({ icon, label, value, classes }: { icon: React.ReactNode; label: string; value: string; classes: string }) {
  return (
    <div className={`p-4 rounded-xl shadow-sm ${classes} border`}>
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <h4 className="text-gray-600 text-sm font-medium">{label}</h4>
      </div>
      <p className={`text-2xl font-semibold ${classes.split(" ").pop()}`}>{value}</p>
    </div>
  );
}

function HeaderRow({ group, expanded, onClick }: { group: SplitItem[]; expanded: boolean; onClick: () => void }) {
  return (
    <div className="flex justify-between items-center p-4 cursor-pointer bg-[#f1ebfc]" onClick={onClick}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{group[0]?.description}</h3>
        <p className="text-gray-500 text-sm mt-1">
          {group.length} people • ₹{group.reduce((a, b) => a + b.amount, 0).toFixed(2)} total
        </p>
      </div>
      {expanded ? <FaChevronDown /> : <FaChevronRight />}
    </div>
  );
}

function Details({ group, themeBtn }: { group: SplitItem[]; themeBtn: string }) {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {group.map((p, i) => (
          <div
            key={i}
            className={`w-max flex justify-between items-center p-4 rounded-xl border ${p.paid ? "bg-green-50" : "bg-yellow-50"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-[#d6c4f7] flex items-center justify-center font-semibold text-[#6e3cbc]">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-600">{p.email}</p>
                <p className="text-sm text-gray-600 mt-1">{p.phoneNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-gray-900">₹{p.amount.toFixed(2)}</p>
              <p className={`text-xs mt-1 font-medium ${p.paid ? "text-green-600" : "text-yellow-600"}`}>
                {p.paid ? "Paid" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-3">
        <button className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Remind</button>
        <button className={`${themeBtn} px-5 py-2 rounded-lg`}>View Details</button>
      </div>
    </div>
  );
}
