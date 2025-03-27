import { Card } from "@repo/ui/card";

interface BalanceCardAccountProps {
    amount : number;
    locked : number;
}



export default function BalanceCardAccount({amount, locked} : BalanceCardAccountProps) 
{

    return (
        <div className="min-w-fit">
            <Card title="Balances">
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Unlocked Balance
                    </div>
                    <div className="font-semibold mx-4">
                        {Number(amount) / 100} INR
                    </div>
                </div>
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Total Locked Balance
                    </div>
                    <div className="font-semibold mx-4">
                        {Number(locked) / 100} INR
                    </div>
                </div>
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Total Balance
                    </div>
                    <div className="font-semibold mx-4">
                        {Number(amount + locked )/ 100} INR
                    </div>
                </div>
            </Card>
        </div>
    )
}