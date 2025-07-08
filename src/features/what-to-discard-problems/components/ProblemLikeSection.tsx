"use client";

import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { useState } from "react";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import { useDisclosure } from "@chakra-ui/react";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import axios from "axios";
import LikeButton from "@/src/components/LikeButton";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";

export default function ProblemLikeSection({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const [isLiked, setIsLiked] = useState(Boolean(problem.is_liked_by_me));
  const [likesCount, setLikesCount] = useState(problem.comments_count);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const isLoggedIn = useIsLoggedIn();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    if (!isLoggedIn) return onOpen();

    if (isSubmitting) return null;
    setIsSubmitting(true);

    try {
      if (isLiked) {
        await apiClient.deleteWhatToDiscardProblemMyLike([], {
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        setIsLiked(false);
        setLikesCount(prev => prev - 1);

        successToast({ title: "いいねを取り消しました" });
      } else {
        await apiClient.createWhatToDiscardProblemMyLike([], {
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        setIsLiked(true);
        setLikesCount(prev => prev + 1);

        successToast({ title: "いいねしました" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.message);
      }
      console.error(error);

      errorToast({ error, title: "いいねの操作に失敗しました" });
    } finally {
      setIsSubmitting(false);
    }

    return null;
  };

  return (
    <>
      <LikeButton
        isLiked={isLiked}
        likeCount={likesCount}
        handleClick={handleClick}
        isLoading={isSubmitting}
      />

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
