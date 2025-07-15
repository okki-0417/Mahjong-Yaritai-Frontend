import { Box, Button, Container, Divider, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import getSession from "@/src/lib/getSession";
// import AuthRequestForm from "@/src/features/auth/request/AuthRequestForm";

export default async function AuthRequest() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container mt="20" maxW="2xl">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        認証リクエスト
      </Text>
      <Divider />

      <Box mt="8" p={8} bg="gray.100" borderRadius="md" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.600" mb={4}>
          ⚠️ 一時停止中
        </Text>
        <Text color="gray.600" mb={2}>
          セキュリティ対策のため、現在新規登録・ログイン機能を一時停止しております。
        </Text>
        <Text color="gray.500" fontSize="sm">
          ご不便をおかけして申し訳ございません。
        </Text>
        <Box mt={6}>
          <Link href="/">
            <Button colorScheme="gray">トップページに戻る</Button>
          </Link>
        </Box>
      </Box>
      {/* <Box mt="8">
        <AuthRequestForm />
      </Box> */}
    </Container>
  );
}
