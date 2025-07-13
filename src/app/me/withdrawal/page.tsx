import { Box, Container, Divider, Spinner, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getSession from "@/src/lib/getSession";
import WithdrawalSummary from "@/src/features/me/withdrawal/WithdrawalSummary";

export default async function WithdrawalSummaryPage() {
  const session = await getSession();
  if (!session?.is_logged_in) redirect("/auth/request");

  return (
    <Container mt="20" maxW="2xl">
      <Text fontSize="4xl" fontWeight="bold">
        退会前の確認
      </Text>
      <Divider />

      <Box mt="8">
        <Suspense
          fallback={
            <Box textAlign="center" py={8}>
              <Spinner size="lg" />
              <Text mt={4}>読み込み中...</Text>
            </Box>
          }>
          <WithdrawalSummary />
        </Suspense>
      </Box>
    </Container>
  );
}
