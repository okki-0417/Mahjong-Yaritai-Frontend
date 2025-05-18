import { apiClient } from "../../lib/apiClients/ApiClients";
import WhatToDiscardProblemCard from "../../features/what-to-discard-problems/WhatToDiscardProblemCard";
import WhatToDiscardProblemToggleForm from "../../features/what-to-discard-problems/WhatToDiscardProblemCreateFormToggleForm";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { WhatToDiscardProblem } from "../../types/ApiData";
import { Pagination } from "../../types/Meta";
import WhatToDiscardProblemLoadNextPageButton from "../../features/what-to-discard-problems/WhatToDiscardProblemLoadNextPageButton";
import WhatToDiscardProblemsContextProvider from "../../features/what-to-discard-problems/contexts/WhatToDiscardProblemsContextProvider";

export type WhatToDiscardProblems = WhatToDiscardProblem[] | [];

export type FetchWhatToDiscardProblemsType = {
  what_to_discard_problems: WhatToDiscardProblems;
  meta: {
    pagination: Pagination;
  };
};

export default async function WhatToDiscardProblems() {
  try {
    const response = await apiClient.get("/what_to_discard_problems");
    const data: FetchWhatToDiscardProblemsType = response.data;

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

        <WhatToDiscardProblemsContextProvider initialData={data}>
          <WhatToDiscardProblemToggleForm />
        </WhatToDiscardProblemsContextProvider>

        <VStack spacing={15}>
          {data.what_to_discard_problems.map((problem, index) => (
            <WhatToDiscardProblemCard key={index} problem={problem} />
          ))}
        </VStack>

        <WhatToDiscardProblemsContextProvider initialData={data}>
          <Flex justify="center" mt={5}>
            <WhatToDiscardProblemLoadNextPageButton />
          </Flex>
        </WhatToDiscardProblemsContextProvider>
      </Box>
    );
  } catch (error) {
    return <div className="mt-40">sorry</div>;
  }
}
