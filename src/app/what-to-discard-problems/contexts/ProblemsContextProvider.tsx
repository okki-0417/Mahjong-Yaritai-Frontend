"use client";

import { WrappedWhatToDiscardProblem } from "@/src/app/what-to-discard-problems/components/ProblemSection";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
};

type ProblemContextType = {
  problems: WrappedWhatToDiscardProblem[];
  setProblems: Dispatch<SetStateAction<WrappedWhatToDiscardProblem[]>>;
  pageInfo: PageInfo;
  setPageInfo: Dispatch<SetStateAction<PageInfo>>;
};

export const ProblemsContext = createContext<ProblemContextType | null>(null);

type Props = {
  initialProblems: WrappedWhatToDiscardProblem[];
  initialPageInfo: PageInfo;
  children: ReactNode;
};

export default function ProblemsContextProvider({
  initialProblems,
  initialPageInfo,
  children,
}: Props) {
  const [problems, setProblems] = useState(initialProblems);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);

  return (
    <ProblemsContext.Provider value={{ problems, setProblems, pageInfo, setPageInfo }}>
      {children}
    </ProblemsContext.Provider>
  );
}
