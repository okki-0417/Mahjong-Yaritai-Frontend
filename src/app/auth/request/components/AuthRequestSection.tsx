import SocialLoginSection from "@/src/app/auth/request/components/SocialLoginSection";
import AuthRequestForm from "@/src/app/auth/request/components/AuthRequestForm";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export default async function AuthRequestSection() {
  const client = getClient();
  const { data } = await client.query({ query: CurrentUserProfileDocument });

  if (data.currentSession.isLoggedIn == false) redirect("/auth/request");

  return (
    <>
      <SocialLoginSection />
      <AuthRequestForm />
    </>
  );
}
