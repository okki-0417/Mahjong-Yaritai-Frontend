"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { useDisclosure } from "@chakra-ui/react";
import CommentsModal from "@/src/features/what-to-discard-problems/components/CommentsModal";

export default function CommentsCount({
  commentsCount,
  problemId,
}: {
  commentsCount: number;
  problemId: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PopButton
        value={
          <div className="flex items-center gap-1">
            <FaRegComment color="#333" size={24} />
            <div className="font-bold font-sans lg:text-lg">{commentsCount}</div>
          </div>
        }
        onClick={() => onOpen()}
        defaultClassName="pt-1"
      />

      <CommentsModal isOpen={isOpen} onClose={onClose} problemId={problemId} />
    </>
  );
}
