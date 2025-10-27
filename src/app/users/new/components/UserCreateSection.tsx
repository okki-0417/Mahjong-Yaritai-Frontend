import UserForm from "@/src/app/users/new/components/UserForm";
import ErrorPage from "@/src/components/errors/ErrorPage";
import { CurrentSessionDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export default async function UserCreateSection() {
  const client = getClient();
  const { data, error } = await client.query({
    query: CurrentSessionDocument,
  });

  if (error) return <ErrorPage message={error.message} />;
  if (data.currentSession.isLoggedIn) redirect("/dashboard");

  return <UserForm />;
}
