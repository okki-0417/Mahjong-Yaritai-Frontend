import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.isLoggedIn) redirect("/auth/request");

  redirect("/what-to-discard-problems");

  return <div className="bg-red-200 mt-20"></div>;
}
