import ClientProblemSection from "@/src/features/what-to-discard-problems/components/ClientProblemSection";
import createApiPageClient from "@/src/lib/apiClients/ApiPageClient";
import { Box, Text, VStack } from "@chakra-ui/react";

export default async function ProblemsSection() {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getWhatToDiscardProblems();

    return <ClientProblemSection initialProblems={response.what_to_discard_problems} />;
  } catch (_) {
    return (
      <Box textAlign="center" py={16}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            エラーが発生しました
          </Text>
          <Text fontSize="md" color="gray.600">
            何切る問題の読み込み中にエラーが発生しました。しばらく時間をおいてから再度お試しください。
          </Text>
        </VStack>
      </Box>
    );
  }
}
