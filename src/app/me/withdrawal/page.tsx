import { Box, Container, Divider, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getSession from "@/src/lib/getSession";
import WithdrawalSummary from "@/src/app/me/withdrawal/WithdrawalSummary";
import Fallback from "@/src/components/fallbacks/Fallback";

export default async function WithdrawalSummaryPage() {
  const session = await getSession();
  if (!session?.isLoggedIn) redirect("/auth/request");

  return (
    <Container mt="20" maxW="2xl" mb="20">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        退会前の確認
      </Text>
      <Divider />

      <Box mt="8">
        <Suspense fallback={<Fallback />}>
          <WithdrawalSummary />
        </Suspense>
      </Box>
    </Container>
  );
}
