"use client"
import React, { useEffect, useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import {LoginButton} from "@repo/ui/loginbutton"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FormPageSignin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if(searchParams)
    {
      const url = searchParams[1];
      const decodedUrl = decodeURIComponent(url);
      const urlParams = new URLSearchParams(new URL(decodedUrl).search);
      const errorParam = urlParams.get("error");
      if (errorParam) {
        alert(errorParam);
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
        alert("Signed in Successfully!!")
        router.push("/dashboard")
      } 
      else 
      {
        alert('Invalid phone number or password')
      }
    } 
    catch (err: any) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
    
  }
  
  
  return (
    <form onSubmit={onSubmit} className="w-full py-8 mx-5 px-10 h-max bg-white rounded-3xl">
        <div className="pb-1 font-bold text-4xl flex justify-center">
            ZenPay
        </div>
        <div className="font-bold text-3xl">
          Sign in
        </div>

        <div className="my-20">
            <div className="my-8">
                <LabelledInputAuth label="Phone Number" placeholder="1231231230" onChangeFunc={(num) => {
                    setPhoneNumber(num)
                }}></LabelledInputAuth>
            </div>
            
            <div className="my-8">
                <LabelledInputAuth label="Password (min 6 characters)" placeholder="1@3/4*6" type="password" onChangeFunc={(pass) => {
                    setPassword(pass)
                }}></LabelledInputAuth>
            </div>
            
            <div className="mt-6 flex justify-center">
                <LoginButton  onClickFunc={() => {
                }}>Sign in</LoginButton>
            </div>
            <div className="flex font-semibold justify-center mt-10">
              <div>
                don't Remember Password?
              </div>
              <Link className="text-blue-900 pl-1 hover:underline " href={"/update/password"}>Forgot password</Link>
            </div>
            <div className="text-base flex justify-center mt-2">
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