"use client";

import ToggleWrapper from "@/src/components/ToggleWrapper";
import { IsCommentSectionOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsCommentSectionOpenContext";
import { ReactNode, useContext } from "react";

export default function IsCommentSectionOpenToggleWrapper({ children }: { children: ReactNode }) {
  const { isCommentSectionOpen } = useContext(IsCommentSectionOpenContext);

  return (
    <ToggleWrapper flag={isCommentSectionOpen}>
      {isCommentSectionOpen && <div>{children}</div>}
    </ToggleWrapper>
  );
}
