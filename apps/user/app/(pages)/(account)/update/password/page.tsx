import { MpinCard } from "../../../../../components/MpinCard";
import { UpdatePassword } from "../../../../../components/updatePassCard";



export default function() 
{

    return (
        <div className="flex justify-center mt-20 lg:mt-20">
            <div>
                <div className="mt-10 text-3xl sm:text-4xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 inline-block text-transparent bg-clip-text font-bold mb-10">
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