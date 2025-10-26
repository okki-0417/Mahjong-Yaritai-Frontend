import UserForm from "@/src/app/users/new/components/UserForm";
import { CurrentSessionDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export default async function UserCreateSection() {
  const client = getClient();
  const { data } = await client.query({
    query: CurrentSessionDocument,
  });

  if (data.currentSession.isLoggedIn) redirect("/dashboard");

  return <UserForm />;
}
