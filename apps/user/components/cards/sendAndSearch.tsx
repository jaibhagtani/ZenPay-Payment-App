"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputOTPGroup } from "../inputotpgroup";
import LabelledInput from "@repo/ui/labelledinput";
import SearchInput from "../p2p/send/searchInput";
import { transferP2P } from "../../app/lib/actions/p2ptransfer";
import ContactTable from "../p2p/send/contactTable";
import MPinInput from "../p2p/send/mPinInputs";

export interface RawContact {
  contactId: number;
  contactName: string;
  contactEmail: string;
  contactNumber?: string;
}

export interface SendAndSearchProps {
  AllMyContacts: RawContact[];
  numberOfContacts: number;
}

export function SendAndSearchContacts({ AllMyContacts, numberOfContacts }: SendAndSearchProps) {
  const [contacts, setContacts] = useState<RawContact[]>([]);
  const [search, setSearch] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [value, setValue] = useState(0);
  const [Mpin, setMpin] = useState("");
  const [showMpinBar, setShowMpinBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setContacts(AllMyContacts);
  }, [AllMyContacts]);

  const filtered = contacts.filter(c =>
    c.contactName.toLowerCase().includes(search.toLowerCase()) ||
    c.contactEmail.toLowerCase().includes(search.toLowerCase())
  );
  const displayed = typeof numberOfContacts === "number" ? filtered.slice(0, numberOfContacts) : filtered;

  async function validateMpin() {
    const res = await fetch("/api/mpin/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Mpin, email: session.data?.user?.email }),
    });
    return res.json();
  }

  async function handleTransfer() {
    setIsLoading(true);
    if (!selectedNumber || isNaN(value) || value <= 0) {
      alert("Invalid details.");
      setIsLoading(false);
      return;
    }
    const valid = await validateMpin();
    if (valid.msg === "Valid User") {
      const res = await transferP2P(selectedNumber, value * 100);
      if (res.msg === "Transaction Success") {
        alert("Transaction Success");
        router.push("/transactions/p2p");
      } else alert(res.msg);
    } else alert("Invalid MPIN");
    setIsLoading(false);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full max-w-3xl mx-auto">
      <Card title="Send Money">
        <SearchInput value={search} onChange={setSearch} />
        <ContactTable contacts={displayed} selected={selectedNumber} onSelect={setSelectedNumber} />
        <LabelledInput label="Selected Number" value={selectedNumber} onChangeFunc={setSelectedNumber} />
        <LabelledInput label="Amount" value={value.toString()} onChangeFunc={val => setValue(Number(val))} />

        {!showMpinBar ? (
          <div className="flex justify-center pt-10 mt-3">
            <Button onClickFunc={() => {
              if (selectedNumber && value > 0) setShowMpinBar(true);
              else alert("Invalid Details");
            }}>
              Next
            </Button>
          </div>
        ) : (
          <MPinInput isLoading={isLoading} onSubmit={handleTransfer} onChange={setMpin} />
        )}
      </Card>
    </div>
  );
}
