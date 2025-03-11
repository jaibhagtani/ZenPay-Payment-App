import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../lib/auth";
import FormPageSignup from "../../../components/formpagesignup";



export default async function RegisterPage() {
  const session = await getServerSession(NEXT_AUTH);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-pink-50 h-screen">
      <div className="lg:grid grid-cols-2">
        <div className="hidden lg:block lg:visible">
          Picture
        </div>
        <div className="min-w-fit bg-gradient-to-b to-pink-200 from-indigo-300 flex justify-center max-h-screen pt-8">
          <FormPageSignup />
        </div>
      </div>
      
    </section>
  );
}