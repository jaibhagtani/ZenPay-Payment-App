import { MpinCard } from "../../../../../components/MpinCard";
import { UpdatePassword } from "../../../../../components/updatePassCard";



export default function() 
{

    return (
        <div className="flex justify-center lg:mt-20">
            <div>
                <div className="text-3xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text mb-8 font-bold px-4 mt-8">
                    Update Password
                </div>
                <div className="mx-10 grid grid-cols-1 gap-10 lg:grid-cols-6 p-2 gap-4">
                    <div className="bg-white min-w-fit lg:min-w-full rounded-3xl col-start-2 col-end-5">
                        <UpdatePassword title="UPDATE PASSWORD"></UpdatePassword>
                        {/* OTP */}
                    </div>
                </div>
            </div>
            
        </div>
    )
}