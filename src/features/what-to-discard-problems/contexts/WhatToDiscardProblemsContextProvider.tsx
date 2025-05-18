"use client";

import { createContext, ReactNode, useState } from "react";
import {
  FetchWhatToDiscardProblemsType,
  WhatToDiscardProblems,
} from "../../../app/what-to-discard-problems/page";

type WhatToDiscardProblemsContext = {
  whatToDiscardProblems: WhatToDiscardProblems;
  setWhatToDiscardProblems: React.Dispatch<
    React.SetStateAction<WhatToDiscardProblems>
  >;
  nextPage: number | null;
  setNextPage: React.Dispatch<React.SetStateAction<number | null>>;
};

export const WhatToDiscardProblemsContext =
  createContext<WhatToDiscardProblemsContext>({
    whatToDiscardProblems: [],
    setWhatToDiscardProblems: () => {},
    nextPage: null,
    setNextPage: () => {},
  });

export default function WhatToDiscardProblemsContextProvider({
  initialData,
  children,
}: {
  initialData: FetchWhatToDiscardProblemsType;
  children: ReactNode;
}) {
  const [whatToDiscardProblems, setWhatToDiscardProblems] =
    useState<WhatToDiscardProblems>(initialData.what_to_discard_problems);
  const [nextPage, setNextPage] = useState<number | null>(
    initialData.meta.pagination.next_page
  );

  return (
    <WhatToDiscardProblemsContext.Provider
      value={{
        whatToDiscardProblems,
        setWhatToDiscardProblems,
        nextPage,
        setNextPage,
      }}
    >
      {children}
    </WhatToDiscardProblemsContext.Provider>
  );
}
