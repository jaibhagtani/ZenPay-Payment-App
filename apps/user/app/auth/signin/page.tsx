import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FormPage from "../../../components/formpage";
import { NEXT_AUTH } from "../../lib/auth";



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
        <div className="min-w-fit bg-gradient-to-b to-pink-100 from-purple-300 flex justify-center min-h-screen pt-10">
          <FormPage />
        </div>
      </div>
      
    </section>
  );
}