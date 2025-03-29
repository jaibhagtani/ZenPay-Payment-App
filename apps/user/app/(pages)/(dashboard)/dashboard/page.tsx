// export const dynamic = "force-dynamic";
import React from "react";
import CardDashBoard from "../../../../components/cardComponentDashboard";
import ActionCard from "../../../../components/cardsdashboard";
import { TbTransferIn } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbTransferOut } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { getBalance } from "../../../lib/actions/getBalance";
import { getP2PTxns } from "../../../lib/actions/getP2P-txns";
// import LineChartPC from "../../../../components/chartForPC";
// import ChartfullComponent from "../../../../components/ChartComponent";




export default async function Dashboard() {

  // const balanceData = await getBalance();
  // const p2pData = await getP2PTxns();

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
          Financial Dashboard
        </h1>

        <div className="flex items-center justify-center">

        <div className="bg-white rounded-md py-10 px-4">
          <div className="lg:flex justify-between">
            <CardDashBoard
              title="Total Balance"
              numberOfTitle={0}
              iconType="balance"
              link="/balance"
              />
            <CardDashBoard
              title="Received"
              numberOfTitle={0}
              iconType="transaction"
              link="/balance"
              />
            <CardDashBoard
              title="Expenses"
              numberOfTitle={0}
              iconType="transfer"
              link="/balance"
              />
          </div>
          <div className="py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <ActionCard
              icon={<FaMoneyBillTransfer size={20} />}
              label="Send Money"
              to={"/p2p"}
              />
            <ActionCard
              icon={<TbTransferIn size={20} />}
              label="Deposit"
              to={"/transfer/deposit"}
              />
            <ActionCard
              icon={<TbTransferOut size={20} />}
              label="Withdraw"
              to={"/transfer/withdraw"}
              />
            <ActionCard
              icon={<GrTransaction size={20} />}
              label="Transactions"
              to={"/transactions/deposit"}
              />
          </div>
          </div>
          {/* Uncomment the section below if you want to display the full chart component */}
          {/*
          <div className="lg:grid grid-cols-1 gap-2 max-w-screen">
            <div>
              <ChartfullComponent />
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
