"use client";

import ToggleWrapper from "@/src/components/ToggleWrapper";
import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { ReactNode, useContext } from "react";

export default function IsVoteResultOpenToggleWrapper({ children }: { children: ReactNode }) {
  const { isVoteResultOpen } = useContext(IsVoteResultOpenContext);

  return (
    <ToggleWrapper flag={isVoteResultOpen}>
      {isVoteResultOpen && <div>{children}</div>}
    </ToggleWrapper>
  );
}
