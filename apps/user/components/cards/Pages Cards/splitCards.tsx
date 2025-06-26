"use client"
import React, { useState, useMemo } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const themeBg = "bg-gray-200";
const themeAccent = "text-[#6e3cbc]";
const themeBtn = "bg-[#6e3cbc] hover:bg-[#593397] text-white";

interface Contact {
  id: number;
  name: string;
  email: string;
}

export default function SplitBillComponent() {
  // Sample contacts
  const [contacts] = useState<Contact[]>([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ]);

  // State
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [extraContacts, setExtraContacts] = useState<string[]>([]);
  const [phoneInput, setPhoneInput] = useState("");
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [mode, setMode] = useState<"equal" | "custom">("equal");
  const [customDist, setCustomDist] = useState<Record<string, number>>({});

  // Combine real and extra
  const allTargets = useMemo(() => {
    const real = Array.from(selectedContacts).map(
      id => contacts.find(c => c.id === id)?.name || ""
    );
    return [...real, ...extraContacts];
  }, [selectedContacts, extraContacts, contacts]);

  // Compute splits
  const splits = useMemo(() => {
    const cnt = allTargets.length;
    if (!cnt || totalAmt <= 0) return [];
    if (mode === "equal") {
      const each = +(totalAmt / cnt).toFixed(2);
      return allTargets.map(label => ({ label, amount: each }));
    } else {
      const totalW = allTargets.reduce((sum, label) => sum + (customDist[label] || 0), 0);
      return allTargets.map(label => ({
        label,
        amount: totalW ? +((customDist[label] || 0) / totalW * totalAmt).toFixed(2) : 0
      }));
    }
  }, [allTargets, totalAmt, mode, customDist]);

  // Handlers
  const toggleContact = (id: number) => {
    setSelectedContacts(prev => {
      const nxt = new Set(prev);
      nxt.has(id) ? nxt.delete(id) : nxt.add(id);
      return nxt;
    });
  };

  const addExtra = () => {
    const num = phoneInput.trim();
    if (!num) return;
    // prevent duplicates
    if (extraContacts.includes(num)) return;
    setExtraContacts(prev => [...prev, num]);
    setPhoneInput("");
  };

  const clearAll = () => {
    setSelectedContacts(new Set());
    setExtraContacts([]);
    setCustomDist({});
  };

  return (
    <div className="p-6 bg-white rounded-2xl max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold mb-4 ${themeAccent}`}>Split Bill</h2>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Total Amount</label>
          <input
            type="number"
            value={totalAmt}
            onChange={e => setTotalAmt(Number(e.target.value))}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700">Select Contacts</label>
            <button
              onClick={clearAll}
              className="text-indigo-500 hover:underline text-sm"
            >
              Clear All
            </button>
          </div>
          <div className={`${themeBg} p-3 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto`}>
            {contacts.map(c => (
              <button
                key={c.id}
                onClick={() => toggleContact(c.id)}
                className={`flex justify-between px-3 py-2 rounded-md border ${
                  selectedContacts.has(c.id)
                    ? "border-[#6e3cbc] bg-[#e8e0f8]"
                    : "border-gray-300"
                }`}
              >
                <span>{c.name}</span>
                {selectedContacts.has(c.id) && (
                  <FaCheckCircle className="text-green-500" />
                )}
              </button>
            ))}
            {extraContacts.map((num, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-3 py-2 rounded-md border border-gray-300"
              >
                <span>{num}</span>
                <FaTimesCircle
                  onClick={() =>
                    setExtraContacts(prev => prev.filter((_, j) => j !== i))
                  }
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Phone number"
              value={phoneInput}
              onChange={e => setPhoneInput(e.target.value)}
              className="border rounded-l-md px-3 py-2 flex-1"
            />
            <button onClick={addExtra} className={`${themeBtn} rounded-r-md px-4`}>
              Add
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              checked={mode === "equal"}
              onChange={() => setMode("equal")}
            />
            <span>Equal Split</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              checked={mode === "custom"}
              onChange={() => setMode("custom")}
            />
            <span>Custom Split</span>
          </label>
        </div>

        {mode === "custom" &&
          allTargets.map(label => (
            <div key={label} className="flex items-center space-x-2">
              <span className="flex-1">{label}</span>
              <input
                type="number"
                value={customDist[label] || 0}
                onChange={e =>
                  setCustomDist(prev => ({
                    ...prev,
                    [label]: Number(e.target.value),
                  }))
                }
                className="w-20 border rounded-md px-2 py-1"
              />
            </div>
          ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Splits</h3>
        <div className="space-y-2">
          {splits.length > 0
            ? splits.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{s.label}</span>
                  <span>₹{s.amount.toFixed(2)}</span>
                </div>
              ))
            : <p className="text-gray-500">No splits to show</p>}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Grand Total:</p>
        <p className="text-lg font-bold">₹{totalAmt.toFixed(2)}</p>
      </div>
    </div>
  );
}