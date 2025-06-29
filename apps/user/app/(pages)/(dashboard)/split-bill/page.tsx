import { SplitBillTabs } from "../../../../components/cards/split/splitBillTab";
import { SplitBillCards } from "../../../../components/cards/split/splitCard";
import { getSplitDetails } from "../../../lib/actions/getSplitDetails";


export type Tab = "All" | "Pending" | "Completed";

export interface SplitItem {
  userId: number;
  name: string;
  status: "PENDING" | "REJECTED" | "FAILURE" | "SUCCESS" | "PROCESSING";
  email: string;
  phoneNumber: string;
  amount: number;
  description: string;
  paid: boolean;
}

export interface SplitBillPageData {
  paymentsPending: string;
  pendingCredits: string;
  totalSplits: string;
  activeSplits: string;
  allSplits: SplitItem[][];
}

export default async function SplitBillPage() {
  const {
    paymentsPending,
    pendingCredits,
    totalSplits,
    activeSplits,
    allSplits
  } = await getSplitDetails();

  return (
    <div className="flex-auto mt-20 mx-10">
      <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent font-bold mb-6">
        Bills Split
      </h1>
      <h4 className="text-xl sm:text-2xl bg-purple-700 bg-clip-text text-transparent font-bold mb-6">
        Manage shared expenses
      </h4>

      <div className="mb-4 px-8 py-6 bg-white min-h-screen lg:mx-auto rounded-3xl">
        <SplitBillCards
          paymentsPending={paymentsPending || 0}
          pendingCredits={pendingCredits || 0}
          totalSplits={totalSplits || 0}
          activeSplits={activeSplits || 0}
        />
        <SplitBillTabs allSplits={allSplits} />
      </div>
    </div>
  );
}
