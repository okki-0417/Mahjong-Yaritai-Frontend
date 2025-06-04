import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { apiPageClient } from "@/src/lib/apiClients/ApiPageClient";
import ProblemCard from "@/src/features/what-to-discard-problems/components/ProblemCard";
import ProblemFormToggleButton from "@/src/features/what-to-discard-problems/components/ProblemFormToggleButton";
import LoadNextPageProblemButton from "@/src/features/what-to-discard-problems/components/LoadNextPageProblemButton";
import { Pagination } from "@/src/types/Meta";
import { WhatToDiscardProblem } from "@/src/types/ApiData";
import { WHAT_TO_DISCARD_PROBLEM_FRAGMENT } from "@/src/graphql/fragments/whatToDiscardProblemFragment";
import { PAGINATION_FRAGMENT } from "@/src/graphql/fragments/paginationFragment";
import WhatToDiscardProblemsContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/WhatToDiscardProblemsContextProvider";

export type WhatToDiscardProblems = WhatToDiscardProblem[] | [];

export type FetchWhatToDiscardProblemsType = {
  data: WhatToDiscardProblems;
  meta: {
    pagination: Pagination;
  };
};

export default async function WhatToDiscardProblems() {
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

    // console.log(response.data.data.whatToDiscardProblems);

    const problems: FetchWhatToDiscardProblemsType =
      response.data.data.whatToDiscardProblems;

    return (
      <Box className="max-w-4xl lg:mx-auto mx-4 mt-36">
        <h1 className="lg:text-5xl text-3xl mt-12 font-bold">何切る問題</h1>
        <hr className="mt-3" />

        <VStack mt="6" alignItems="start">
          <Text fontSize="lg">
            ここでは様々な状況での最適な選択を考えながら、他のプレイヤーと意見を交換したり、自分の判断力を磨いたりできます。
          </Text>
          <Text fontSize="lg">
            麻雀の奥深さを学びながら、より良い打牌選択を身につけましょう。
          </Text>
        </VStack>

        <VStack spacing={15}>
          {problems.data.map((problem, index) => (
            <ProblemCard key={index} problem={problem} />
          ))}
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
    console.error(error);
    return <div className="mt-40">fetchに失敗</div>;
  }
}
