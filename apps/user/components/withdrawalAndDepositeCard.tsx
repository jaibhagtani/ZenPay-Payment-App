import { Card } from "@repo/ui/card";

interface WithdrawalAndDepositeCardInputs {
    totalWithdrawalAmount : number;
    totalDepositAmount : number;
}



export default function WithdrawalAndDepositeCard({totalWithdrawalAmount, totalDepositAmount} : WithdrawalAndDepositeCardInputs) 
{

    return (
        <div className="min-w-fit">
            <Card title="Deposits and Withdraws">
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Total Withdrawal Amount
                    </div>
                    <div className={`font-semibold mx-4 ${Number(totalWithdrawalAmount) === 0 ? "" :"text-red-500"}`}>
                        {Number(totalWithdrawalAmount) === 0  ? "": "-" } {Number(totalWithdrawalAmount) / 100} INR
                    </div>
                </div>
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Total Deposit Balance
                    </div>
                    <div className={`font-semibold mx-4 ${Number(totalDepositAmount) === 0 ? "" :"text-green-500"}`}>
                        {Number(totalDepositAmount) === 0  ? "": "+" } {Number(totalDepositAmount) / 100} INR
                    </div>
                </div>
            </Card>
        </div>
    )
}