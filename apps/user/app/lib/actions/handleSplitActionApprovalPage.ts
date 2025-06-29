"use server"

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { prisma } from "@repo/db/client";

export async function handleSplitActionApproval(formData: FormData): Promise<{ redirect: string }> {
  const session = await getServerSession(NEXT_AUTH);

  if (!session?.user?.id) {
    return { redirect: "/api/auth/signin" };
  }

  const splitId = Number(formData.get("splitId"));
  const splitBillId = Number(formData.get("splitBillId"));
  const token = String(formData.get("token"));
  const actionType = String(formData.get("actionType"));

  if (actionType === "REJECTED") {
    await prisma.splitEntry.update({
      where: { id: splitId },
      data: { status: "REJECTED" },
    });
    return { redirect: "/notificationsnpendings" };
  }

  if (actionType === "APPROVED") {
    const newToken = crypto.randomUUID();
    await prisma.$transaction(async (tx) => {
      await tx.notification.updateMany({
        where: { splitId: splitId, action: "APPROVE" },
        data: { action: "PAY" }
      });

      await tx.splitEntry.updateMany({
        where: { token: token },
        data: { token: newToken }
      });
    });
    return { redirect: `/split-bill/pay/${newToken}/${splitId}/${splitBillId}` };
  }

  throw new Error("Invalid actionType received");
}
