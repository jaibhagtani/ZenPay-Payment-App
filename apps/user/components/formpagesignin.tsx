"use client"
import React, { useEffect, useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { useRouter, useSearchParams } from "next/navigation";
import {signIn} from "next-auth/react"
import {LoginButton} from "@repo/ui/loginbutton"
import Link from "next/link";

export default function FormPageSignin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(searchParams)
    {
      const url = searchParams[1];
      const decodedUrl = decodeURIComponent(url);
      const urlParams = new URLSearchParams(new URL(decodedUrl).search);
      const errorParam = urlParams.get("error");
      if (errorParam) {
        setError(errorParam);
      }
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent)
  {
    // console.log("signin ")
    // ************* Yaha pr bohot galti hogi ************************
    e.preventDefault();
    try {
      const res = await signIn("signin", {
        phone: phoneNumber,
        password: password,
        redirect:false,
      })
      // console.log('Res', res)
      if (!res?.error)
      {
        router.push('/dashboard')
      } 
      else 
      {
        setError('Invalid phone number or password')
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    }
    
  }
  
  
  return (
    <form onSubmit={onSubmit} className="w-full py-5 mx-5 px-10 h-screen">
        <div className="py-6 font-bold text-4xl">
            Sign in
        </div>
        {error && <p className="text-red-500 text-2xl font-bold text-center">{error}</p>}

        <div className="my-20">
            <div className="my-8">
                <LabelledInputAuth label="Phone Number" placeholder="1231231230" onChangeFunc={(num) => {
                    setPhoneNumber(num)
                }}></LabelledInputAuth>
            </div>
            
            <div className="my-8">
                <LabelledInputAuth label="Password" placeholder="1@3/4" type="password" onChangeFunc={(pass) => {
                    setPassword(pass)
                }}></LabelledInputAuth>
            </div>
            
            <div className="mt-6 flex justify-center">
                <LoginButton  onClickFunc={() => {
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