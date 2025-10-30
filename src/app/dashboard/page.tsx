import ErrorPage from "@/src/components/errors/ErrorPage";
import { CurrentSessionDocument, CurrentSessionQuery } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const client = getClient();

  let sessionData: CurrentSessionQuery;

  try {
    const { data } = await client.query({ query: CurrentSessionDocument });
    sessionData = data;
  } catch (error) {
    return <ErrorPage message={error.message} />;
  }

  if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");
  redirect("/what-to-discard-problems");
}
