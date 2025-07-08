import ProblemCard from "@/src/features/what-to-discard-problems/components/ProblemCard";
import createApiPageClient from "@/src/lib/apiClients/ApiPageClient";
import { Box, VStack } from "@chakra-ui/react";

export default async function ProblemsSection() {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getWhatToDiscardProblems();
    const data = response.what_to_discard_problems;

    return (
      <Box>
        <VStack gap="16">
          {data.map((problem, index: number) => (
            <ProblemCard key={index} problem={problem} />
          ))}
        </VStack>

        {/* <WhatToDiscardProblemsContextProvider initialData={data}>
          <ProblemFormToggleButton />

          <Flex justify="center" mt={5}>
            <LoadNextPageProblemButton />
          </Flex>
        </WhatToDiscardProblemsContextProvider> */}
      </Box>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
