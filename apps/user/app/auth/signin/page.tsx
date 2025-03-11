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
    <div className="bg-pink-50 h-screen">
      <div className="lg:grid grid-cols-2">
        <div className="hidden lg:block lg:visible h-screen w-full">
          <div className="bg-[url(https://cdn.pixabay.com/photo/2021/03/19/13/15/bill-6107551_1280.png)] min-w-fit h-screen" ></div>
        </div>
        <div className="min-w-fit bg-gradient-to-b to-pink-200 from-indigo-300 flex justify-center h-screen pt-8">
          <FormPageSignin />
        </div>
        
      </div>
      
    </div>
  );
}