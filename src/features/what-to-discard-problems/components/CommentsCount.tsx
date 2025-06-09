"use client";

import { FaRegComment } from "react-icons/fa";
import { useContext } from "react";
import { IsCommentSectionOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsCommentSectionOpenContext";
import PopButton from "@/src/components/PopButton";

export default function CommentsCount({ commentsCount }: { commentsCount: number }) {
  const { isCommentSectionOpen, setIsCommentSectionOpen } = useContext(IsCommentSectionOpenContext);

  return (
    <PopButton
      value={
        <div className="flex items-center gap-1">
          <FaRegComment color="#333" size={24} />
          <div className="font-bold font-sans lg:text-lg">{commentsCount}</div>
        </div>
      }
      onClick={() => {
        setIsCommentSectionOpen(!isCommentSectionOpen);
      }}
      defaultClassName="pt-1"
    />
  );
}
