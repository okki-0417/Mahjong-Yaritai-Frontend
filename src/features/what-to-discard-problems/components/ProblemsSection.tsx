import LoadNextPageProblemButton from "@/src/features/what-to-discard-problems/components/LoadNextPageProblemButton";
import ProblemCard from "@/src/features/what-to-discard-problems/components/ProblemCard";
import ProblemFormToggleButton from "@/src/features/what-to-discard-problems/components/ProblemFormToggleButton";
import WhatToDiscardProblemsContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/WhatToDiscardProblemsContextProvider";
import { PAGINATION_FRAGMENT } from "@/src/graphql/fragments/paginationFragment";
import { WHAT_TO_DISCARD_PROBLEM_FRAGMENT } from "@/src/graphql/fragments/whatToDiscardProblemFragment";
import { apiPageClient } from "@/src/lib/apiClients/ApiPageClient";
import { schemas } from "@/src/zodios/api";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { z } from "zod";

export default async function ProblemsSection() {
  const apiClient = await apiPageClient();
  try {
    const response = await apiClient.post("/graphql", {
      query: `
        ${WHAT_TO_DISCARD_PROBLEM_FRAGMENT}
        ${PAGINATION_FRAGMENT}

        query GetWhatToDiscardProblems() {
          whatToDiscardProblems(page: 1){
            data { ...WhatToDiscardProblemFields }
            meta {
              pagination { ...PaginationFields }
            }
          }
        }
      `,
    });

    const problems = response.data.data.whatToDiscardProblems;

    return (
      <Box>
        <VStack spacing={15}>
          {problems.data.map(
            (problem: z.infer<typeof schemas.WhatToDiscardProblem>, index: number) => (
              <ProblemCard key={index} problem={problem} />
            ),
          )}
        </VStack>

        <WhatToDiscardProblemsContextProvider initialData={problems}>
          <ProblemFormToggleButton />

          <Flex justify="center" mt={5}>
            <LoadNextPageProblemButton />
          </Flex>
        </WhatToDiscardProblemsContextProvider>
      </Box>
    );
  } catch (error) {
    return null;
  }
}
