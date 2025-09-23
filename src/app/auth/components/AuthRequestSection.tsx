import SocialLoginSection from "@/src/app/auth/components/SocialLoginSection";
import AuthRequestForm from "@/src/app/auth/request/AuthRequestForm";
import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";

export default async function AuthRequestSection() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <>
      <SocialLoginSection />
      <AuthRequestForm />
    </>
  );
}
