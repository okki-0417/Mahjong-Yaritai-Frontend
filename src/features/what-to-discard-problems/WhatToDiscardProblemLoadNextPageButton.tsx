"use client";

import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import {
  FetchWhatToDiscardProblemsType,
  WhatToDiscardProblems,
} from "../../app/what-to-discard-problems/page";
import { apiClient } from "../../lib/apiClients/ApiClients";
import axios from "axios";
import useErrorToast from "../../hooks/useErrorToast";
import { WhatToDiscardProblemsContext } from "./contexts/WhatToDiscardProblemsContextProvider";

export default function WhatToDiscardProblemLoadNextPageButton() {
  const {
    whatToDiscardProblems,
    setWhatToDiscardProblems,
    nextPage,
    setNextPage,
  } = useContext(WhatToDiscardProblemsContext);

  const [nextPageLoading, setNextPageLoading] = useState(false);
  const errorToast = useErrorToast();

  const fetchNextPageProblems = async ({
    nextPage,
    whatToDiscardProblems,
  }: {
    nextPage: number | null;
    whatToDiscardProblems: WhatToDiscardProblems;
  }) => {
    if (!nextPage) return;

    if (nextPageLoading) return;
    setNextPageLoading(true);

    try {
      const response = await apiClient.get(
        `what_to_discard_problems?page=${nextPage}`
      );
      const data: FetchWhatToDiscardProblemsType = response.data;

      setWhatToDiscardProblems([
        ...whatToDiscardProblems,
        ...data.what_to_discard_problems,
      ]);

      setNextPage(data.meta.pagination.next_page);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({ error, title: "何切る問題の取得に失敗しました" });
      }
    } finally {
      setNextPageLoading(false);
    }
  };

  return (
    <Button
      isLoading={nextPageLoading}
      onClick={() => fetchNextPageProblems({ nextPage, whatToDiscardProblems })}
    >
      さらに読み込む
    </Button>
  );
}
