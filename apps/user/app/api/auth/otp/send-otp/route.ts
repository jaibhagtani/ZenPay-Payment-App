// app/api/auth/otp/send-otp/route.ts
import { NextResponse } from "next/server";

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  { lazyLoading: true }
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    // Call Twilio API
    const otpResponse = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({
        to: `+91${phoneNumber}`,
        channel: "sms",
      });

    return NextResponse.json({
      msg: "OTP Sent Successfully!",
      data: otpResponse,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    // Return an error response with status 500
    return NextResponse.json(
      { msg: "Something went wrong!" },
      { status: 500 }
    );
  }
}
