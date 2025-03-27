import BalanceCardAccount from "./balanceCardAccount"
import DepositAndWithDrawCard from "./depositAndWithDrawCard"
import P2PCardAccount from "./p2pCardAccount"
import P2PTransactionStyleAccountSection from "./p2pTransactionStyleAccountSection"
import WithdrawalAndDepositeCard from "./withdrawalAndDepositeCard"


interface AccountSectionInput {
    withdrawSum: any,
    depositSum: any, 
    balance: any,
    totalPaidAmount: any,
    totalReceivedAmount: any,
    depositTransactions: any,
    withdrawTransactions: any,
    P2Ptxns: any
}

export default function AccountSection({withdrawSum, depositSum, balance,totalPaidAmount, totalReceivedAmount, 
    depositTransactions, withdrawTransactions, P2Ptxns} : AccountSectionInput)
{
    return (
    <div className="max-w-screen">
      <div className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
        Balances and Transactions
      </div>
      <br />
      <div className="text-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-2 mb-8 font-bold px-4">
        Balances
      </div>
      <div className="mx-4 grid grid-cols-1 gap-4 lg:grid-cols-3 h-max w-full">
        <div className="bg-white rounded-xl p-6 h-max shadow-lg my-2 max-w-80 min-w-fit lg:max-w-96">
          <WithdrawalAndDepositeCard totalWithdrawalAmount={withdrawSum} totalDepositAmount={depositSum} />
        </div>
        <div className="bg-white rounded-xl p-6 h-max shadow-lg my-2 max-w-80 min-w-fit lg:max-w-96">
          <BalanceCardAccount amount={balance.amount} locked={balance.locked} />
        </div>
        <div className="bg-white rounded-xl p-6 h-max shadow-lg my-2 max-w-80 min-w-fit lg:max-w-96">
          <P2PCardAccount totalPaid={totalPaidAmount} totalReceived={totalReceivedAmount} />
        </div>
      </div>
      <div className="text-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-2 mb-8 font-bold px-4">
        Transactions
      </div>
      <div className="mx-4 min-h-screen w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex justify-center">
          <DepositAndWithDrawCard depositTransactions={depositTransactions} withdrawTransactions={withdrawTransactions} />
        </div>
        <div className="bg-white rounded-xl p-6 h-max shadow-lg my-4 lg:w-full flex justify-center">
          <div className="flex justify-center">
            <div className="max-w-fit lg:min-w-96">
              <div className="text-2xl flex flex-row justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4">
                Recent P2P Transactions
              </div>
              {P2Ptxns && P2Ptxns.length > 0 ? (
                <div className="flex justify-center text-xl text-black-600 pt-2 mb-2 font-bold px-4 mt-5">
                  {P2Ptxns.length} Transaction(s)
                </div>
              ) : (
                <div className="font-semibold m-10 text-xl flex justify-self-center font-bold rounded-xl">
                  No Recent P2P Transactions
                </div>
              )}
              {P2Ptxns && P2Ptxns.length > 0 && (
                <div className="grid grid-cols-9 p-2 mr-2 gap-4 bg-white rounded-3xl lg:px-14 py-6">
                  <div className="col-start-1 col-span-9">
                    {P2Ptxns.map((transaction : any) => (
                      <P2PTransactionStyleAccountSection transaction={transaction} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}