"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { handleSplitActionApproval } from "../../app/lib/actions/handleSplitActionApprovalPage";

interface Props {
  splitId: number;
  token: string;
  splitBillId: number;
}

export default function ActionButtons({ splitId, token, splitBillId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleAction(formData: FormData) {
    startTransition(async () => {
      const result = await handleSplitActionApproval(formData);
      if (result?.redirect) {
        router.push(result.redirect);
      }
    });
  }

  return (
    <form action={handleAction} className="flex flex-col sm:flex-row gap-4 justify-end">
      <input type="hidden" name="splitId" value={splitId} />
      <input type="hidden" name="splitBillId" value={splitBillId} />
      <input type="hidden" name="token" value={token} />

      <button
        type="submit"
        name="actionType"
        value="REJECTED"
        disabled={isPending}
        className="w-full sm:w-auto px-6 py-2 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
      >
        Reject
      </button>

      <button
        type="submit"
        name="actionType"
        value="APPROVED"
        disabled={isPending}
        className="w-full sm:w-auto px-6 py-2 text-sm rounded-full bg-[#a259ff] text-white hover:bg-[#8a3ee6] transition disabled:opacity-50"
      >
        Approve & Pay
      </button>
    </form>
  );
}
