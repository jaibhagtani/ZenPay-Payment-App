// app/api/auth/otp/send-otp/route.ts
import Redis from "ioredis";
import { NextResponse } from "next/server";

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  { lazyLoading: true }
);

const redisclient = new Redis(`${process.env.REDIS_URL}`);
export async function POST(req: Request) {
    const body = await req.json();
    const {email, otp} = body
  
    try {
        // const verifiedResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        // .verificationChecks.create({
        //   to: `+91${email}`,
        //   code: otp,
        // });
        const redisOTP = await redisclient.get(email)
        if(otp === redisOTP)
        {
          redisclient.del(email);
          return NextResponse.json({
              msg : `OTP Verified Successfully!!`
          })
        }
        return NextResponse.json({
            msg : "Invalid OTP"
        }, 
      {
        status: 400
      })
    }
    catch (error) {
        console.error("Invalid OTP:", error);

    return NextResponse.json(
    { msg: "Something went wrong!" },
    { status: 500 }
    );
  }
}
