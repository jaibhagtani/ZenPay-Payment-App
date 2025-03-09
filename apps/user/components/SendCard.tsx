"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import LabelledInput from "@repo/ui/labelledinput";
import React, {useState} from "react"
import { transferP2P } from "../app/lib/actions/p2ptransfer";

export default function SendCard()
{
    const [phoneNumber, setPhoneNumber] = useState("");
    const [value, setValue] = useState(0);
    // const [response, setResponse] = useState("");

    return (
        <div className="h-max bg-white px-5 rounded-2xl">
                <Card title="Send">
                    <div className="w-full mt-8">
                        
                        <LabelledInput label="Number" placeholder="1231231231" onChangeFunc={(val) => {
                            setPhoneNumber(val);
                        }}></LabelledInput>
                        <div className="mt-5"></div>
                        <LabelledInput label="Amount" placeholder="Amount" onChangeFunc={(val) => {
                            setValue(Number(val));
                        }}></LabelledInput>
                    </div>
                    <div className="flex justify-center mt-10 pb-8">
                        <Button onClickFunc={async () => {
                            const res = await transferP2P(phoneNumber, Number(value) * 100);
                            if(res?.msg == "User not Loggedin")
                            {
                                alert("User Not Logged in");
                            }
                            else if(res?.msg == "User not found" || res.msg == "Transfering to invalid user")
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
                        }}>Transfer</Button>
                    </div>
                </Card>
        </div>
    )
}