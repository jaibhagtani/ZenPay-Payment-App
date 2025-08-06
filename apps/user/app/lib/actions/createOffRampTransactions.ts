"use server";

import { prisma } from "@repo/db/client";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../auth";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import { redisclient } from "../../../redis";

export async function createOffRampTrans(provider: string, amount: number, selectedAccount: string) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
    return { msg: "Unauthenticated request" };
  }
  // console.log(provider)
  if (provider !== "ZenBank") {
    return {
      msg: `WithDraw skipped: ${provider} is an external bank (no token flow)`,
    };
  }

  const withdrawToken = crypto.randomUUID();
  const amountInPaise = Number(amount*100)
  const createdEntry = await prisma.offRampTransaction.create({
    data: {
      status: "Processing",
      userId: Number(session.user.id),
      toBank: provider,
      startTime: new Date(),
      accountNumber: selectedAccount,
      amount: amountInPaise,
      withdrawToken: withdrawToken,
    },
    select: {
      user: {
        select: {
          id: true,
          Balance: {
            select: {
              amount: true,
              locked: true
            }
          },
          accounts: {
            where: {
              accountNumber: selectedAccount
            },
            select: {
              accessToken: true
            }
          }
        }
      },
      id: true
    }
  });

  const userId = createdEntry.user.id;
  if(!createdEntry.user.Balance[0]?.amount || createdEntry.user.Balance[0]?.amount < amountInPaise)
  {
    return {
      msg: "Insufficient Funds to Withdraw"
    }
  }

  try {
    // Pushing withdraw txns
    // 10 min
    if (!redisclient.isOpen) await redisclient.connect();
    // console.log("HERE");
    // console.log("DONE")

    const txnKey = `withdraw-txn:${withdrawToken}`;
    // console.log("HERE");
    try 
    {
      const res = await redisclient.rPush("withdrawUserQueue:transactions", withdrawToken);
      console.log(res);
    } 
    catch(err)
    {
      console.error("Failed to push to Redis queue");
    }
    // console.log("HERE1");

    await redisclient.set(
      txnKey,
      JSON.stringify({
        withdrawToken,
        userId: userId,
        amount: amountInPaise,
        toBank: provider,
        selectedAccountNumber: selectedAccount,
        accessToken: createdEntry.user.accounts[0]?.accessToken
      }),
      {
        EX: 60 * 10
      }
    );
    return {
      msg: "Withdrawal request is in Progress !!",
    };
  } catch (error) {
    console.error("Redis push error:", error);
    return {
      msg: "Failed to Request Withdrawal",
      error: error instanceof Error ? error.message : String(error)
    };
  }

}
