"use client";

import { schemas } from "@/src/zodios/api";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import z from "zod";

export const ProblemsContext = createContext<{
  problems: z.infer<typeof schemas.WhatToDiscardProblem>[] | null;
  setProblems: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[] | null>>;
} | null>(null);

export default function ProblemsContextProvider({
  initialProblems,
  children,
}: {
  initialProblems: z.infer<typeof schemas.WhatToDiscardProblem>[] | null;
  children: React.ReactNode;
}) {
  const [problems, setProblems] = useState(initialProblems);

  return (
    <ProblemsContext.Provider value={{ problems, setProblems }}>
      {children}
    </ProblemsContext.Provider>
  );
}
