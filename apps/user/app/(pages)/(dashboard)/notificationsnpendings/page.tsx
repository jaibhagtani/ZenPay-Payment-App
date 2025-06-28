// File: app/notifications/page.tsx
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../../lib/auth";
import NotificationsAndPendingsClient from "../../../../components/notificationsnpendings/NotificationsAndPendingsClient";

export default async function NotificationsAndPendingsPage() {
  const session = await getServerSession(NEXT_AUTH);

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
    return <p>Unauthenticated request</p>;
  }

  const userId = Number(session.user.id);
  // console.log(userId);
  const notifications = await prisma.notification.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  // console.log(notifications);

  return (
    <div className="flex-auto mt-20 p-6 sm:p-10 bg-[#fdf0f6] min-h-screen">
      <h1 className="text-3xl font-bold text-[#a259ff] mb-6">
        Notifications & Pendings
      </h1>
      <NotificationsAndPendingsClient initialNotifications={notifications || []} />
    </div>
  );
}
