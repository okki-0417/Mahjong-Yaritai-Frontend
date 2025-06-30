"use client";

import { useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from "@chakra-ui/react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import LikeButton from "@/src/components/LikeButton";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/config/apiConfig";

export default function ProblemLikeButton({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const [myLike, setMyLike] = useState<z.infer<typeof schemas.Like> | null>(null);
  const [likesCount, setLikesCount] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const auth = useIsLoggedIn();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    if (!auth) return onOpen();

    if (loading) {
      return null;
    }
    setLoading(true);

    try {
      if (myLike) {
        await apiClient.deleteWhatToDiscardProblemLike([], {
          params: {
            what_to_discard_problem_id: String(problem.id),
            id: String(myLike.id),
          },
        });

        setMyLike(null);
        setLikesCount(likesCount - 1);

        toast({
          title: "いいねを取り消しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const response = await apiClient.createWhatToDiscardProblemLike([], {
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        const data = response.what_to_discard_problem_like;

        setMyLike(data);
        setLikesCount(likesCount + 1);

        toast({
          title: "いいねしました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.message);
      }
      console.error(error);
      toast({
        title: "いいねの操作に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }

    return null;
  };

  return (
    <>
      <LikeButton
        isLiked={Boolean(myLike)}
        likeCount={likesCount}
        handleClick={handleClick}
        isLoading={loading}
      />
      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
