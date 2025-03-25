"use client";

import { Card } from "@repo/ui/card";
import { InputOTPGroup } from "./inputotpgroup";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface MpinCardInput {
  title: string;
  type: string;
}

export function MpinCard({ title, type }: MpinCardInput) {
    const [timerRunning, setTimerRunning] = useState(false);
    const [otp, setOtp] = useState(false);
    const [receivedOtpCode, setReceivedOtpCode] = useState("");
    const [resendClicked, setResendClicked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const session = useSession();
    const [error, setError] = useState("");
    const [firstTime, setFirstTime] = useState(true);
    const [mpin, setmpin] = useState("");
    const [confirmedmpin, setConfirmedmpin] = useState("");
    const [OTPresponse, setOTPresponse] = useState("")
    const startTimer = () => {
        setTimeLeft(60);
        setTimerRunning(true);
    };

  
  const handleVerify = async () => {
    if (!session.data?.user) 
    {
        setError("User not logged in!")
        return console.error("User not logged in!");
    }
    const res = await fetch("http://localhost:3000/api/auth/otp/verify-otp",
      {
        method: "POST",
        headers: {
           'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: session.data?.user?.email,
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
    return res.status;
  }

  const resendOTP = () => {
    setTimerRunning(false);
    startTimer();
    setResendClicked(true);
    handleSendOtp();
  };

  useEffect(() => {
    let timer: any;
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

  const handleSendOtp = async () => {

    if (!session.data?.user) 
    {
        setError("User not logged in!")
        return console.error("User not logged in!");
    }
    startTimer();
    setResendClicked(true);
    const res = await fetch("/api/auth/otp/send-otp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.data?.user?.email,
        username: session.data?.user?.name,
      }),
    });
    if (res.status === 200) {
      setOtp(true);
    } else {
      setOtp(false);
    }
  };

  async function setMpintoDB() {

    if (!session.data?.user) 
    {
        setError("User not logged in!")
        return console.error("User not logged in!");
    }
    const res = await fetch("/api/mpin/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.data.user.email,
        mpin: mpin,
      }),
    });
    if (res.ok) {
      redirect("/dashboard");
    } 
    else {
      const data = await res.json();
      console.error(data.message);
    }
  }

  return (
    <div className="min-h-fit mx-5">
      <div className="pt-2"></div>
      <Card title={title}>
        {type === "set" ? (
          <div className="font-2xl font-semibold px-4 py-3">
            Let your digits defend your dollars—set your MPIN now!
          </div>
        ) : (
          <div className="font-2xl font-semibold px-3 py-2">
            New digits, new strength—update your MPIN and stay ahead!
          </div>
        )}
        {error && <div className="font-sm text-red-500 font-semibold flex justify-center">{error}</div>}
        {mpin && confirmedmpin && mpin !== confirmedmpin && (
          <div className="pt-1 font-semibold flex justify-center font-xl text-red-500 font-sm">
            Incorrect MPIN
          </div>
        )}
        <div className="font-xl font-bold my-3 py-1 px-5 border-b border-sm">
          Enter MPIN
        </div>
        <div className="space-y-2 w-full flex flex-col items-center justify-center py-5">
          <InputOTPGroup
            type="password"
            onChangeFunc={(e: string) => {
              setmpin(e);
            }}
          />
        </div>
        <div className="font-xl font-bold my-3 px-5 py-1 border-b border-sm">
          Confirm MPIN
        </div>
        <div className="space-y-2 w-full flex flex-col items-center justify-center my-2 py-5">
          <InputOTPGroup
            type="password"
            onChangeFunc={(e: string) => {
              setConfirmedmpin(e);
            }}
          />
        </div>
        <div className="flex justify-center py-3">
          {type === "set" ? (
            <Button
              onClickFunc={async () => {
                await setMpintoDB();
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              onClickFunc={async () => {
                if (mpin && confirmedmpin && mpin === confirmedmpin) {
                  setError("");
                  handleSendOtp();
                  setFirstTime(false);
                  setOtp(true)
                }
                else
                {
                    if(session.data?.user)
                    {
                        setError("Invalid MPIN")
                    }
                    else 
                    {
                        setError("User not logged in!")
                    }
                }
              }}
            >
              Next
            </Button>
          )}
        </div>
        <div>
          {type === "update" &&
            mpin &&
            confirmedmpin &&
            mpin === confirmedmpin && otp && (
              <div className="text-center text-green-500 text-base mt-1 font-semibold">
                OTP sent successfully on your email. Please enter OTP below.
              </div>
            )}
          {type === "update" &&
            mpin &&
            confirmedmpin &&
            mpin === confirmedmpin  && otp && (
              <div className="space-y-2 w-full flex flex-col items-center justify-center my-2">
                <InputOTPGroup
                  type="otp"
                  onChangeFunc={(e: string) => {
                    setReceivedOtpCode(e);
                  }}
                />
                <div>
                  {resendClicked && timeLeft > 0 ? (
                    <p className="text-sm">
                      Resend OTP available in{" "}
                      <span className="text-blue-500">
                        {timeLeft > 0 ? `${timeLeft}` : ""}
                      </span>
                    </p>
                  ) : (
                    <button onClick={resendOTP} className="text-blue-500">
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}
        </div>
        {OTPresponse === "OTP Verified!!" ? (
            <p className="text-green-500 text-sm text-center mt-2">
            {OTPresponse}
            </p>
        ) : 
        <p className="text-red-500 text-sm text-center mt-2">
            {OTPresponse}
        </p>}
        {type === "update" && mpin &&
            confirmedmpin &&
            mpin === confirmedmpin && otp ? 
            <button
              onClick={async () => {
                
                if(mpin && confirmedmpin && mpin === confirmedmpin && session)
                {
                    const res = await handleVerify();

                    if(res === 200)
                    {
                        setOTPresponse("OTP Verified!!")
                    }
                    else if(res === 400)
                    {
                        setOTPresponse("Incorrect OTP. Please try again.")
                    }
                    else 
                    {
                        setOTPresponse("Something went Wrong. Please try again.")
                    }
                }
            }}
              className="w-full mt-4 bg-green-500 hover:bg-green-400 rounded-lg h-10 my-6"
            >
              Update MPIN
            </button> : ""
        }
      </Card>
    </div>
  );
}
