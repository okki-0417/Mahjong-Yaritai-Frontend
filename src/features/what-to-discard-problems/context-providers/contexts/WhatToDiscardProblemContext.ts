import { WhatToDiscardProblems } from "@/src/app/what-to-discard-problems/page";
import { createContext } from "react";

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
