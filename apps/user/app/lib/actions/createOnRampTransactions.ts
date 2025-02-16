"use server"
// To use server Actions
// So F.E. knows that this should be called on the Server
import { prisma } from "@repo/db/client";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../auth";
import { getServerSession } from "next-auth";

export async function createOnRampTrans(provider : string, amount : Number)
{
    // Shouldn't take userId as an input, DO EXTRACT IT 

    // ************ Security issue ************
    const session = await getServerSession(NEXT_AUTH);
    // *********** BUG ***********
    if(!session?.user || !session?.user?.id)
    {
        redirect("/api/auth/signin");
        return {
            msg: "Unauthenticated request"
        }
    }
    // ************* IDEALLY *************
    // ******* In real world, this token will come from BANK Server *******
    // This should Ideally come from bank

    // const token = await axios.get("https://api.hdfcbank.com/getToken",
    //     amount : 
    // )

    const token = (Math.random() * 1000).toString();
    const createdEntry = await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            userId: Number(session.user.id),
            provider: provider || "",
            startTime: new Date(),
            amount: Number(amount) * 100,
            token: token
        }
    })
    return {
        msg : "Done"
    }
}