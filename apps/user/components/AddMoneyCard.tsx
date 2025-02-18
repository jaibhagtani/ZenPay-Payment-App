"use client"
import { Card } from "@repo/ui/card"
import LabelledInput from "@repo/ui/labelledinput"
import Select from "@repo/ui/select"
import {useState} from "react"
import { createOnRampTrans } from "../app/lib/actions/createOnRampTransactions"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl : "https://netbanking.hdfcbank.com"
},
{
    name: "Axis Bank",
    redirectUrl : "https://www.axisbank.com"
}]

export function AddMoney() {

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);
    const [bool, setBool] = useState(false);
    const [boolButton, setBoolButton] = useState(false);

    return (
        <div className="min-h-fit mx-5">
            {/* {value} */}
                <Card title="Add Money">
                    <div className="ml-4 mt-10 min-w-96">
                    <LabelledInput label="Amount" placeholder="Amount" onChangeFunc={(val) => {
                        setValue(Number(val));
                        {Number(val) ? setBool(true) : setBool(false)}
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

                        <button onClick={async () => {
                            // const provider:string = SUPPORTED_BANKS.find(x => x.redirectUrl === redirectUrl)?.name || "";
                            setBoolButton(true);
                            if(bool)
                            {
                                await createOnRampTrans(provider, value);
                                window.location.href = redirectUrl || "";
                            }
                                // *******************
                                // Uss time uss URL ko chala rhe hai 
                                // Can be set, to navigate to the given URL.
                            }} className="mt-10 bg-black border w-40 h-10 rounded-xl text-white text-center">Add Money</button>
                    </div>
                    {boolButton && !bool ?  <div className="text-2xl mt-10 font-semibold flex justify-center text-red-500 pb-16"> Enter the Valid value of Amount !! </div> : <div className="pb-20 mt-10"></div> }
                </div> 
            </Card>
        </div>
    )
}