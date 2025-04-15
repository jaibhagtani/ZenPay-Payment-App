// export const dynamic = "force-dynamic";
import React from "react";
import CardDashBoard from "../../../../components/cardComponentDashboard";
import ActionCard from "../../../../components/cardsdashboard";
import { TbTransferIn, TbTransferOut } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { getBalance } from "../../../lib/actions/getBalance";
import { getP2PTxns } from "../../../lib/actions/getP2P-txns";
// import LineChartPC from "../../../../components/chartForPC";
// import ChartfullComponent from "../../../../components/ChartComponent";

export default async function Dashboard() {
  const balanceData = await getBalance();
  const p2pData = await getP2PTxns();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="mt-12 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-10 text-center sm:text-left">
        Financial Dashboard
      </h1>

      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-gray-50 shadow-lg rounded-md py-8 px-4 sm:px-6 lg:px-8">
          {/* Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <CardDashBoard
              title="Total Balance"
              numberOfTitle={Number(balanceData?.balance?.amount) / 100 || 0}
              iconType="balance"
              link="/balance"
            />
            <CardDashBoard
              title="Received"
              numberOfTitle={Number(p2pData.totalReceived) || 0}
              iconType="transaction"
              link="/balance"
            />
            <CardDashBoard
              title="Expenses"
              numberOfTitle={Number(p2pData.totalPaid) || 0}
              iconType="transfer"
              link="/balance"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
              icon={<FaMoneyBillTransfer size={20} />}
              label="Send Money"
              to="/p2p"
              className="transition-colors duration-200 hover:bg-purple-100"
            />
            <ActionCard
              icon={<TbTransferIn size={20} />}
              label="Deposit"
              to="/transfer/deposit"
              className="transition-colors duration-200 hover:bg-purple-100"
            />
            <ActionCard
              icon={<TbTransferOut size={20} />}
              label="Withdraw"
              to="/transfer/withdraw"
              className="transition-colors duration-200 hover:bg-purple-100"
            />
            <ActionCard
              icon={<GrTransaction size={20} />}
              label="Transactions"
              to="/transactions/deposit"
              className="transition-colors duration-200 hover:bg-purple-100"
            />
          </div>
        </div>

        {/* Chart Section (commented for now) */}
        {/*
        <div className="mt-10 w-full transition-opacity duration-300">
          <ChartfullComponent />
        </div>
        */}
      </div>
    </div>
  );
}
