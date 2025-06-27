"use client"
import React, { useState, useMemo, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const themeBg = "bg-gray-200";
const themeAccent = "text-[#6e3cbc]";
const themeBtn = "bg-[#6e3cbc] hover:bg-[#593397] text-white";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Target {
  id: number | string;
  name: string;
  phone: string;
}

interface SplitItem {
  name: string;
  phoneNumber: string;
  amount: number;
  description: string;
  paid: boolean;
}

export default function SplitBillComponent() {
  const [contacts] = useState<Contact[]>([
    { id: 1, name: "Alice", email: "alice@example.com", phone: "123-456-7890" },
    { id: 2, name: "Bob", email: "bob@example.com", phone: "987-654-3210" },
    { id: 3, name: "Charlie", email: "charlie@example.com", phone: "555-555-5555" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [extraContacts, setExtraContacts] = useState<string[]>([]);
  const [phoneInput, setPhoneInput] = useState("");
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [mode, setMode] = useState<"equal" | "custom">("equal");
  const [customDist, setCustomDist] = useState<Record<string, number>>({});
  const [splitItems, setSplitItems] = useState<SplitItem[]>([]);
  const [useGlobalDesc, setUseGlobalDesc] = useState(false);
  const [globalDesc, setGlobalDesc] = useState("");

  const filteredContacts = useMemo(
    () =>
      contacts.filter(
        c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone.includes(searchTerm)
      ),
    [searchTerm, contacts]
  );

  const targets: Target[] = useMemo(() => {
    const real = Array.from(selectedContacts).map(id => {
      const c = contacts.find(x => x.id === id)!;
      return { id: c.id, name: c.name, phone: c.phone };
    });
    const extra = extraContacts.map((num, idx) => ({ id: `e${idx}`, name: num, phone: num }));
    return [...real, ...extra];
  }, [selectedContacts, extraContacts, contacts]);

  const generateSplits = () => {
    const cnt = targets.length;
    if (!cnt || totalAmt <= 0) {
      setSplitItems([]);
      return;
    }
    const eachEqual = +(totalAmt / cnt).toFixed(2);
    const totalW = targets.reduce((sum, t) => sum + (customDist[t.id] || 0), 0);

    const items: SplitItem[] = targets.map(t => ({
      name: t.name,
      phoneNumber: t.phone,
      amount:
        mode === "equal"
          ? eachEqual
          : totalW
          ? +(((customDist[t.id] || 0) / totalW) * totalAmt).toFixed(2)
          : 0,
      description: useGlobalDesc ? globalDesc : "",
      paid: false,
    }));

    setSplitItems(items);
  };

  useEffect(() => {
    generateSplits();
  }, [targets, totalAmt, mode, customDist, useGlobalDesc, globalDesc]);

  const toggleContact = (id: number) =>
    setSelectedContacts(prev => {
      const nxt = new Set(prev);
      nxt.has(id) ? nxt.delete(id) : nxt.add(id);
      return nxt;
    });

  const addExtra = () => {
    const num = phoneInput.trim();
    if (num && !extraContacts.includes(num)) {
      setExtraContacts(prev => [...prev, num]);
      setPhoneInput("");
    }
  };

  const clearAll = () => {
    setSelectedContacts(new Set());
    setExtraContacts([]);
    setCustomDist({});
  };

  const updateItem = (
    idx: number,
    key: keyof Omit<SplitItem, "name" | "amount" | "phoneNumber">,
    value: any
  ) =>
    setSplitItems(prev => {
      const nxt = [...prev];
      (nxt[idx] as any)[key] = value;
      return nxt;
    });

  const confirmSplit = async () => {
    console.log("HERE");
    console.log(splitItems)
    // await fetch("/api/split", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(splitItems),
    // });
    alert("Split confirmed!");
  };

  return (
    <div className="p-6 bg-white rounded-2xl max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold mb-4 ${themeAccent}`}>Split Bill</h2>

      {/* Inputs */}
      <div className="mb-6 space-y-4">
        {/* Total */}
        <div>
          <label className="block text-gray-700 mb-1">Total Amount</label>
          <input
            type="number"
            value={totalAmt}
            onChange={e => setTotalAmt(+e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Contacts */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700">Contacts</label>
            <button onClick={clearAll} className="text-indigo-500 hover:underline text-sm">
              Clear All
            </button>
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mb-2"
          />
          <div className="overflow-y-auto max-h-48 rounded-lg border">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => toggleContact(c.id)}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      selectedContacts.has(c.id) ? "bg-[#e8e0f8]" : ""
                    }`}
                  >
                    <td className="px-4 py-2 flex items-center">
                      <span className="flex-1">{c.name}</span>
                      {selectedContacts.has(c.id) && <FaCheckCircle className="text-green-500" />}
                    </td>
                    <td className="px-4 py-2 text-gray-500">{c.email}</td>
                    <td className="px-4 py-2 text-gray-500">{c.phone}</td>
                  </tr>
                ))}
                {extraContacts.map((num, i) => (
                  <tr key={i} className="bg-gray-50">
                    <td className="px-4 py-2">Extra</td>
                    <td className="px-4 py-2 text-gray-500">—</td>
                    <td className="px-4 py-2 flex items-center">
                      <span className="flex-1">{num}</span>
                      <FaTimesCircle
                        onClick={() => setExtraContacts(prev => prev.filter((_, j) => j !== i))}
                        className="text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Phone number"
              value={phoneInput}
              onChange={e => setPhoneInput(e.target.value)}
              className="border rounded-l-md px-3 py-2 flex-1"
            />
            <button onClick={addExtra} className={`${themeBtn} rounded-r-md px-4`}>Add</button>
          </div>
        </div>

        {/* Mode */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-1">
            <input type="radio" checked={mode === 'equal'} onChange={() => setMode('equal')} />
            <span>Equal Split</span>
          </label>
          <label className="flex items-center space-x-1">
            <input type="radio" checked={mode === 'custom'} onChange={() => setMode('custom')} />
            <span>Custom Split</span>
          </label>
        </div>

        {mode === 'custom' && targets.map(t => (
          <div key={t.id} className="flex items-center space-x-2">
            <span className="flex-1">{t.name} ({t.phone})</span>
            <input
              type="number"
              value={customDist[t.id] || 0}
              onChange={e => setCustomDist(prev => ({ ...prev, [t.id]: +e.target.value }))}
              className="w-24 border rounded-md px-2 py-1"
            />
          </div>
        ))}

        {/* Global Description */}
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={useGlobalDesc}
            onChange={e => setUseGlobalDesc(e.target.checked)}
            className="h-5 w-5"
          />
          <span>Use same description for all</span>
          {useGlobalDesc && (
            <input
              type="text"
              placeholder="Global description"
              value={globalDesc}
              onChange={e => setGlobalDesc(e.target.value)}
              className="border rounded-md px-2 py-1 flex-1"
            />
          )}
        </div>

      </div>

      {/* Splits Table */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Splits</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {splitItems.map((s, i) => (
                <tr key={i} className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.phoneNumber}</td>
                  <td className="px-4 py-2">₹{s.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={s.description}
                      onChange={e => updateItem(i, 'description', e.target.value)}
                      className="w-full border rounded-md px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Grand Total:</p>
        <p className="text-lg font-bold">₹{totalAmt.toFixed(2)}</p>
      </div>
      <button onClick={confirmSplit} className={`${themeBtn} mt-4 w-full py-2 rounded-md`}>Confirm Split</button>
    </div>
  );
}
