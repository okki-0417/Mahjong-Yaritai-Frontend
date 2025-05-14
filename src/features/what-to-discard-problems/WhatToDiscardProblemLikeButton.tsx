import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import LikeButton from "../../components/LikeButton";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export type LikesType = {
  count: number;
  current_user_like_id: number | null;
};

export default function WhatToDiscardProblemLikeButton({
  problemId,
}: {
  problemId: number;
}) {
  const [likes, setLikes] = useState<LikesType>();

  useEffect(() => {
    const fetchWhatToDiscardProblemLikes = async () => {
      try {
        const response = await apiClient.get(
          `/what_to_discard_problems/${problemId}/likes`,
        );

        setLikes(response.data.what_to_discard_problem_likes);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.status);
          console.error(error.message);
        }
      }
    };

    fetchWhatToDiscardProblemLikes();
  }, []);

  const [loading, setLoading] = useState(false);

  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const toast = useToast();

  const handleClick = async () => {
    if (!auth) return setModal("NotLoggedIn");

    if (loading) return;
    setLoading(true);

    try {
      if (!likes?.current_user_like_id) {
        const response = await apiClient.post(
          `/what_to_discard_problems/${problemId}/likes`,
        );

        const likes_res = response.data.what_to_discard_problem_likes;

        setLikes(likes_res);
      } else if (likes.current_user_like_id) {
        const response = await apiClient.delete(
          `/what_to_discard_problems/${problemId}/likes/${likes.current_user_like_id}`,
        );

        const likes_res = response.data.what_to_discard_problem_likes;

        setLikes(likes_res);
      } else {
        throw new Error("Likeの状態に不整合があります");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.message);
      }
      toast({
        title: "いいねの操作に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LikeButton
        isLiked={!!likes?.current_user_like_id}
        likeCount={likes?.count || 0}
        handleClick={handleClick}
      />
    </div>
  );
}
