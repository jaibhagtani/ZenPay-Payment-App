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
    <section className="bg-pink-50 h-screen flex items-center justify-center">
      <div className="lg:grid grid-cols-2 gap-4">
        <div className="hidden lg:block lg:visible">
          Picture
        </div>
        <div className="min-w-fit">
          <FormPage />
        </div>
      </div>
      
    </section>
  );
}