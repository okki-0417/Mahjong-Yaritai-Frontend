"use client";

import { createContext, ReactNode, useState } from "react";
import { WhatToDiscardProblems } from "../../../app/what-to-discard-problems/page";

type WhatToDiscardProblemsContext = {
  whatToDiscardProblems: WhatToDiscardProblems;
  setWhatToDiscardProblems: React.Dispatch<
    React.SetStateAction<WhatToDiscardProblems>
  >;
};

export const WhatToDiscardProblemsContext =
  createContext<WhatToDiscardProblemsContext>({
    whatToDiscardProblems: [],
    setWhatToDiscardProblems: () => {},
  });

export default function WhatToDiscardProblemsContextProvider({
  initialWhatToDiscardProblems,
  children,
}: {
  initialWhatToDiscardProblems: WhatToDiscardProblems;
  children: ReactNode;
}) {
  const [whatToDiscardProblems, setWhatToDiscardProblems] =
    useState<WhatToDiscardProblems>(initialWhatToDiscardProblems);

  return (
    <WhatToDiscardProblemsContext.Provider
      value={{ whatToDiscardProblems, setWhatToDiscardProblems }}
    >
      {children}
    </WhatToDiscardProblemsContext.Provider>
  );
}
