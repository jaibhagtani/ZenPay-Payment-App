"use server";

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { prisma } from "@repo/db/client";
import { redirect } from "next/navigation";
import crypto from "crypto";

interface CreateSplitProps {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  amount: number;
  description?: string;
  paid: boolean;
}

export async function CreateSplit(
  newGroup: CreateSplitProps[],
  totalAmt: number,
  userDesc: string
) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
    return { msg: "Unauthenticated request" };
  }

  const ownerId = session.user.id;

  const phoneNumbers = newGroup.map((e) => e.phoneNumber);

  // Duplicate phone number check
  const uniquePhoneNumbers = new Set(phoneNumbers);
  if (uniquePhoneNumbers.size !== phoneNumbers.length) {
    return {
      msg: "Duplicate phone numbers are not allowed in the split.",
    };
  }

  // Check karna hai ki saare phoneNumbers registered users ke hai
  const existingUsers = await prisma.user.findMany({
    where: { number: { in: phoneNumbers } },
    select: { number: true, id: true },
  });

  const existingNumberSet = new Set(existingUsers.map((u) => u.number));
  const missingNumbers = phoneNumbers.filter((n) => !existingNumberSet.has(n));

  if (missingNumbers.length > 0) {
    return {
      msg: `These phone numbers are not registered: ${missingNumbers.join(", ")}`,
    };
  }

  // Check karna hai ki user khud na ho split me
  const includesSelf = existingUsers.some((u) => u.id === Number(ownerId));
  if (includesSelf) {
    return {
      msg: "You cannot include yourself in the split bill.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const splitBill = await tx.splitBill.create({
        data: {
          createdAt: new Date(Date.now()),
          createdByUserId: ownerId,
          totalAmount: totalAmt,
          description: userDesc || null,
        },
      });

      const splitEntries = newGroup.map((e) => {
        const user = existingUsers.find((u) => u.number === e.phoneNumber);
        return {
          userId: user?.id || 0,
          name: e.name,
          email: e.email,
          phone: e.phoneNumber,
          amount: e.amount,
          description: e.description || null,
          status: "PENDING" as const, // Yaha pe enum ka dhyan rakhna
          token: crypto.randomUUID(),
          tokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 din ka expiry
          paidAt: e.paid ? new Date() : null,
          splitBillId: splitBill.id,
        };
      });

      await tx.splitEntry.createMany({ data: splitEntries });
    });

    return { msg: "Split successfully created" };
  } catch (e) {
    console.error("CreateSplit error:", e);
    return { msg: "Something went wrong while creating split" };
  }
  finally{
    console.error("CreateSplit error:");
    return { msg: "Something went wrong while creating split" };
  }
}
