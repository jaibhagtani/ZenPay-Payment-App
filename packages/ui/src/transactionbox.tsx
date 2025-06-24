// components/transaction/TransactionStyle.tsx
'use client';
import React from 'react';
import { MdOutlineArrowDownward, MdOutlineArrowUpward, MdAccessTime } from 'react-icons/md';
import { motion } from 'framer-motion';

export interface TransactionStyleProps {
  id: number;
  amount: number;   // in paise
  time: Date;
  status: string;
  provider: string;
}

export function TransactionStyle({
  transaction,
  typeofPayment,
}: {
  transaction: TransactionStyleProps;
  typeofPayment?: string;
}) {
  const isDeposit = typeofPayment === 'deposit';
  const isPending = transaction.status === 'Processing';
  const isSuccess = transaction.status === 'Success';
  const Icon = isPending
    ? MdAccessTime
    : isDeposit
    ? MdOutlineArrowDownward
    : MdOutlineArrowUpward;

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="flex items-center justify-between p-4 bg-[#1e293b] rounded-2xl shadow-lg"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="p-3 bg-[#334155] rounded-full">
          <Icon size={24} className="text-[#facc15]" />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 px-4">
        <div className="text-white font-semibold">
          {isDeposit ? 'Received INR from' : 'Withdrew INR on'}{' '}
          <span className="font-bold">{transaction.provider}</span>
        </div>
        <div className="text-gray-400 text-sm mt-1">
          {transaction.time.toLocaleDateString()} •{' '}
          {transaction.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Amount & Status */}
      <div className="flex flex-col items-end space-y-1">
        <div className={`font-bold text-lg ${isDeposit ? 'text-green-400' : 'text-red-400'}`}> 
          {isPending ? '--' : `${isDeposit ? '+' : '-'}₹${(transaction.amount / 100).toFixed(2)}`}
        </div>
        <div className={`inline-block px-4 py-1 text-xs rounded-full ${
          isPending
            ? 'bg-[#fde68a] text-[#92400e]'
            : isSuccess
            ? 'bg-[#86efac] text-[#064e3b]'
            : 'bg-[#fecaca] text-[#7f1d1d]'
        }`}>{transaction.status}</div>
      </div>
    </motion.div>
  );
}
