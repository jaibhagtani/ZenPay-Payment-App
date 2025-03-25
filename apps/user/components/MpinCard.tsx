"use client"

import { Card } from "@repo/ui/card";
import { InputOTPGroup } from "./inputotpgroup";
import { Button } from "@repo/ui/button";

interface MpinCardInput {
    title: string, 
    // onChangeFunc: (mpin : string) => void;
}
export function MpinCard({title} : MpinCardInput) {

    
    return (
        <div className="min-h-fit mx-5">
            <div className="pt-2"></div>
                <Card title={title}>
                    <div className="font-2xl font-semibold px-3 py-2">
                        Secure your payments with your unique 4-digit MPIN for instant and safeguarded transactions.
                    </div>
                    <div className="font-xl font-bold my-3 py-1 px-5 border-b border-sm">Enter MPIN</div>
                        <div className="space-y-2 w-full flex flex-col items-center justify-center 3 py-5">
                            {/* For OTP */}
                            <InputOTPGroup onChangeFunc = {(e : string) => {
                                // onChangeFunc(e)
                            }}></InputOTPGroup>
                        </div>
                    <div className="font-xl font-bold my-3 px-5 py-1 border-b border-sm">Confirm MPIN</div>
                        <div className="space-y-2 w-full flex flex-col items-center justify-center my-2 py-5">
                            {/* For OTP */}
                            <InputOTPGroup onChangeFunc = {(e : string) => {
                                // onChangeFunc(e)
                            }}></InputOTPGroup>
                        </div>
                    <div className="flex justify-center py-2">
                        <Button onClickFunc={()=> {

                        }}>Submit</Button>
                    </div>
                    
                </Card>
        </div>
    )
}