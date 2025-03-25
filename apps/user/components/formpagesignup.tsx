"use client"
import React, { useEffect, useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { redirect, useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import {z} from "zod";
import { InputOTPGroup } from "./inputotpgroup";


const nextReqSchema = z.object({
  contact: z.string().length(10),
  Name: z.string().min(1),
  email: z.string().email()
})


const loginReqSchema = z.object({
  contact: z.string().length(10),
  Name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).max(14),
  receivedOtpCode: z.string().length(4)
})

// https://ethanmick.com/build-a-custom-login-page-with-next-js-tailwind-css-and-next-auth/
// https://www.ramielcreations.com/nexth-auth-magic-code
// https://www.youtube.com/watch?v=bicCg4GxOP8&ab_channel=CandDev

// Twillo
// https://medium.com/globant/twilio-otp-authentication-12002a139e38
export default function FormPageSignup() {
  // const [error, setError] = useState<string | null>(null);
  // const [searchParams, setSearchParams] = useSearchParams();

  // const [showOTPbar, setShowOTPbar] = useState(false);
  // const [sendOTPAgain, setSendOTPAgain] = useState(0);
  // const [validate, setValidate] = useState(false);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState(false);
  const [receivedOtpCode, setReceivedOtpCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [OTPresponse, setOTPresponse] = useState("");
  const router = useRouter()
  const [error, setError] = useState("")
  const [firstTime, setFirstTime] = useState(true)
  const startTimer = () => {
    setTimeLeft(60);
    setTimerRunning(true);
  };

  const handleVerify = async () => {
    const res = await fetch("http://localhost:3000/api/auth/otp/verify-otp",
      {
        method: "POST",
        headers: {
           'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          otp: receivedOtpCode
        })
      }  
    );

    if(res.status === 200)
    {
      setOTPresponse("OTP Verified!!");
    }
    else if(res.status === 400)
    {
      setOTPresponse("Incorrect OTP. Please try again.");
    }
    else 
    {

    }
    return res.status;
  }

  const handleSendOtp = async () => {
    startTimer();
    setResendClicked(true);
    const res = await fetch("http://localhost:3000/api/auth/otp/send-otp",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: Name
        })
      }  
    );
    if(res.status === 200)
    {
      setOtp(true);
    }
    else
    {
      setOtp(false)
    }
  };

  const handleLogin = async () => {
    const responseVerification = await handleVerify();
    if (responseVerification === 200) {
      const res = await signIn("signup", {
        name: Name,
        phone: contact,
        password: password,
        email: email,
        redirect:false,
      })
      // setMPIN

      if(res?.error)
      {
        setError(`You Already have an Account!!
                  Redirecting to Sign In!`);
      }
      else 
      {
        setError("Signed Up Successfully!")
        router.push("/setMPIN");
      }
    }
  };

  
  const resendOTP = () => {
    setTimerRunning(false);
    startTimer();
    setResendClicked(true);
    handleSendOtp();
  };


  
  useEffect(() => {
    let timer : any;
    if (timerRunning) {
      timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          setTimerRunning(false);
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);


  useEffect(() => {
    if (contact === "" || contact === null) {
      setOtp(false);
      setTimeLeft(60);
      setTimerRunning(false);
      setResendClicked(false);
    }
  }, [contact]);
  

  return (
    <div onSubmit={handleLogin} className="w-full py-5 mx-5 px-10 h-max bg-white rounded-3xl">
      <div className="font-bold text-4xl flex justify-center pb-1">
          ZenPay
      </div>
      <div className="font-bold text-3xl">
          Sign up
      </div>
      {error !== "You Already have an Account!! Redirecting to Sign In!" && <div className="text-3xl flex justify-center text-red-400 font-bold">{error}</div>}
      {error === "You Already have an Account!! Redirecting to Sign In!" && <div className="text-lg flex justify-center text-red-400 font-bold h-10">{error}</div>}
      
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
              setContact(num)
          }}></LabelledInputAuth>
        </div>
      </div>

      <div>
        {contact && email && otp && (
          <div className="text-center text-green-500 text-base mt-1 font-semibold">
            OTP sent successfully on your email. Please enter OTP below.
          </div>
        )}
        {contact && email && otp && (
          <div className="space-y-2 w-full flex flex-col items-center justify-center my-2">
            {/* For OTP */}
            
            <InputOTPGroup type="otp" onChangeFunc = {(e : string) => {
              setReceivedOtpCode(e)
            }}></InputOTPGroup>
            <LabelledInputAuth label="Password (min 6 characters)" placeholder="1@2#3$" type="password" onChangeFunc={(pass) => {
              setPassword(pass)
            }}></LabelledInputAuth>
            <div>
              {resendClicked && timeLeft > 0 ? (
                  <p className="text-sm">
                    Resend OTP available in{" "}
                    <span className="text-blue-500">
                      {timeLeft > 0 ? `${timeLeft}` : ""}
                    </span>
                  </p>
                  ) : (
                  <button
                    onClick={resendOTP}
                    className="text-blue-500"
                  >
                    Resend OTP
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
      {receivedOtpCode ? (
        <button
          onClick={async () => loginReqSchema.safeParse({Name, contact, email,receivedOtpCode, password}).success && await handleLogin() }
          className="w-full mt-4 bg-green-500 hover:bg-green-400 rounded-lg h-10"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() =>  {
            const nextres =  nextReqSchema.safeParse({Name, contact, email}).success;
            if(nextres && (timeLeft === 0 || firstTime))
            {
              setError("")
              handleSendOtp()
              setFirstTime(false)
            }
            else if(!nextres)
            {
              setError("Invalid Info!")
            }
          }
          }
          className="w-full mt-4 bg-green-500 hover:bg-green-400 rounded-lg h-10"
        >
          Next
        </button>
      )}
      {OTPresponse === "OTP Verified!!" ? (
        <p className="text-green-500 text-sm text-center mt-2">
          {OTPresponse}
        </p>
      ) : 
      <p className="text-red-500 text-sm text-center mt-2">
        {OTPresponse}
      </p>}

      <div className="pt-3 flex justify-center">already have an account?
        <button className="pl-1 text-blue-600 hover:underline" onClick={() => {
          redirect("/auth/signin")
        }}>
          Sign in
        </button>
      </div>
  </div>
    
  );
}