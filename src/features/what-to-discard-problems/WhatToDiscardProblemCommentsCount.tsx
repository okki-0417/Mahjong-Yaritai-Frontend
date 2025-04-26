import { FaRegComment } from "react-icons/fa";
import PopButton from "../../components/PopButton";

export default function WhatToDiscardProblemCommentsCount({
  commentsCount,
  isCommentListOpen,
  setCommentListOpen,
}: {
  commentsCount: number;
  isCommentListOpen: boolean;
  setCommentListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <PopButton
      value={
        <div className="flex items-center gap-1">
          <FaRegComment color="#333" size={24} />
          <div className="font-sans lg:text-lg">{commentsCount}</div>
        </div>
      }
      onClick={() => {
        setCommentListOpen(!isCommentListOpen);
      }}
      defaultClassName="pt-1"
    />
  );
}
