import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../../lib/auth";
import { getBalance } from "../../../lib/actions/getBalance";
import DetailsCard from "../../../../components/detailsCard";


export default async function() {
    const session = await getServerSession(NEXT_AUTH);
    const user = session?.user;
    // console.log(user)
    const balance = await getBalance();
    return (
        <div className="lg:max-w-screen">
            <div className="text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text pt-8 mb-8 font-bold px-4 mt-12">
                Profile
            </div>
            <div className="max-w-72 grid lg:grid-cols-4 gap-4 min-w-max max-w-screen">
                <div className="px-2 my-8 bg-white min-w-60 max-w-full mr-10 flex justify-center rounded-lg lg:shadow-xl min-w-max max-w-screen justify-center col-span-2 col-start-2">
                    <div className="max-w-84 lg:max-w-full">
                        <div className="flex justify-center">
                            <AvatarIcon></AvatarIcon>
                        </div>
                        <div className="flex justify-center font-bold text-2xl pt-3">
                            Hey {user.name},
                        </div>
                        <div className="flex justify-center font-bold text-lg pb-6 pt-2">
                            Balance =  {Number(balance.balance?.amount)/100 || 0}
                        </div>
                        <div className="font-semibold">
                            <DetailsCard detailName="Username" details={user.name} to="/update/name" yesRequiredUpdation ={false}></DetailsCard>
                            {/* Add contact */}
                            <DetailsCard detailName="Contact" details={user.number} to="" yesRequiredUpdation ={false}></DetailsCard>
                            <DetailsCard detailName="E-mail" details={user.email} to="" yesRequiredUpdation ={false} ></DetailsCard>
                            <DetailsCard detailName="password" details={"*******"} to="/update/password" yesRequiredUpdation={true}></DetailsCard>
                            <DetailsCard detailName="MPIN" details={"****"} to="/mpin/update" yesRequiredUpdation ={true}></DetailsCard>
                        </div>
                        {/* <div className="font-sm font-bold">Current Balance: {balance.amount || 0}</div> */}
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

function AvatarIcon()
{
    return (
        <div className="py-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" className="w-20 h-20">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
        </div>
    )
}


