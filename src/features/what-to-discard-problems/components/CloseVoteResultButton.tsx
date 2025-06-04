"use client";

import CloseAccordionButton from "@/src/components/CloseAccordionButton";
import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { useContext } from "react";

export default function CloseVoteResultButton() {
  const { setIsVoteResultOpen } = useContext(IsVoteResultOpenContext);

  return (
    <CloseAccordionButton
      onClick={() => setIsVoteResultOpen(false)}
      arrowColor="white"
    />
  );
}
