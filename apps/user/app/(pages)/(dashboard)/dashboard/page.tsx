import React from "react";
import {
  FaRedo,
  FaMoneyBillWave,
  FaArrowRight,
  FaArrowLeft,
  FaEllipsisH,
} from "react-icons/fa";
import CardDashBoard from "../../../../components/cardComponentDashboard";
import ActionCard from "../../../../components/cardsdashboard";
import { TbTransferIn } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbTransferOut } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
export default function Dashboard() {
  return (
    <div className="flex-1 max-w-screen min-h-screen">
    <h1 className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
      Financial Dashboard
    </h1>
    <div className="bg-white rounded-md py-10">
      <div className="lg:flex justify-between">
        <CardDashBoard title="Total Balance" numberOfTitle={100} iconType="balance" link="/balance"></CardDashBoard>
        <CardDashBoard title="Income" numberOfTitle={89} iconType="transaction" link="/transactions/deposit"></CardDashBoard>
        <CardDashBoard title="Expenses" numberOfTitle={100} iconType="transfer" link="/balance"></CardDashBoard>
      </div>
      <div className="py-10 max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard icon={<FaMoneyBillTransfer size={20} />} label="Send Money" to={"/p2p"} />
        <ActionCard icon={<TbTransferIn size={20} />} label="Deposit" to={"/transfer/deposit"}/>
        <ActionCard icon={<TbTransferOut size={20} />} label="Withdraw" to={"/transfer/withdraw"} />
        <ActionCard icon={<GrTransaction size={20} />} label="Transactions " to={"/transactions/deposit"} />
      </div>
    </div>
    
</div>
  );
}

