import { redirect } from "next/navigation";
import { Box, Container } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import getSession from "@/src/lib/getSession";
import LoginForm from "@/src/features/auth/login/LoginForm";

export default async function Login() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container maxH="xl" mt={40}>
      <h1 className="lg:text-4xl text-2xl font-semibold mb-3">ログイン</h1>
      <hr />

      <LoginForm />

      <Box mt={6}>
        <Link
          href="authorization-session"
          className="text-blue-300 hover:text-blue-200 hover:underline flex items-center"
        >
          新規会員登録はこちら
          <FaAngleRight />
        </Link>
      </Box>
    </Container>
  );
}
