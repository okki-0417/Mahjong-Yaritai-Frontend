import AuthVerificationForm from "@/src/app/auth/verification/AuthVerificationForm";
import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";

export default async function AuthVerificationSection() {
  const session = await getSession();
  if (!session) redirect("/dashboard");

  return <AuthVerificationForm />;
}
