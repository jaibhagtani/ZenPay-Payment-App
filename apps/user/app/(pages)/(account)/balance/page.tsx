import { getServerSession } from "next-auth";
import { getBalance } from "../../../lib/actions/getBalance";
import { getWithdrawTxns } from "../../../lib/actions/getWithdraw-txns";
import { getDepositeTxns } from "../../../lib/actions/getDeposite-txns";
import { getP2PTxns } from "../../../lib/actions/getP2P-txns";
import { NEXT_AUTH } from "../../../lib/auth";
import AccountSection from "../../../../components/accountSection";


export default async function Page() {
      const session = await getServerSession(NEXT_AUTH);
        const balanceData = await getBalance();
        const withdrawData = await getWithdrawTxns();
        const depositData = await getDepositeTxns();
        const p2pData = await getP2PTxns();

        // const balanceData = await balanceRes.json()
        // const withdrawData = await withdrawRes.json()
        // const depositData = await depositRes.json()
        // const p2pData = await p2pRes.json()

        // setBalance(balanceData.balance || { amount: 0, locked: 0 });
        // setWithdrawSum(withdrawData.totalWithdrawalAmount || 0);
        // setWithdrawTransactions(withdrawData.tx || []);
        // setDepositTransactions(depositData.tx || []);
        // setP2Ptxns(p2pData.tx || []);

  return (
    <div>
      <AccountSection withdrawSum={withdrawData.totalWithdrawalAmount || 0} balance={balanceData.balance || { amount: 0, locked: 0 }} totalPaidAmount={p2pData.totalPaid || 0}
        totalReceivedAmount={p2pData.totalReceived || 0}  depositSum={depositData.totalDepositAmount || 0} P2Ptxns={p2pData.tx} 
        depositTransactions={depositData.tx || []} withdrawTransactions={withdrawData.tx || []}
      ></AccountSection>
    </div>
  );
}
