// app/api/auth/otp/send-otp/route.ts
import { NextResponse } from "next/server";

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  { lazyLoading: true }
);

export async function POST(req: Request) {
    const body = await req.json();
    const {phoneNumber, otp} = body
  
    try {
        const verifiedResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({
          to: `+91${phoneNumber}`,
          code: otp,
        });
      
        return NextResponse.json({
            msg : `OTP Verified Successfully!! : ${JSON.stringify(verifiedResponse)}`
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
