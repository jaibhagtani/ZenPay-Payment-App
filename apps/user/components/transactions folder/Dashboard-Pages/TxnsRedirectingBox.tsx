import { Card } from "@repo/ui/card";
import TxButton from "@repo/ui/txbutton"
import { RiArrowRightUpLine, RiArrowRightDownLine } from "react-icons/ri";

interface TransactionCardProps {
    amount: number; 
    time: Date;
    status : string;
    provider : string;
}
interface P2PTransactionsProps {
    id: number;
    amount: number; 
    time: Date;
    toUserId: number;
    toUserName: string;
    paymentModeP2P: "paid" | "received"
}

export function TransactionCard({transactions, href} : {transactions: TransactionCardProps [], href: string})
{
    if(!transactions.length)
    {
        return (
            <div className="w-full">
                <Card title="Recent Transactions">
                    <div key={1} className="mx-4 text-center font-bold py-8">
                        No Recent transactions
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full">
            <Card title="Recent Transactions">
                <div className="flex justify-end">
                <TxButton placeholder={"View all transactions"} href={href}></TxButton>
                </div>
            </Card>
        </div>
    )
}

export function P2PTransactions({ transactions }: { transactions: P2PTransactionStyleProps[] }) {
  return (
    <div className="w-full">
      {(!transactions || transactions.length === 0) ? (
        <Card title="Recent Transactions">
          <div className="mx-2 text-center font-bold py-6 w-full text-sm">
            No Recent transactions
          </div>
        </Card>
      ) : (
        <Card title="Recent Transactions" IsviewAll>
          <div className="overflow-x-auto max-h-72 sm:max-h-60">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-3 sm:px-4 py-2 text-right font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map(tx => (
                  <P2PTransactionStyle transaction={tx} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}


export interface P2PTransactionStyleProps {
//   id: number;
  amount: number;
  time: Date;
  toUserId: number;
  toUserName: string;
  paymentModeP2P: "paid" | "received";
}
export default function P2PTransactionStyle({ transaction }: { transaction: P2PTransactionStyleProps }) {
  const isPaid = transaction.paymentModeP2P === "paid";
  const sign = isPaid ? "-" : "+";
  const amountColor = isPaid ? "text-red-600" : "text-green-600";
  const actionText = isPaid ? "Sent" : "Received";
  const formattedAmount = Math.abs(transaction.amount / 100).toFixed(2);
  const formattedDate = transaction.time.toLocaleDateString();
  const formattedTime = transaction.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <tr className="bg-white hover:bg-gray-100 transition-colors text-xs sm:text-sm">
      <td className="px-3 sm:px-4 py-2 flex items-center gap-2 max-w-[10rem] truncate">
        {isPaid ? (
          <RiArrowRightUpLine className="h-4 w-4 text-red-500 shrink-0" />
        ) : (
          <RiArrowRightDownLine className="h-4 w-4 text-green-500 shrink-0" />
        )}
        <span className="text-gray-900 font-medium truncate">{transaction.toUserName}</span>
      </td>
      <td className="px-3 sm:px-4 py-2 text-gray-600 whitespace-nowrap">{actionText}</td>
      <td className="px-3 sm:px-4 py-2 text-gray-600 whitespace-nowrap truncate">
        {formattedDate} • {formattedTime}
      </td>
      <td className={`px-3 sm:px-4 py-2 text-right font-semibold ${amountColor} whitespace-nowrap`}>
        {sign} ₹{formattedAmount}
      </td>
    </tr>
  );
}
// Usage example in a table:
{/* <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Amount</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {transactions.map(tx => (
      <P2PTransactionStyle key={tx.id} transaction={tx} />
    ))}
  </tbody>
</table> */}
