import { Box, Container } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";
import getSession from "@/src/lib/getSession";
import AuthorizationSessionForm from "@/src/features/authorization-session/AuthorizationSessionForm";

export default async function AuthorizationSession() {
  const session = await getSession();
  if (session?.is_logged_in) {redirect("/dashboard");}

  return (
    <Container mt={40} maxW="2xl">
      <h1 className="lg:text-4xl text-2xl font-semibold mb-3">ユーザー登録</h1>
      <hr />

      <AuthorizationSessionForm />

      <Box mt={4}>
        <Link
          href="/auth/login"
          className="text-blue-300 hover:text-blue-200 hover:underline flex items-center w-fit"
        >
          ログインはこちら
          <FaAngleRight size={16} />
        </Link>
      </Box>
    </Container>
  );
}
