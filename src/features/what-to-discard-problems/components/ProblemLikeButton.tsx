"use client";

import { useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { WhatToDiscardProblem } from "@/types/ApiData";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import LikeButton from "@/src/components/LikeButton";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { Configuration, Like, WhatToDiscardProblemLikeApi } from "@/api-client";
import { API_BASE_URL } from "@/config/apiConfig";

const apiClient = new WhatToDiscardProblemLikeApi(
  new Configuration({
    basePath: API_BASE_URL,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  }),
);

export default function ProblemLikeButton({ problem }: { problem: WhatToDiscardProblem }) {
  const [myLike, setMyLike] = useState<Like | null>(problem.myLike);
  const [likesCount, setLikesCount] = useState(problem.likesCount);

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
        await apiClient.deleteLike({
          whatToDiscardProblemId: String(problem.id),
          id: String(myLike.id),
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
        const response = await apiClient.createLike({ whatToDiscardProblemId: String(problem.id) });

        const data = response.whatToDiscardProblemLike.myLike;

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
