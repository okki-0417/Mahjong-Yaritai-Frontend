"use client";

import CloseAccordionButton from "@/src/components/CloseAccordionButton";
import { IsCommentSectionOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsCommentSectionOpenContext";
import { useContext } from "react";

export default function CloseCommentSectionButton() {
  const { setIsCommentSectionOpen } = useContext(IsCommentSectionOpenContext);

  return (
    <CloseAccordionButton onClick={() => setIsCommentSectionOpen(false)} />
  );
}
