import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.is_logged_in) {
    redirect("/auth/login");
  }

  redirect("/what-to-discard-problems");

  return <div className="bg-red-200"></div>;
}
