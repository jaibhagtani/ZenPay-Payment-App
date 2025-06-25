"use client"
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaPlus, FaSearch, FaUserFriends } from "react-icons/fa";

// Sample contact data
const initialContacts = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", frequent: true },
  { id: 2, name: "Alex Kim", email: "alex@example.com", frequent: true },
  { id: 3, name: "Maria Garcia", email: "maria@example.com", frequent: false },
  { id: 4, name: "John Smith", email: "john@example.com", frequent: false },
];

export default function P2PTransfer() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!newName || !newEmail) return;
    const nextId = Math.max(...contacts.map(c => c.id)) + 1;
    setContacts([...contacts, { id: nextId, name: newName, email: newEmail, frequent: false }]);
    setNewName("");
    setNewEmail("");
    setIsAddOpen(false);
  }

  return (
    <div className="mt-20 in-h-screen bg-[#f9f4fa] p-6">
      

      {/* Add Contact Modal */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <Dialog.Panel className="bg-white rounded-xl p-6 z-10 w-full max-w-md">
          <Dialog.Title className="text-xl font-semibold mb-4 text-[#6e3cbc]">
            Add New Contact
          </Dialog.Title>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full border rounded-md px-4 py-2 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              className="w-full border rounded-md px-4 py-2 outline-none"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 rounded-md">
              Cancel
            </button>
            <button onClick={handleAdd} className="px-4 py-2 bg-[#6e3cbc] text-white rounded-md hover:bg-[#593397]">
              Save
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
