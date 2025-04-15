"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import LabelledInput from "@repo/ui/labelledinput";
import React, {useState} from "react"
import { transferP2P } from "../app/lib/actions/p2ptransfer";
import { InputOTPGroup } from "./inputotpgroup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SendCard()
{
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [value, setValue] = useState(0);
    const [showMpinBar, setShowMpinBar] = useState(false);
    const [Mpin, setMpin] = useState("");
    const session = useSession();

    async function validateMpin()
    {
        if(!session.data?.user)
        {
            return Response.json({
                msg: "User Not Loggedin!!"
            })
        }

        const res = await fetch("/api/mpin/validate", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Mpin: Mpin,
                email: session.data.user.email
            }),
        })
        return res.json();
        
    }
    return (
        <div className="h-max bg-white px-5 rounded-2xl">
            <Card title="Send">
                <div className="w-full max-w-full mt-8">
                    
                    <LabelledInput label="Number" placeholder="1231231231" onChangeFunc={(val) => {
                        setPhoneNumber(val);
                    }}></LabelledInput>
                    <div className="mt-5"></div>
                    <LabelledInput label="Amount" placeholder="Amount" onChangeFunc={(val) => {
                        setValue(Number(val));
                    }}></LabelledInput>
                </div>
                
                <div className="flex justify-center mt-10 pb-8">
                    {!showMpinBar ? (<Button onClickFunc={async () => {
                        if(phoneNumber !== "" && value !== 0)
                        {
                            setShowMpinBar(true)
                        }
                        else 
                        {
                            alert("Invalid Details and Amount")
                        }
                        
                    }}>Next</Button>)
                : (
                    <div> 
                        <div className="font-sm font-bold flex justify-start py-1 border-b border-lg">Enter MPIN</div>
                            <div className="py-2 flex justify-center">
                                <InputOTPGroup type="password" onChangeFunc={(pin) => {
                                    setMpin(pin);
                                }}></InputOTPGroup>
                            </div>
                        <div className="flex justify-center py-2 pt-2">
                            <Button onClickFunc={async () => {

                                const validateRes = await validateMpin();
                                // const validatestring = JSON.stringify(validateRes)
                                if(validateRes.msg === "Valid User")
                                {
                                    const res = await transferP2P(phoneNumber, Number(value) * 100);
                                    if(res?.msg == "User not Loggedin")
                                    {
                                        alert("User Not Logged in");
                                    }
                                    else if(res.msg == "Transfering to invalid user")
                                    {
                                        alert("Transfering to invalid user");
                                    }
                                    else if(res?.msg == "User not found")
                                    {
                                        alert("Receiver User not found");
                                    }
                                    else if(res.msg == "Insufficient funds")
                                    {
                                        alert("Insufficient funds");
                                    }
                                    else if(res.msg == "Transaction Success")
                                    {
                                        alert("Transaction Success");
                                        router.push("/transactions/p2p");
                                    }
                                    else if(res.msg == "Insufficient Funds")
                                    {
                                        alert("Insufficient Funds")
                                    }
                                    else if(res.msg == "Invalid Amount")
                                    {
                                        alert("Invalid Amount")
                                    }
                                    else{
                                        alert("Error while p2p");
                                    }
                                }
                                else 
                                {
                                    alert("Invalid MPIN")
                                }
                                
                            }}>Transfer</Button>
                        </div>

                    </div>)}
                </div> 
            </Card>
        </div>
    )
}