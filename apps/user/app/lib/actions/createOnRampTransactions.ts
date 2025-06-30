"use server"
import { prisma } from "@repo/db/client";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../auth";
import { getServerSession } from "next-auth";

export async function createOnRampTrans(provider: string, amount: Number) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user || !session?.user?.id) {
        redirect("/api/auth/signin");
        return {
            msg: "Unauthenticated request"
        }
    }

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
    });

    return {
        msg: "Deposit initiated & notification created"
    }
}
