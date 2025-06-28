// app/(dashboard)/split/page.tsx

import SplitBillPageComponent from "../../../../components/cards/Pages Cards/splitBillPageComponent";
import { getSplitDetails } from "../../../lib/actions/getSplitDetails";

export default async function SplitBillPage() {
  const res = await getSplitDetails();

  if (!res || "msg" in res) {
    return <div className="p-4 text-red-600">Error: {res?.msg ?? "Unknown error"}</div>;
  }

  return (
    <SplitBillPageComponent
      paymentsPending={`₹${res.paymentsPending.toFixed(2)}`}
      pendingCredits={`₹${res.pendingCredits.toFixed(2)}`}
      totalSplits={res.totalSplits.toString()}
      activeSplits={res.activeSplits.toString()}
      allSplits={res.allSplits}
    />
  );
}
