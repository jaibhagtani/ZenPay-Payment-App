import { Card } from "@repo/ui/card";

interface P2PCardAccountInputs {
    totalPaid : number;
    totalReceived : number;
}



export default function P2PCardAccount({totalPaid, totalReceived} : P2PCardAccountInputs) 
{

    return (
        <div className="min-w-fit">
            <Card title="P2P Transfers">
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Total Withdrawal Amount
                    </div>
                    <div className={`font-semibold mx-4 ${Number(totalPaid) === 0 ? "" : "text-red-500"}`}>
                        {Number(totalPaid) === 0 ? "" : "-"} {Number(totalPaid) / 100} INR
                    </div>
                </div>
                <div className="flex justify-between pt-4 border-b border-pink-100">
                    <div className="mx-4 font-semibold mb-1">
                        Total Deposit Balance
                    </div>
                    <div className={`font-semibold mx-4 ${Number(totalReceived) === 0 ? "" : "text-green-500"}`}>
                    {Number(totalReceived) === 0 ? "" : "+"} {Number(totalReceived) / 100} INR
                    </div>
                </div>
            </Card>
        </div>
    )
}