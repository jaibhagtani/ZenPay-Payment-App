"use client"
import Select from "@repo/ui/select";
import { useState } from "react";
import TxnsPageAccountSection from "./txnsPageAccountSection";

interface DepositAndWithDrawCardInput {
    depositTransactions ?: {
        id: number,
        amount: number; 
        time: Date;
        status : string;
        provider : string;
    },
    withdrawTransactions ?: {
        id: number,
        amount: number; 
        time: Date;
        status : string;
        provider : string;
    }
}

const options = [{
    name: "Deposit Txns",
    key : "deposit"
},
{
    name: "Withdraw Txns",
    key : "withdraw"
}]


export default function DepositAndWithDrawCard({depositTransactions, withdrawTransactions} : any)
{
    const [depositOrWithdraw, setdepositOrWithdraw ] = useState("deposit");
    return (
        <div>
            <div className="bg-white rounded-xl p-6 h-max shadow-lg my-4 lg:min-w-full max-w-fit">
                <div className="h-max">
                    <div>
                        <Select options={options.map(option => ({
                            value: option.name,
                            key: option.key
                        }))} onSelect={(e) => {
                            setdepositOrWithdraw(options.find(x => x.key === e)?.key || "");
                        }}></Select>
                    </div>
                    

                    {depositOrWithdraw === "deposit" ? (<div className="max-w-72 lg:min-w-96 max-w-screen">
                        <div className="text-2xl flex flex-row justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4">
                            Recent Deposit Transactions
                        </div>
                        {depositTransactions && depositTransactions.length > 0 ? <div className="flex justify-center text-xl text-black-600 pt-1 mb-1 font-bold px-4 min-w-full">
                            {depositTransactions?.length} Transaction(s)
                        </div> : 
                        <div className="font-semibold m-10 text-xl flex justify-self-center font-bold">No Recent Deposit Transactions</div>}
                        <div className="grid grid-cols-10 p-2 gap-4">
                            <div className="col-start-1 col-span-7 lg:col-span-10">
                                {depositTransactions && depositTransactions.length > 0 ? <div className="bg-white w-full rounded-3xl py-3 px-2 lg:w-full">
                                    <TxnsPageAccountSection transactions = {depositTransactions} typeofPayment="deposit"></TxnsPageAccountSection>
                                </div> : <div></div>}
                            </div>
                        </div>
                    </div>) : (
                        <div className="max-w-72 lg:min-w-96 max-w-screen">
                        <div className="text-2xl flex flex-row justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4">
                            Recent Withdraw Transactions
                        </div>
                        {withdrawTransactions && withdrawTransactions.length > 0 ? <div className="flex justify-center text-xl text-black-600 pt-1 mb-1 font-bold px-4 min-w-full">
                            {withdrawTransactions?.length} Transaction(s)
                        </div> : 
                        <div className="font-semibold m-10 text-xl flex justify-self-center font-bold">No Recent Withdraw Transactions</div>}
                        <div className="grid grid-cols-10 p-2 gap-4">
                            <div className="col-start-1 col-span-7 lg:col-span-10">
                                {withdrawTransactions && withdrawTransactions.length > 0 ? <div className="bg-white w-full rounded-3xl py-3 px-2 lg:w-full">
                                    <TxnsPageAccountSection transactions = {withdrawTransactions} typeofPayment="withdraw"></TxnsPageAccountSection>
                                </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}