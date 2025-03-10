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
        <div className="min-w-fit bg-indigo-200 flex justify-center min-h-screen">
          <FormPage />
        </div>
      </div>
      
    </section>
  );
}