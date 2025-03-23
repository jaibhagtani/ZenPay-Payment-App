"use client"
import React, { use, useEffect, useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { Button } from "@repo/ui/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import {signIn} from "next-auth/react"
import {LoginButton} from "@repo/ui/loginbutton"
import Link from "next/link";
import { IDLE_FETCHER } from "react-router";
import {z} from "zod";


const signupFormSchema = z.object({
  phoneNumber: z.string().length(10),
  Name: z.string(),
  password: z.string().min(6).max(14),
  email: z.string().email()
})

// https://ethanmick.com/build-a-custom-login-page-with-next-js-tailwind-css-and-next-auth/
// https://www.ramielcreations.com/nexth-auth-magic-code
// https://www.youtube.com/watch?v=bicCg4GxOP8&ab_channel=CandDev

// Twillo
// https://medium.com/globant/twilio-otp-authentication-12002a139e38
export default function FormPageSignup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams();
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPbar, setShowOTPbar] = useState(false);
  const [sendOTPAgain, setSendOTPAgain] = useState(0);
  const [validate, setValidate] = useState(false);

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
    // ZOD
    
    const obj = {
      Name,
      password,
      phoneNumber,
      email
    }
    
    const res = signupFormSchema.safeParse(obj);
    if(!res.success)
      {
        setError('Invalid Credentials')
        return;
      }
      
      setShowOTPbar(true);
    try {
      if(sendOTPAgain == 0)
      {
        const OTP = await fetch(`http://localhost:3000/api/auth/otp/send-otp`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            phoneNumber: phoneNumber
          }),
        });
        setSendOTPAgain(1);
      }
      
      if(validate)
      {
        const res = await signIn("signup", {
          name: Name,
          phone: phoneNumber,
          password: password,
          email: email,
          redirect:false,
        })
        console.log('Res', res)
        if (!res?.error)
        {
          router.push("/setmpin");
        }
        else 
        {
          setError('Invalid Credentials')
        }
        
        setValidate(false);

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
                <LabelledInputAuth label="First Name" placeholder="John Doe" type="text" onChangeFunc={(name) => {
                    setName(name)
                }}></LabelledInputAuth>
            </div>
            <div className="my-8">
                <LabelledInputAuth label="Email" placeholder="johndoe2@gmail.com" type="email" onChangeFunc={(email) => {
                    setEmail(email)
                }}></LabelledInputAuth>
            </div>
            <div className="my-8">
                <LabelledInputAuth label="Phone Number (10 digits)" placeholder="1231231230" type="tel" onChangeFunc={(num) => {
                    setPhoneNumber(num)
                }}></LabelledInputAuth>
            </div>
            <div className="my-8">
                <LabelledInputAuth label="Password (min 6 characters)" placeholder="1@3/4*6" type="password" onChangeFunc={(pass) => {
                    setPassword(pass)
                }}></LabelledInputAuth>
            </div>
            
            {showOTPbar ? <div className="flex">
              <LabelledInputAuth label="Enter OTP" placeholder="102030" type="text" onChangeFunc={(otp) => {
                    setOtp(otp)
                }}></LabelledInputAuth>

              <div className="flex">
                <div className="font-xs font-semibold">didn't receive an OTP?</div>
                <div className="px-2">
                <button className="font-xs text-blue-500 font-semibold" onClick={() => {
                  setSendOTPAgain(0);
                }}>Send OTP again!</button>
                </div>
              </div>
            </div>
            : ""}

            <div className="mt-6 flex justify-center">
            { showOTPbar ? <div>
              <LoginButton onClickFunc={async ()=> {
                const validation = await fetch(`http://localhost:3000/api/auth/otp/verify-otp`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    phoneNumber: phoneNumber,
                    otp: otp
                  }),
                });
                
                
                const validValue = validation.ok;
                
                if(validValue)
                {
                  setValidate(true);
                }
                else 
                {
                  setValidate(false);
                }

              }}>Submit OTP</LoginButton> 
              
              </div>
              : 
              
              <LoginButton  onClickFunc={() => {
                  
                }}>Sign up</LoginButton>
              } 
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