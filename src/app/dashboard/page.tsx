import ErrorPage from "@/src/components/errors/ErrorPage";
import { CurrentSessionDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const client = getClient();

  const { data, error } = await client.query({ query: CurrentSessionDocument });

  if (error) return <ErrorPage message={error.message} />;
  if (data.currentSession.isLoggedIn == false) redirect("/auth/request");

  redirect("/what-to-discard-problems");

  return <div className="bg-red-200 mt-20"></div>;
}
