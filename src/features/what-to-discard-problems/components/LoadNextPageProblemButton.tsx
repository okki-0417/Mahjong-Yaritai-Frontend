"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
// import useErrorToast from "@/src/hooks/useErrorToast";

export default function LoadNextPageProblemButton() {
  // const { whatToDiscardProblems, setWhatToDiscardProblems } = useContext(
  //   WhatToDiscardProblemsContext
  // );

  const [nextPageLoading] = useState(false);
  // const errorToast = useErrorToast();

  // const fetchNextPageProblems = async ({
  //   nextPage,
  //   whatToDiscardProblems,
  // }: {
  //   nextPage: number | null;
  //   whatToDiscardProblems: WhatToDiscardProblems;
  // }) => {
  //   if (!nextPage) return;

  //   if (nextPageLoading) return;
  //   setNextPageLoading(true);

  //   try {
  //     const response = await apiClient.get(
  //       `what_to_discard_problems?page=${nextPage}`
  //     );
  //     const data: FetchWhatToDiscardProblemsType = response.data;

  //     setWhatToDiscardProblems([...whatToDiscardProblems, ...data.data]);

  //     setNextPage(data.meta.pagination.nextPage);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       errorToast({ error, title: "何切る問題の取得に失敗しました" });
  //     }
  //   } finally {
  //     setNextPageLoading(false);
  //   }
  // };

  return (
    <Button
      isLoading={nextPageLoading}
      // onClick={() => {}} fetchNextPageProblems({ nextPage, whatToDiscardProblems })}
    >
      さらに読み込む
    </Button>
  );
}
