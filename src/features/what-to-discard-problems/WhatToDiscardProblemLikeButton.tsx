import { useState } from "react";
import { apiClient } from "../../ApiConfig";
import LikeButton from "../../components/LikeButton";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useSetToast } from "../../hooks/useSetToast";

export type Likes = {
  what_to_discard_problem_id: number;
  count: number;
  current_user_like_id: number | null;
};

export default function WhatToDiscardProblemLikeButton({
  likes,
}: {
  likes: Likes;
}) {
  if (!likes) return;

  const [likeCount, setLikeCount] = useState(likes.count);
  const [myLikeId, setMyLikeId] = useState(likes.current_user_like_id);

  const [loading, setLoading] = useState(false);

  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const setToast = useSetToast();

  const handleClick = async () => {
    if (!auth) return setModal("NotLoggedIn");

    if (loading) return;
    setLoading(true);

    try {
      if (!myLikeId) {
        const response = await apiClient.post(
          `/what_to_discard_problems/${likes.what_to_discard_problem_id}/likes`
        );

        const data = response.data;

        setMyLikeId(data.what_to_discard_problem_like.id);
        setLikeCount(likeCount + 1);
      } else if (myLikeId) {
        await apiClient.delete(
          `/what_to_discard_problems/${likes.what_to_discard_problem_id}/likes/${myLikeId}`
        );

        setMyLikeId(null);
        setLikeCount(likeCount - 1);
      } else {
        throw new Error("Likeの状態に不整合があります");
      }
    } catch (error) {
      setToast({ type: "error", message: "「いいね」の操作に失敗しました。" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LikeButton
        isLiked={!!myLikeId}
        likeCount={likeCount}
        handleClick={handleClick}
      />
    </div>
  );
}
