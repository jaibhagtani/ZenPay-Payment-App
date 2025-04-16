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
  const [isLoading, setisLoading] = useState(false);
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
    setisLoading(true);
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
    finally{
      setisLoading(false)
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
                <LoginButton state={isLoading}  onClickFunc={() => {
                }}>{isLoading? <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>: "Sign in"}</LoginButton>
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