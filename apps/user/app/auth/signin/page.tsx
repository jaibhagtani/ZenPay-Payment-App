import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../lib/auth";
import FormPageSignin from "../../../components/formpagesignin";

export default async function RegisterPage() {
  const session = await getServerSession(NEXT_AUTH);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-[#232733] min-h-screen h-full">
      <div className="lg:grid grid-cols-10 h-screen">
        {/* <div className="" 
              style={{backgroundImage: "url(https://cdn.pixabay.com/photo/2021/03/19/13/15/bill-6107551_1280.png)"}}>
        </div> */}
        <div className="hidden lg:block lg:visible bg-cover col-span-5 bg-start max-h-screen w-full flex justify-center">
          <img src="https://cdn.pixabay.com/photo/2020/08/03/10/00/credit-card-5459711_1280.png" width={1000} height={4000} />
        </div>

        <div className="w-full bg-[#232733] pt-8 col-span-5 flex justify-center h-max">
          <FormPageSignin />
        </div>
      </div>
      
    </div>
  );
}
