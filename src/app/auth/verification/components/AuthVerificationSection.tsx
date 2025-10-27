import AuthVerificationForm from "@/src/app/auth/verification/components/AuthVerificationForm";
import ErrorPage from "@/src/components/errors/ErrorPage";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export default async function AuthVerificationSection() {
  const client = getClient();
  const { data, error } = await client.query({ query: CurrentUserProfileDocument });

  if (error) return <ErrorPage message={error.message} />;

  if (data?.currentSession?.isLoggedIn) redirect("/what-to-discard-problems");

  return <AuthVerificationForm />;
}
