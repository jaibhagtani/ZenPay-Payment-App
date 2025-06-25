import React from "react";
import { RiArrowRightUpLine, RiArrowRightDownLine } from "react-icons/ri";

interface P2PTransactionStyleProps {
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
    paymentModeP2P: "paid" | "received"
}


// export default function P2PTransactionStyle({transaction} : {transaction : P2PTransactionStyleProps})
// {
//     return (
//         <div className="w-full min-w-40 my-2 px-1 flex flex-row justify-between rounded-lg border border-slate-200 grid grid-cols-4 gap-2 lg:grid-cols-3 gap-2 h-max lg:h-10">
//             <div className="flex col-span-3 ml-2 lg:col-span-1">
//             <div className="py-1 pr-4">
//                 {transaction.paymentModeP2P === "paid" ? (<svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="28"
//                     height="28"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     >
//                     <circle cx="12" cy="12" r="12" fill="#E44E4E" />
                    
//                     <path
//                     d="M8 16 L16 8 M16 8 L16 12 M16 8 L12 8"
//                     stroke="white"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     />
//                 </svg>) : 
//                 (
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="28"
//                         height="28"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                     >
//                         <circle cx="12" cy="12" r="12" fill="#4CAF50" />
                        
//                         <path
//                         d="M16 8 L8 16 M8 16 L8 12 M8 16 L12 16"
//                         stroke="white"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         />
//                     </svg>
//                 )}
//             </div>
//                 <div>
//                     <div className="text-sm">
//                         {transaction.paymentModeP2P == "paid" ? "Sent INR to" : "Received INR from"} 
//                     </div>

//                     <div className="text-slate-600 text-xs flex justify-center">
//                         {transaction?.time?.toLocaleDateString()} {transaction?.time.toLocaleTimeString()}
//                     </div>
//                 </div>
//             </div>
//             <div className="text-md font-bold text-center col-span-2 lg:col-span-1 text-lg ml-5 pt-1 min-w-40">{transaction?.toUserName}</div>
//             <div className={`flex flex-col text-center justify-center ${transaction.paymentModeP2P == "paid" ? "text-red-500" : "text-green-500"} text-md font-bold  col-span-2 lg:col-span-1 mx-2 text-lg`}>
//                 {transaction.paymentModeP2P == "paid" ? "-" : "+"} Rs {(transaction?.amount) ? transaction.amount / 100 : 0}
//             </div>
//         </div>
//     )
// }

export default function P2PTransactionStyle({ transaction }: { transaction: P2PTransactionStyleProps }) {
  const isPaid = transaction.paymentModeP2P === "paid";
  const sign = isPaid ? "–" : "+";
  const amountColor = isPaid ? "text-red-600" : "text-green-600";
  const actionText = isPaid ? "Sent Money" : "Received Money";
  const actionColor = isPaid ? "text-red-600" : "text-purple-600";
  const formattedAmount = Math.abs(transaction.amount / 100).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 w-full sm:w-2/3">
        {isPaid ? (
          <RiArrowRightUpLine className="h-6 w-6 text-red-500" />
        ) : (
          <RiArrowRightDownLine className="h-6 w-6 text-green-500" />
        )}
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold">{transaction.toUserName}</span>
          <span className={`text-xs ${actionColor}`}>{actionText}</span>
          <span className="text-gray-500 text-xs">
            {transaction.time.toLocaleDateString()} • {transaction.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className={`font-semibold text-lg mt-2 sm:mt-0 sm:text-right ${amountColor} w-full sm:w-1/3`}>
        {sign} ₹{formattedAmount}
      </div>
    </div>
  );
}
