import LogoutButton from "@/src/components/LogoutButton";
import getSession from "@/src/lib/getSession";

export default async function LogoutSection() {
  const session = await getSession();
  if (!session) return null;

  return <LogoutButton />;
}
