import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../../../../../../lib/auth";

interface Props {
  params: { token: string, splitId: number };
}

export default async function SplitBillPayPage({ params }: Props) {
  console.log(params);
  const session = await getServerSession(NEXT_AUTH);
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="mt-20">
      hello hi
    </div>
  )
};


