"use client"
import React, { useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { Button } from "@repo/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {signIn} from "next-auth/react"
import {LoginButton} from "@repo/ui/loginbutton"
import Link from "next/link";

export default function FormPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'


  async function onSubmit(e: React.FormEvent)
  {
    // console.log("signin ")
    // ************* Yaha pr bohot galti hogi ************************
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        phone: phoneNumber,
        password: password
      })
      // console.log('Res', res)
      if (!res?.error) 
      {
        router.push(callbackUrl)
      } 
      else 
      {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
    
  }


  return (
    <form onSubmit={onSubmit} className="w-full py-10 mx-5 px-10 h-screen">
        <div className="py-6 font-bold text-4xl">
            Sign in
        </div>
        <div className="my-20">
            <div className="my-8">
                <LabelledInputAuth label="Phone Number" placeholder="1231231230" onChangeFunc={(num) => {
                    setPhoneNumber(num)
                }}></LabelledInputAuth>
            </div>
            
            <div className="my-8">
                <LabelledInputAuth label="Password" placeholder="1@3/4" onChangeFunc={(pass) => {
                    setPassword(pass)
                }}></LabelledInputAuth>
            </div>
            {error ? <div>{error}</div> : <div></div>}
            <div className="mt-6 flex justify-center">
                <LoginButton  onClickFunc={() => {
                  // console.log("HEllo ji")
                }}>Sign in</LoginButton>
            </div>

            <div className="text-base flex justify-center mt-10">
              <div>
                don't have an account? 
              </div>
              <Link className="pl-1 text-blue-900 hover:underline" href={"/auth/signup"}>
                Sign up
              </Link>
              
            </div>
        </div>
    </form>
  );
}