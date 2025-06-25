
"use client"
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaPlus, FaSearch, FaUserFriends } from "react-icons/fa";

// Sample contact data
const initialContacts = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com"},
  { id: 2, name: "Alex Kim", email: "alex@example.com"},
  { id: 3, name: "Maria Garcia", email: "maria@example.com"},
  { id: 4, name: "John Smith", email: "john@example.com"},
  { id: 5, name: "John Smith", email: "john@example.com"},
  { id: 6, name: "John Smith", email: "john@example.com"},
  { id: 7, name: "John Smith", email: "john@example.com"},
  { id: 8, name: "John Smith", email: "john@example.com"},
  { id: 9, name: "John Smith", email: "john@example.com"},
  { id: 10, name: "John Smith", email: "john@example.com"},
];
export function SearchContacts()
{
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
   const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      

      {/* <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center bg-[#2f276c] text-white px-4 py-2 rounded-lg hover:bg-[#403486]"
          >
          <FaPlus className="mr-2" /> Add Contact
        </button>
      </div> */}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4 border-b pb-4">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
            />
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filtered.map(contact => (
            <div
            key={contact.id}
            className="flex justify-between items-center p-4 bg-[#faf5fc] rounded-lg hover:bg-[#f0e8f8]"
            >
              <div className="flex items-center">
                <div className="bg-[#dcd1e8] rounded-full p-2 mr-4">
                  <FaUserFriends className="text-[#6e3cbc]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                </div>
              </div>
              {/* {contact.frequent && (
                <span className="bg-[#6e3cbc] text-white px-3 py-1 rounded-full text-xs">
                  Frequent
                </span>
              )} */}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-500 text-center py-8">No contacts found.</p>
          )}
        </div>
      </div>
    </div>
  )
}