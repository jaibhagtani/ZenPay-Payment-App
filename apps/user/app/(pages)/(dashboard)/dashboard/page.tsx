import React from "react";
import { FaUserFriends, FaGift, FaChartLine } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { getP2PTxns } from "../../../lib/actions/getP2P-txns";
import { ActionCard, MainCardDashboard } from "../../../../components/cards/Dashboard Cards/clientSideDashboard";
import { getDepositeTxns } from "../../../lib/actions/getDeposite-txns";
import { FaArrowsDownToLine, FaArrowsUpToLine } from "react-icons/fa6";
import { ButtonDashboardActionCard } from "../../../../components/buttons/buttonsDashboardActionCards";
import { getSplitDetails } from "../../../lib/actions/getSplitDetails";
import { RiP2pFill, RiBillFill } from "react-icons/ri";
// async function getP2PTransactions() {
//   const session = await getServerSession(NEXT_AUTH);
//   const userId = session?.user?.id;
//   if (!userId) return [];
//   const txns = await prisma.p2pTransfer.findMany({
//     where: { fromUserId: Number(userId) },
//     orderBy: { timestamp: 'desc' },
//   });
//   return txns.map(t => ({
//     id: t.id,
//     date: t.timestamp.toISOString(),
//     amount: t.amount,
//     description: t.paymentModeP2P,
//     toUserName: t.toUserName,
//   }));
// }

export default async function Dashboard() {
  const p2pData = await getP2PTxns();
  const NumDepositBankTransfers = (await getDepositeTxns()).len;
  const NumWithdrawBankTransfers = (await getDepositeTxns()).len;
  const NumP2PTransfers = p2pData?.tx?.length || 0
  const monthlySpending = Number(p2pData?.totalPaid)/100 || '0.00';
  const splitDetails = await getSplitDetails();
  const CountSplits = splitDetails.totalSplits
  // const friends = p2pData.friends || 0;
  // const currency = p2pData.currency || "₹";

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="mt-14 text-3xl ml-20 sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        <MainCardDashboard></MainCardDashboard>
        <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100">
          <h3 className="text-xl font-semibold mb-5 text-indigo-700">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-5">
            <ActionCard
              icon={<GrTransaction size={26} className="text-indigo-600" />}
              label="Send Money"
              to="/p2p"
            />
            <ActionCard
              icon={<FaArrowsUpToLine size={26} className="text-indigo-600" />}
              label="Withdraw Money"
              to="/transfer/withdraw"
            />
            <ActionCard
              icon={<FaUserFriends size={26} className="text-indigo-600" />}
              label="Account"
              to="/profile"
            />
            <ActionCard
              icon={<FaGift size={26} className="text-indigo-600" />}
              label="Split Bill"
              to="/split-bill"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <ButtonDashboardActionCard c={<FaChartLine className="text-indigo-600" />} to="/transactions/p2p" Num={`₹ ${monthlySpending}`}>Total Spent</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaUserFriends className="text-indigo-600" />} to="/transactions/p2p" Num={0}>Friends Paid</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaArrowsDownToLine className="text-indigo-600" />} to="/transactions/deposit" Num={NumDepositBankTransfers || 0}>Deposits Bank Transfers</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaArrowsUpToLine className="text-indigo-600" />} to="/transactions/withdraw" Num={NumWithdrawBankTransfers || 0}>Withdrew Bank Transfers</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<RiP2pFill className="text-indigo-600" size={18} />} to="/transactions/p2p" Num={NumP2PTransfers}>P2P Transfers</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<RiBillFill className="text-indigo-600" size={18}/>} to="/split-bill" Num={Number(CountSplits) || 0}>Bills Split</ButtonDashboardActionCard>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-indigo-700">Recent Transactions</h3>
          <a href="/transactions/deposit" className="text-indigo-600 hover:underline">
            View All
          </a>
        </div>
        <ul className="space-y-4">
          {(p2pData?.tx || []).slice(0, 5).map((txn, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    txn.type === "P2P"
                      ? "bg-green-50"
                      : txn.type === "SPLIT"
                      ? "bg-purple-50"
                      : "bg-indigo-50"
                  }`}
                >
                  {txn.type === "P2P" ? (
                    <RiP2pFill
                      className={`${
                        txn.paymentModeP2P === "paid" ? "text-red-500" : "text-green-600"
                      }`}
                    />
                  ) : txn.type === "SPLIT" ? (
                    <RiBillFill className="text-purple-600" />
                  ) : (
                    <GrTransaction className="text-indigo-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {txn.toUserName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {txn.type === "P2P"
                      ? txn.paymentModeP2P === "paid"
                        ? "Sent via P2P"
                        : "Received via P2P"
                      : txn.type === "SPLIT"
                      ? "Bill Split"
                      : "Transaction"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(txn.time).toLocaleDateString()}{" "}
                    {new Date(txn.time).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div
                className={`font-semibold ${
                  txn.paymentModeP2P === "paid" || txn.amount < 0
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {txn.paymentModeP2P === "paid" || txn.amount < 0 ? "-" : "+"} ₹{" "}
                {Math.abs(txn.amount / 100).toFixed(2)}
              </div>
            </li>
          ))}
        {(!p2pData?.tx || p2pData?.tx.length === 0) && (
          <li className="text-center text-gray-400">
            No recent transactions
          </li>
        )}
      </ul>

      </div>
    </div>
  );
}