import AuthVerificationForm from "@/src/app/auth/verification/components/AuthVerificationForm";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export default async function AuthVerificationSection() {
  const client = getClient();
  const { data } = await client.query({ query: CurrentUserProfileDocument });

  if (data.currentSession.isLoggedIn == false) redirect("/auth/request");

  return <AuthVerificationForm />;
}
