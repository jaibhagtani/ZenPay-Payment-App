"use client"
import React, { useEffect, useState } from "react";
import { FaSearch, FaUserFriends } from "react-icons/fa";
import SendCard from "./Pages Cards/SendMoneyCard";

export interface RawContact {
  contactId: number;
  contactName: string;
  contactEmail: string;
  contactNumber?: string;
}

// Internal Contact shape
export interface Contact {
  id: number;
  name: string;
  email: string;
  number: string;
}

interface SearchContactsProps {
  initialContacts: RawContact[];
  num?: number;
  onSelect?: (number: string) => void;
}

export function SearchContacts({ initialContacts = [], num, onSelect }: SearchContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    setContacts(
      initialContacts.map(rc => ({
        id: rc.contactId,
        name: rc.contactName,
        email: rc.contactEmail,
        number: rc.contactNumber || ""
      }))
    );
  }, [initialContacts]);

  const term = search.toLowerCase();
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(term) ||
    c.email.toLowerCase().includes(term)
  );

  const displayed = typeof num === "number" ? filtered.slice(0, num) : filtered;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-4 border-b pb-4">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search contacts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {displayed.map(c => (
          <div
            key={c.id}
            className="flex justify-between items-center p-2 bg-[#faf5fc] rounded-lg hover:bg-[#f0e8f8] transition-colors cursor-pointer"
            onClick={() => onSelect?.(c.number)}
          >
            <div className="flex items-center">
              <div className="bg-[#dcd1e8] rounded-full p-2 mr-4">
                <FaUserFriends className="text-[#6e3cbc]" />
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="font-medium text-gray-800 truncate">{c.name}</p>
                  {/* <p className="font-medium text-gray-800 truncate">{c.accountNumber}</p> */}
                  {/* <p className="disable hidden lg:visible font-medium text-gray-800 truncate">{"9842399UDHS82"}</p> */}
                </div>
                <div className="flex items-center text-base text-gray-500 space-x-4">
                  <span>{c.number}</span>
                  <span className="text-gray-400 text-xl">•</span>
                  <span>{c.email}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {displayed.length === 0 && (
          <p className="text-gray-500 text-center py-8">No contacts found.</p>
        )}
      </div>
    </div>
  );
}

interface SendAndSearchProps {
  AllMyContacts: RawContact[];
  numberOfContacts: number;
}

export function SendAndSearchContacts({ AllMyContacts, numberOfContacts }: SendAndSearchProps) {
  const [selectedNumber, setSelectedNumber] = useState("");

  return (
    <div className="space-y-6">
      <SearchContacts
        initialContacts={AllMyContacts}
        num={numberOfContacts}
        onSelect={num => setSelectedNumber(num)}
      />
      <SendCard selectedNumber={selectedNumber} />
    </div>
  );
}
