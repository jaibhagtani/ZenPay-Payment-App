"use client"
import InputOTPSlot from "@repo/ui/inputotpslot"
import { useEffect, useState } from "react"

interface InputOTPGroupProps {
    onChangeFunc: (otp : string) => void ;
  }

export function InputOTPGroup({onChangeFunc} : InputOTPGroupProps)
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
        }></InputOTPSlot>
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter2(e);
            }
        }></InputOTPSlot>
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter3(e);
            }
        }></InputOTPSlot>
        <InputOTPSlot onChangeFunc = {
            (e : any) => {
                setLetter4(e);
            }
        }></InputOTPSlot>

        
    </div>
}