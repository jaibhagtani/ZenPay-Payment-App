"use client"
import InputOTPSlot from "@repo/ui/inputotpslot"
import { useEffect, useState } from "react"

interface InputOTPGroupProps {
    onChangeFunc: (otp : string) => void ;
    type: string
  }

export function InputOTPGroup({onChangeFunc, type} : InputOTPGroupProps)
{
    const [letter1, setLetter1] = useState("");
    const [letter2, setLetter2] = useState("");
    const [letter3, setLetter3] = useState("");
    const [letter4, setLetter4] = useState("");
    
    useEffect(() => {

        if(letter1 !== "" && letter2 !== ""  && letter3 !== "" && letter4 !== "") {
            const otp = letter1 + letter2 + letter3 + letter4;
            onChangeFunc(otp);
        } else {
            onChangeFunc("");
        }
    }, [letter1, letter2, letter3, letter4, onChangeFunc]);
      
    return <div className="flex justify-center">
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter1(e);
            }
        } oftype={type}></InputOTPSlot>
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter2(e);
            }
        } oftype={type}></InputOTPSlot>
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter3(e);
            }
        } oftype={type}></InputOTPSlot>
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter4(e);
            }
        } oftype={type}></InputOTPSlot>

        
    </div>
}