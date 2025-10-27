import SocialLoginSection from "@/src/app/auth/request/components/SocialLoginSection";
import AuthRequestForm from "@/src/app/auth/request/components/AuthRequestForm";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";
import ErrorPage from "@/src/components/errors/ErrorPage";

export default async function AuthRequestSection() {
  const client = getClient();
  const { data, error } = await client.query({ query: CurrentUserProfileDocument });

  if (error) return <ErrorPage message={error.message} />;

  if (data.currentSession.isLoggedIn) redirect("/what-to-discard-problems");

  return (
    <>
      <SocialLoginSection />
      <AuthRequestForm />
    </>
  );
}
