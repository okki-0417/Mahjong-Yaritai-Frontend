import UserForm from "@/src/app/users/new/UserForm";
import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";

export default async function UserCreateSection() {
  const session = await getSession();
  if (session?.isLoggedIn) redirect("/dashboard");

  return <UserForm />;
}
