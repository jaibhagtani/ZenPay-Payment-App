"use client"
import React, { useEffect, useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { Button } from "@repo/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {signIn} from "next-auth/react"
import {LoginButton} from "@repo/ui/loginbutton"
import Link from "next/link";

export default function FormPageSignup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams();
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");



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
      const res = await signIn("signup", {
        name: Name,
        phone: phoneNumber,
        password: password,
        email: email,
        redirect:false,
      })
      // console.log('Res', res)
      if (!res?.error)
      {
        router.push('/dashboard')
      } 
      else 
      {
        setError('Invalid Credentials')
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    }
    
  }
  
  
  return (
    <form onSubmit={onSubmit} className="w-full py-5 mx-5 px-10 h-max bg-white rounded-3xl">
        <div className="font-bold text-4xl flex justify-center pb-1">
            ZenPay
        </div>
        <div className="font-bold text-3xl">
            Sign up
        </div>
        {error && <p className="pt-1 text-red-500 text-2xl font-bold text-center">{error}</p>}

        <div className="my-4">
            <div className="my-8">
                <LabelledInputAuth label="First Name" placeholder="1231231230" onChangeFunc={(name) => {
                    setName(name)
                }}></LabelledInputAuth>
            </div>
            <div className="my-8">
                <LabelledInputAuth label="Email" placeholder="1231231230" onChangeFunc={(email) => {
                    setEmail(email)
                }}></LabelledInputAuth>
            </div>
            <div className="my-8">
                <LabelledInputAuth label="Phone Number" placeholder="1231231230" type="number" onChangeFunc={(num) => {
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

            <div className="text-base flex justify-center mt-2">
              <div>
                already have an account! 
              </div>
              <Link className="text-blue-900 pl-1 hover:underline" href={"/auth/signin"}>
                Sign in
              </Link>
            </div>
        </div>
    </form>
  );
}