"use client";

import { WhatToDiscardProblem } from "@/src/generated/graphql";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const ProblemsContext = createContext<{
  problems: WhatToDiscardProblem[] | null;
  setProblems: Dispatch<SetStateAction<WhatToDiscardProblem[] | null>>;
} | null>(null);

export default function ProblemsContextProvider({
  initialProblems,
  children,
}: {
  initialProblems: WhatToDiscardProblem[] | null;
  children: React.ReactNode;
}) {
  const [problems, setProblems] = useState(initialProblems);

  return (
    <ProblemsContext.Provider value={{ problems, setProblems }}>
      {children}
    </ProblemsContext.Provider>
  );
}
