import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";
import { getBalance } from "../../../lib/actions/getBalance";
import { prisma } from "@repo/db/client";
import ProfileSettingsClient from "../../../../components/cards/Account Cards/profileSettings";

async function getDetails(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      number: true,
      email: true,
      password: true,
      id: true,
      MPIN: true,
    },
  });
}

export default async function ProfilePage() {
  const session = await getServerSession(NEXT_AUTH);

  if (!session?.user) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        User not logged in!
      </div>
    );
  }

  const userDetailsRaw = await getDetails(session.user.email!);

  if (!userDetailsRaw) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        User not found in database.
      </div>
    );
  }

  const balanceData = await getBalance();

  // convert nulls to undefined for type safety
  const userDetails = {
    ...userDetailsRaw,
    name: userDetailsRaw.name ?? undefined,
    email: userDetailsRaw.email ?? undefined,
  };

  return (
    <ProfileSettingsClient
      user={{
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
      }}
      userDetails={userDetails}
      balance={Number(balanceData.balance?.amount || 0)}
    />
  );
}
