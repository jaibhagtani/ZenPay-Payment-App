"use client"
import React, { useState, useEffect } from 'react';
import { FaRegCreditCard } from 'react-icons/fa6';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import {HiOutlineRefresh} from "react-icons/hi"
import { getBalance } from '../../../app/lib/actions/getBalance';
import { ButtonDashboardtoRedirect } from '../../buttons/buttonsUsed';
import { useRouter } from 'next/navigation';
import { P2P, Transfer } from '@repo/ui/icons';
import { IoIosTrendingDown } from "react-icons/io";
interface MainCardDashboardProps {
  currency?: string;
}

export function MainCardDashboard({ currency = '₹' }: MainCardDashboardProps) {
  const [balance, setBalance] = useState<string>("0.00");
  const [toShow, setToShow] = useState<boolean>(true);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  // Refresh function
  const refreshBalance = async () => {
    try {
      const data = await getBalance();
      const amt = (Number(data?.balance?.amount) / 100).toFixed(2) || "0.00";
      setBalance(amt);
      setUpdatedAt(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <div className="col-span-2 bg-purple-500/95 text-white rounded-3xl p-8 shadow-3xl h-max lg:py-10 my-auto">
      <div className="flex items-center justify-end">
        <button
          onClick={refreshBalance}
          title="Refresh balance"
          className="p-2 bg-purple-600/60 rounded-full hover:bg-purple-600 transition mx-3"
        >
          <HiOutlineRefresh className="text-white" size={24} />
        </button>
        <button
          onClick={() => setToShow(v => !v)}
          title={toShow ? 'Hide balance' : 'Show balance'}
          className="p-2 bg-purple-600/60 rounded-full hover:bg-purple-600 transition mx-3"
        >
          {toShow ? (
            <HiOutlineEyeSlash className="text-white" size={24} />
          ) : (
            <HiOutlineEye className="text-white" size={24} />
          )}
        </button>
      </div>

      <div className="flex items-center text-white mb-3">
        <FaRegCreditCard size={24} />
        <span className="uppercase text-md font-medium ml-2">Your Balance</span>
      </div>

      <h2 className="text-white text-5xl font-extrabold leading-tight mx-10 break-words word-wrap">
        {currency} {toShow ? (`${balance == "NaN" ? "0.00" : balance}`) : '••••••'}
      </h2>
      <p className="text-purple-200 mt-1 text-sm">Available balance</p>
      <p className="text-purple-200 text-xs mt-1">Last updated: {updatedAt}</p>

      <div className="mt-6 flex space-x-4">
        <ButtonDashboardtoRedirect
          to="/transfer/deposit"
        >
          <div className='flex items-center justify-center'>
            <div className='px-2'>
              <IoIosTrendingDown strokeWidth={18} size={25} />
            </div>
            Add Money
          </div>
        </ButtonDashboardtoRedirect>
        <ButtonDashboardtoRedirect
          to="/p2p"
        >
          <div className='flex items-center justify-center'>
            <div className='px-2'>
              <P2P></P2P>
            </div>
            Send Money
          </div>
        </ButtonDashboardtoRedirect>
      </div>
    </div>
  );
}

export function ActionCard({ icon, label, to } : any) {
  const router = useRouter();
  return (
    <button onClick={() => {
      router.push(to)
    }} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      {/* Icon Circle */}
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      {/* Label */}
      <p className="text-sm font-semibold text-gray-700">{label}</p>
    </button>
  );
}