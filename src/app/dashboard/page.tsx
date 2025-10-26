import { CurrentSessionDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const client = getClient();

  const { data: sessionData } = await client.query({ query: CurrentSessionDocument });
  if (!sessionData.currentSession.isLoggedIn) redirect("/auth/request");

  redirect("/what-to-discard-problems");

  return <div className="bg-red-200 mt-20"></div>;
}
