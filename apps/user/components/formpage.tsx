"use client"
import { useState } from "react";
import LabelledInputAuth from "@repo/ui/labelledinputauth"
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"


async function onSubmit({phoneNumber, password} : any)
{
    const router = useRouter();
    try {
        const response: any = await signIn("credentials", {
        phoneNumber,
          password,
          redirect: false,
        });
        if (!response?.error) {
          router.push("/");
          router.refresh();
        }
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Process response here
        console.log("Login Successful", response);
      } catch (error: any) {
        console.error("Login Failed:", error);
      }
}

export default function FormPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className="w-full min-w-96 bg-white py-10 px-5 rounded-2xl">
        <div className="py-6 font-bold text-4xl">
            Sign in
        </div>
        <div>
            <div className="my-8 ">
                <LabelledInputAuth label="Phone Number" placeholder="1231231230" onChangeFunc={() => {
                    setPhoneNumber
                }}></LabelledInputAuth>
            </div>
            
            <div className="my-8">
                <LabelledInputAuth label="Password" placeholder="1@3/4" onChangeFunc={() => {
                    setPassword
                }}></LabelledInputAuth>
            </div>
            
            <div className="mt-6 flex justify-center">
                <Button onClickFunc={() => {
                    onSubmit({phoneNumber, password})
                }}>Sign in</Button>
            </div>
        </div>
    </div>
  );
}