"use client";

import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { ReactNode, useContext } from "react";

export default function IsVoteResultOpenToggleWrapper({ children }: { children: ReactNode }) {
  const { isVoteResultOpen } = useContext(IsVoteResultOpenContext);

  return (
    <div
      className={`${isVoteResultOpen ? `lg:max-h-[520px] max-h-[900px]` : "max-h-0"} transition-all ease-in-out duration-200 overflow-hidden`}>
      {children}
    </div>
  );
}
