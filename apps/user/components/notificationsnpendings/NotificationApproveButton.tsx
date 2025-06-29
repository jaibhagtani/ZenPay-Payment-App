"use client";
import { useRouter } from "next/navigation";
import { getRouterDetails } from "../../app/lib/actions/getRouteApprove";

export function NotificationsApproveButton({
  id,
  action,
  status
}: {
  id: number,
  action: "APPROVE" | "PAY",
  status?: string
}) {
  const router = useRouter();

  const handleClick = async () => {
    if (status === "REJECTED") return;
    const routerDetails = await getRouterDetails({ id, action });
    if (routerDetails) {
      const path = action === "APPROVE" ? "approve" : "pay";
      router.push(`/split-bill/${path}/${routerDetails.token}/${routerDetails.splitId}/${routerDetails.splitBillId}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-sm px-4 py-2 rounded-full font-medium transition duration-200 ${
        action === "APPROVE" ? "bg-[#a259ff] text-white" : "bg-[#f14668] text-white"
      } hover:opacity-90`}
    >
      {action === "APPROVE" ? "Approve" : "Pay Now"}
    </button>
  );
}
