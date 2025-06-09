"use client";

import {
  FetchWhatToDiscardProblemsType,
  WhatToDiscardProblems,
} from "@/src/app/what-to-discard-problems/page";
import { WhatToDiscardProblemsContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/WhatToDiscardProblemContext";
import { ReactNode, useState } from "react";

export default function WhatToDiscardProblemsContextProvider({
  initialData,
  children,
}: {
  initialData: FetchWhatToDiscardProblemsType;
  children: ReactNode;
}) {
  const [whatToDiscardProblems, setWhatToDiscardProblems] = useState<WhatToDiscardProblems>(
    initialData.data,
  );

  return (
    <WhatToDiscardProblemsContext.Provider
      value={{
        whatToDiscardProblems,
        setWhatToDiscardProblems,
      }}>
      {children}
    </WhatToDiscardProblemsContext.Provider>
  );
}
