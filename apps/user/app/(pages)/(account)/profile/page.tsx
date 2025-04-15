import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";
import { getBalance } from "../../../lib/actions/getBalance";
import DetailsCard from "../../../../components/detailsCard";
import { prisma } from "@repo/db/client";

async function getDetails() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user) {
        throw new Error("User not logged in!");
    }

    const userDetails = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    return userDetails;
}

export default async function ProfilePage() {
    const session = await getServerSession(NEXT_AUTH);
    const user = session?.user;

    if (!user) {
        return <div className="text-center mt-10 text-red-500 font-semibold">User not logged in!</div>;
    }

    const balance = await getBalance();
    let userDetails;
    try {
        userDetails = await getDetails();
    } catch (error: any) {
        return <div className="text-center mt-10 text-red-500 font-semibold">Error: {error.message}</div>;
    }

    const userNumber = userDetails?.number;

    return (
        <div className="">
            <div className="items-start px-2 mt-20 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-10">
                Profile
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="col-span-1 md:col-span-2 lg:col-start-2 bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-center">
                        <AvatarIcon />
                    </div>
                    <div className="text-center font-bold text-xl sm:text-2xl pt-4">
                        Hey {user.name || ""},
                    </div>
                    <div className="font-bold text-center font-semibold text-base sm:text-lg pb-6 pt-2 text-gray-700">
                        Balance: ₹ {Number(balance.balance?.amount) / 100 || 0}
                    </div>
                    <div className="space-y-4">
                        <DetailsCard detailName="Username" details={user.name} to="/update/name" yesRequiredUpdation={false} />
                        <DetailsCard detailName="Contact" details={userNumber?.toString() || ""} to="" yesRequiredUpdation={false} />
                        <DetailsCard detailName="E-mail" details={user.email} to="" yesRequiredUpdation={false} />
                        <DetailsCard detailName="Password" details="*******" to="/update/password" yesRequiredUpdation={true} />
                        <DetailsCard detailName="MPIN" details="****" to="/mpin/update" yesRequiredUpdation={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AvatarIcon() {
    return (
        <div className="py-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
                fill="currentColor"
                className="w-16 h-16 sm:w-20 sm:h-20 text-purple-600"
            >
                <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
