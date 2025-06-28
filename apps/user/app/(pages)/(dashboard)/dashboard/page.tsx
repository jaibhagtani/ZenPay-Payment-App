import React from "react";
import { FaQrcode, FaUserFriends, FaGift, FaChartLine } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { getP2PTxns } from "../../../lib/actions/getP2P-txns";
import { ActionCard, MainCardDashboard } from "../../../../components/cards/Dashboard Cards/clientSideDashboard";
import { getDepositeTxns } from "../../../lib/actions/getDeposite-txns";
import { FaArrowsDownToLine } from "react-icons/fa6";
import { FaArrowsUpToLine } from "react-icons/fa6";
import { ButtonDashboardActionCard } from "../../../../components/buttons/buttonsDashboardActionCards";
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
  const NumP2PTransfers = p2pData.tx?.length || 0
  const monthlySpending = Number(p2pData.totalPaid)/100 || '0.00';
  // const friends = p2pData.friends || 0;
  // const currency = p2pData.currency || "₹";

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      {/* Header */}
      <h1 className="mt-14 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-6">
        Dashboard
      </h1>

      {/* Top Section: Balance + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Balance Card */}
        
        <MainCardDashboard></MainCardDashboard>
        {/* Quick Actions Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100">
          <h3 className="text-xl font-semibold mb-5 text-indigo-700">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-5">
            <ActionCard
              icon={<GrTransaction size={26} className="text-indigo-600" />}
              label="Send Money"
              to="/p2p"
            />
            <ActionCard
              icon={<FaQrcode size={26} className="text-indigo-600" />}
              label="QR Pay"
              to="/qr-pay"
            />
            <ActionCard
              icon={<FaUserFriends size={26} className="text-indigo-600" />}
              label="Request"
              to="/p2p/request"
            />
            <ActionCard
              icon={<FaGift size={26} className="text-indigo-600" />}
              label="Split Bill"
              to="/split-bill"
            />
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <ButtonDashboardActionCard c={<FaChartLine className="text-indigo-600" />} to="/transactions/p2p" Num={`₹ ${monthlySpending}`}>Total Spent</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaUserFriends className="text-indigo-600" />} to="/transactions/p2p" Num={0}>Friends Paid</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaArrowsDownToLine className="text-indigo-600" />} to="/transactions/deposit" Num={NumDepositBankTransfers || 0}>Deposits Bank Transfers</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaArrowsUpToLine className="text-indigo-600" />} to="/transactions/withdraw" Num={NumWithdrawBankTransfers || 0}>Withdrew Bank Transfers</ButtonDashboardActionCard>
        <ButtonDashboardActionCard c={<FaArrowsUpToLine className="text-indigo-600" />} to="/transactions/p2p" Num={NumP2PTransfers}>P2P Transfers</ButtonDashboardActionCard>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-indigo-700">Recent Transactions</h3>
          <a href="/transactions/deposit" className="text-indigo-600 hover:underline">
            View All
          </a>
        </div>
        <ul className="space-y-4">
          {(p2pData.tx || []).slice(0, 5).map((txn, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-indigo-50">
                  <GrTransaction className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{txn.toUserName || ""}</p>
                  <div className="text-sm text-gray-500">{new Date(txn.time).toLocaleString() || 0 }</div>
                </div>
              </div>
              <p
                className={`font-semibold ₹ {txn.amount > 0 ? "text-green-500" : "text-red-500"}`}
              >
                {txn.amount > 0 ? "+" : "-"} ₹ {Math.abs((txn.amount)/100).toFixed(2)}
              </p>
            </li>
          ))}
          {(!p2pData.tx || p2pData.tx.length === 0) && (
            <li className="text-center text-gray-400">No recent transactions</li>
          )}
        </ul>
      </div>
    </div>
  );
}