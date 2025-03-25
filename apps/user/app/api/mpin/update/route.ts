import { NextResponse } from "next/server";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";

export async function POST(request: Request) {
    const session = await getServerSession(NEXT_AUTH);
    if(!session)
    {
        return NextResponse.json({
            msg : "User not Loggedin!"
        })
    }


    try {
        const { email, mpin } = await request.json();
        // Validate email and mpin here as needed

        const hashedMpin = await bcrypt.hash(mpin, 10);
        const user = await prisma.user.update({
            where: {
                id: session.user.id,
                email: email,
            },
            data: {
                MPIN: hashedMpin,
            },
        });
        return NextResponse.json({ message: "MPIN updated successfully", user });
    } catch (error) {
        return NextResponse.json(
        { message: "Error occurred during MPIN update", error },
        { status: 500 }
        );
    }
}

    
