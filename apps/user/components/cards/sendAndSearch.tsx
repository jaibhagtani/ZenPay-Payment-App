"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import LabelledInput from "@repo/ui/labelledinput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { transferP2P } from "../../app/lib/actions/p2ptransfer";
import { InputOTPGroup } from "../inputotpgroup";

export interface RawContact {
  contactId: number;
  contactName: string;
  contactEmail: string;
  contactNumber?: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  number: string;
}

interface SendAndSearchProps {
  AllMyContacts: RawContact[];
  numberOfContacts: number;
}

export function SendAndSearchContacts({ AllMyContacts, numberOfContacts }: SendAndSearchProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [value, setValue] = useState(0);
  const [showMpinBar, setShowMpinBar] = useState(false);
  const [Mpin, setMpin] = useState("");
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setContacts(
      AllMyContacts.map(rc => ({
        id: rc.contactId,
        name: rc.contactName,
        email: rc.contactEmail,
        number: rc.contactNumber || ""
      }))
    );
  }, [AllMyContacts]);

  const term = search.toLowerCase();
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(term) ||
    c.email.toLowerCase().includes(term)
  );
  const displayed = typeof numberOfContacts === "number" ? filtered.slice(0, numberOfContacts) : filtered;

  async function validateMpin() {
    if (!session.data?.user) return { msg: "User Not Loggedin!!" };
    const res = await fetch("/api/mpin/validate", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ Mpin, email: session.data.user.email })
    });
    return res.json();
  }

  async function handleTransfer() {
    setIsLoading(true);
    if (!selectedNumber || isNaN(value) || value <= 0) {
      alert("Please enter valid number and amount.");
      setIsLoading(false);
      return;
    }
    const validateRes = await validateMpin();
    if (validateRes.msg === "Valid User") {
      const res = await transferP2P(selectedNumber, value * 100);
      if (res.msg === "Transaction Success") {
        alert("Transaction Success");
        router.push("/transactions/p2p");
      } else alert(res.msg);
    } else alert("Invalid MPIN");
    setIsLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-6 sm:space-y-8 w-full max-w-3xl mx-auto">
      <Card title="Send Money">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">Search Contact</h2>
            <div className="flex items-center border rounded-lg px-3 py-2 text-sm">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search contacts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full outline-none text-gray-700 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="overflow-x-auto border rounded-lg max-h-52 overflow-y-auto">
            <table className="w-full text-xs sm:text-sm text-left text-gray-500">
              <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-2 py-2 sm:px-4 sm:py-3">Name</th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3">Phone</th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map(c => (
                  <tr
                    key={c.id}
                    className={`cursor-pointer hover:bg-gray-100 ${selectedNumber === c.number ? "bg-blue-50" : "bg-white"}`}
                    onClick={() => setSelectedNumber(c.number)}
                  >
                    <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap">{c.name}</td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">{c.number}</td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">{c.email}</td>
                  </tr>
                ))}
                {displayed.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">No contacts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <LabelledInput
            label="Selected Number"
            placeholder="1231231231"
            value={selectedNumber}
            onChangeFunc={val => {
              if (/^\d{0,10}$/.test(val)) setSelectedNumber(val);
            }}
            type="tel"
          />

          <LabelledInput label="Amount" placeholder="Amount" onChangeFunc={val => setValue(Number(val))} />

          {!showMpinBar ? (
            <div className="flex justify-center">
              <Button onClickFunc={() => {
                if (selectedNumber && value > 0) setShowMpinBar(true);
                else alert("Invalid Details and Amount");
              }}>Next</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm font-semibold text-gray-700 text-center">Enter MPIN</div>
              <div className="flex justify-center">
                <InputOTPGroup type="password" onChangeFunc={pin => setMpin(pin)} />
              </div>
              <div className="flex justify-center">
                <Button state={isLoading} onClickFunc={handleTransfer}>
                  {isLoading ? "Transferring..." : "Transfer"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}