import { Container } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import getSession from "@/src/lib/getSession";
import AuthRequestForm from "@/src/features/authorization-session/AuthRequestForm";

export default async function AuthRequest() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container mt="20" maxW="2xl">
      <h1 className="text-4xl font-bold mb-3">認証リクエスト</h1>
      <hr />

      <AuthRequestForm />
    </Container>
  );
}
