import ClientProblemSection from "@/src/features/what-to-discard-problems/components/ClientProblemSection";
import SessionContextProvider from "@/src/features/what-to-discard-problems/context-providers/SessionContextProvider";
import createApiPageClient from "@/src/lib/api/server";
import { Box, Text, VStack } from "@chakra-ui/react";

export default async function ProblemsSection() {
  const apiPageClient = await createApiPageClient();

  try {
    const problems_response = await apiPageClient.getWhatToDiscardProblems({
      queries: { limit: String(20) },
    });

    const session_response = await apiPageClient.getSession();

    return (
      <SessionContextProvider session={session_response.session}>
        <ClientProblemSection
          initialProblems={problems_response.what_to_discard_problems}
          initialCursor={problems_response.meta.cursor}
        />
      </SessionContextProvider>
    );
  } catch (error) {
    return (
      <Box textAlign="center" py={16}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            エラーが発生しました
          </Text>
          <Text fontSize="md">
            何切る問題の読み込み中にエラーが発生しました。しばらく時間をおいてから再度お試しください。
          </Text>
          <Text>{error.message}</Text>
        </VStack>
      </Box>
    );
  }
}
