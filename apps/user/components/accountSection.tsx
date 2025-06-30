import DepositAndWithDrawCard from "./cards/Account Cards/Deposit-WithDrawAccount";
import P2PCardAccount from "./cards/Account Cards/DetailsCardAccounts";
import WithdrawalAndDepositeCard from "./cards/Account Cards/withdrawalAndDepositeCard";
import { BalanceCardAccount } from "./cards/Pages Cards/BalanceCard";
import { P2PTransactionStyleAccountSection } from "./transactions folder/Accounts/TransactionShowBox";

interface AccountSectionInput {
  withdrawSum: number;
  depositSum: number;
  balance: { amount: number; locked: number };
  totalPaidAmount: number;
  totalReceivedAmount: number;
  depositTransactions: any[];
  withdrawTransactions: any[];
  P2Ptxns: any;
}

export default function AccountSection({
  withdrawSum,
  depositSum,
  balance,
  totalPaidAmount,
  totalReceivedAmount,
  depositTransactions,
  withdrawTransactions,
  P2Ptxns,
}: AccountSectionInput) {
  return (
    <div className="mx-auto max-w-screen-xl py-8">
      <div className="mb-8 px-2">
        <h1 className="mt-12 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-10">
          Balances and Transactions
        </h1>
      </div>

      <div className="mb-8 px-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text mb-4">
          Balances
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <WithdrawalAndDepositeCard
              totalWithdrawalAmount={withdrawSum}
              totalDepositAmount={depositSum}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <BalanceCardAccount
              amount={balance.amount}
              locked={balance.locked}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <P2PCardAccount
              totalPaid={totalPaidAmount}
              totalReceived={totalReceivedAmount}
            />
          </div>
        </div>
      </div>

      <div className="px-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text mb-4">
          Transactions
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <DepositAndWithDrawCard
              depositTransactions={depositTransactions}
              withdrawTransactions={withdrawTransactions}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text mb-4">
                Recent P2P Transactions
              </h3>
              {P2Ptxns && P2Ptxns.length > 0 ? (
                <>
                  <div className="text-xl text-gray-700 font-semibold mb-4">
                    {P2Ptxns.length} Transaction(s)
                  </div>
                  <div className="space-y-2 w-full">
                    {P2Ptxns.map((transaction: any, index: number) => (
                      <P2PTransactionStyleAccountSection
                        key={index}
                        transaction={transaction}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="font-semibold text-xl text-gray-600 py-4">
                  No Recent P2P Transactions
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
