import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemCard from "../../features/what-to-discard-problems/WhatToDiscardProblemCard";
import WhatToDiscardProblemToggleForm from "../../features/what-to-discard-problems/WhatToDiscardProblemCreateFormToggleForm";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { WhatToDiscardProblem } from "../../types/models";
import { Pagination } from "../../types/Meta";
import useErrorToast from "../../hooks/useErrorToast";
import WhatToDiscardProblemLoadNextPageButton from "../../features/what-to-discard-problems/WhatToDiscardProblemLoadNextPageButton";

export type WhatToDiscardProblems = WhatToDiscardProblem[] | [];

export type FetchWhatToDiscardProblemsType = {
  what_to_discard_problems: WhatToDiscardProblems;
  meta: {
    pagination: Pagination;
  };
};

export default function WhatToDiscardProblems() {
  const [whatToDiscardProblems, setWhatToDiscardProblems] =
    useState<WhatToDiscardProblems>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);

  const errorToast = useErrorToast();

  useEffect(() => {
    const fetchWhatToDiscardProblems = async () => {
      try {
        const response = await apiClient.get("/what_to_discard_problems");
        const data: FetchWhatToDiscardProblemsType = response.data;

        setWhatToDiscardProblems(data.what_to_discard_problems);
        setNextPage(data.meta.pagination.next_page);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorToast({ error, title: "何切る問題の取得に失敗しました" });
        }
      }
    };

    fetchWhatToDiscardProblems();
  }, []);

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

      <WhatToDiscardProblemToggleForm
        whatToDiscardProblems={whatToDiscardProblems}
        setWhatToDiscardProblems={setWhatToDiscardProblems}
        setNextPage={setNextPage}
      />

      <VStack spacing={15}>
        {whatToDiscardProblems?.map((problem, index) => (
          <WhatToDiscardProblemCard key={index} problem={problem} />
        ))}
      </VStack>

      {nextPage && whatToDiscardProblems && (
        <Flex justify="center" mt={5}>
          <WhatToDiscardProblemLoadNextPageButton
            whatToDiscardProblems={whatToDiscardProblems}
            setWhatToDiscardProblems={setWhatToDiscardProblems}
            nextPage={nextPage}
            setNextPage={setNextPage}
          />
        </Flex>
      )}
    </Box>
  );
}
