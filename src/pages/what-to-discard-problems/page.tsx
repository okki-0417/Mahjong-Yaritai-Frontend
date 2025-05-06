import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemCard from "../../features/what-to-discard-problems/WhatToDiscardProblemCard";
import WhatToDiscardProblemToggleForm from "../../features/what-to-discard-problems/WhatToDiscardProblemCreateFormToggleForm";
import { Button, Flex, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";

export type WhatToDiscardProblem = {
  id: number;
  round: number;
  turn: number;
  wind: number;
  point_east: number;
  point_south: number;
  point_west: number;
  point_north: number;

  dora_id: number;
  tsumo_id: number;

  hand_ids: number[];

  comments_count: number;
  votes_count: number;

  created_at: string;
  updated_at: string;

  user: {
    id: number;
    name: string;
    avatar_url: string;
  };

  pagination: {
    next_page: number | null;
  };
};

export default function WhatToDiscardProblems() {
  const [whatToDiscardProblems, setWhatToDiscardProblems] = useState<
    WhatToDiscardProblem[]
  >([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [nextPageLoading, setNextPageLoading] = useState(false);

  const toast = useToast();
  useEffect(() => {
    const fetchWhatToDiscardProblems = async () => {
      try {
        const response = await apiClient.get("/what_to_discard_problems");

        setWhatToDiscardProblems(response.data.what_to_discard_problems.data);
        setNextPage(
          response.data.what_to_discard_problems.pagination.next_page
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: "失敗",
            description: `${error.status}: ${error.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };

    fetchWhatToDiscardProblems();
  }, []);

  const loadNextPage = async ({
    nextPage,
    whatToDiscardProblems,
  }: {
    nextPage: number;
    whatToDiscardProblems: WhatToDiscardProblem[];
  }) => {
    if (!nextPage) return;

    if (nextPageLoading) return;
    setNextPageLoading(true);

    try {
      const response = await apiClient.get(
        `what_to_discard_problems?page=${nextPage}`
      );

      setWhatToDiscardProblems([
        ...whatToDiscardProblems,
        ...response.data.what_to_discard_problems.data,
      ]);

      setNextPage(response.data.what_to_discard_problems.pagination.next_page);
    } catch (error) {
    } finally {
      setNextPageLoading(false);
    }
  };

  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-3xl mt-12 font-bold">何切る問題</h1>
      <hr className="mt-3" />

      <p className="mt-6 text-lg leading-relaxed flex flex-col gap-2">
        <span>
          ここでは様々な状況での最適な選択を考えながら、他のプレイヤーと意見を交換したり、自分の判断力を磨いたりできます。
        </span>
        <span>
          麻雀の奥深さを学びながら、より良い打牌選択を身につけましょう。
        </span>
      </p>

      <WhatToDiscardProblemToggleForm
        whatToDiscardProblems={whatToDiscardProblems}
        setWhatToDiscardProblems={setWhatToDiscardProblems}
        setNextPage={setNextPage}
      />

      <VStack spacing={15}>
        {whatToDiscardProblems.map((problem, index) => (
          <WhatToDiscardProblemCard key={index} problem={problem} />
        ))}
      </VStack>

      {nextPage && (
        <Flex justify="center" mt={5}>
          <Button
            onClick={() => loadNextPage({ nextPage, whatToDiscardProblems })}
          >
            さらに読み込む
          </Button>
        </Flex>
      )}
    </div>
  );
}
