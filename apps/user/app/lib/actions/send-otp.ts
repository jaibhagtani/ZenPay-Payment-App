"use server"


// NOT OF ANY USE NOW .
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
    lazyLoading : true
})

export const sendOtp = async (req : NextApiRequest, res : NextApiResponse) => {

    console.log("Hello ji")
    console.log(req.body)
    const { phoneNumber } = req.body;

    try {

        const otpResponse = await client.verify
            .services(process.env.TWILIO_SERVICE_ID)
            .verifications.create({
                to: `+91${phoneNumber}`,
                channel: "sms",
            });
        NextResponse.json({ msg : `OTP Send Successfully! : ${JSON.stringify(otpResponse)}`})
    }
    catch(e)
    {
        // res.status(500).json({ msg: "Something went wrong!" });
    }
    NextResponse.json({msg : "OVER"})
}


export const verifyOtp = async (req: NextApiRequest, res: NextApiResponse) => {
 
    
    const {phoneNumber, otp} = req.body;

    try {
        const verifiedResponse = await client.verify
            .services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks.create({
                to : `+91${phoneNumber}`,
                code: otp
            });

        NextResponse.json({msg : `OTP Verified Successfully!! : ${JSON.stringify(verifiedResponse)}`})

    }
    catch(e)
    {
        // res.status(500).json({ msg: "Something went wrong!" });
    }
    NextResponse.json({msg : "OVER"})

}