"use client";

import PopButton from "@/src/components/PopButton";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

type LikeButtonType = {
  isLiked: boolean;
  likeCount: number;
  isLoading?: boolean;
  handleClick: () => void;
};

export default function LikeButton({
  isLiked,
  likeCount,
  isLoading = false,
  handleClick,
}: LikeButtonType) {
  return (
    <PopButton onClick={handleClick} defaultClassName="w-10" disabled={isLoading}>
      <div className="flex items-center gap-1">
        {isLiked ? (
          <FaThumbsUp color="#f765d6" size={24} />
        ) : (
          <FaRegThumbsUp color="#333" size={24} />
        )}
        <div className="font-sans font-semibold text-lg">{likeCount}</div>
      </div>
    </PopButton>
  );
}
