"use client"
import { Card } from "@repo/ui/card"
import LabelledInput from "@repo/ui/labelledinput"
import Select from "@repo/ui/select"
import {useState} from "react"
import { createOnRampTrans } from "../app/lib/actions/createOnRampTransactions"
import { useSession } from "next-auth/react"
import { Button } from "@repo/ui/button"
import { InputOTPGroup } from "./inputotpgroup"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl : "https://netbanking.hdfcbank.com"
},
{
    name: "Axis Bank",
    redirectUrl : "https://www.axisbank.com"
},
{
    name: "Zen Bank",
    redirectUrl: ""
}]


export function AddMoney({title, buttonThing} : {title: string, buttonThing: string}) {

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);
    const [bool, setBool] = useState(false);
    const [boolButton, setBoolButton] = useState(false);
    const session = useSession();
    const [showMpinBar, setShowMpinBar] = useState(false);
    const [Mpin, setMpin] = useState("");

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
        <div className="min-h-fit mx-5">
            <div className="pt-2"></div>
                <Card title={`${title}`}>
                    <div className="ml-4 mt-10 w-full pr-4">
                    <LabelledInput label="Amount" placeholder="Amount" onChangeFunc={(val) => {
                        setValue(Number(val));
                        {Number(val) > 0 ? setBool(true) : setBool(false)}
                    }}></LabelledInput>
                    <div className="pb-2 text-sm font-semibold mt-4">
                        Bank
                    </div>
                    {/* IMP LOGIC  */}
                    <Select onSelect={(value) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                    }} options={SUPPORTED_BANKS.map(bank => ({
                        key: bank.name,
                        value: bank.name
                    }))}></Select>
                    {/* The window.location object in JavaScript provides information about the current URL */}
                    <div className="flex flex-row justify-center">
                        <div className="flex justify-center mt-10 pb-8">
                            {!showMpinBar ? (<Button onClickFunc={async () => {
                                if(provider !== "" && value !== 0)
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
                                        if(validateRes.msg === "Valid User")
                                        {
                                            // const provider:string = SUPPORTED_BANKS.find(x => x.redirectUrl === redirectUrl)?.name || "";
                                            await createOnRampTrans(provider, value);
                                            window.location.href = redirectUrl || "";
                                        }
                                        else 
                                        {
                                            alert("Invalid MPIN")
                                        }
                                        
                                    }}>Transfer</Button>
                            </div>
                        </div>)}
                    </div> 
                </div> 
            </div> 

            </Card>
        </div>
    )
}