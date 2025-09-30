"use client";

import { WhatToDiscardProblem } from "@/src/generated/graphql";
import { useContext, useEffect, useState } from "react";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import { useDisclosure } from "@chakra-ui/react";
import LikeButton from "@/src/components/LikeButton";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CreateWhatToDiscardProblemLikeDocument,
  DeleteWhatToDiscardProblemLikeDocument,
  WhatToDiscardProblemDetailDocument,
} from "@/src/generated/graphql";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";

export default function ProblemLikeSection({ problem }: { problem: WhatToDiscardProblem }) {
  const { data: problemData } = useQuery(WhatToDiscardProblemDetailDocument, {
    variables: { id: String(problem.id) },
    skip: !problem.id,
  });

  useEffect(() => {
    if (problemData?.whatToDiscardProblem?.isLikedByMe !== undefined) {
      setIsLiked(problemData.whatToDiscardProblem.isLikedByMe);
    }
  }, [problemData]);

  const [isLiked, setIsLiked] = useState(Boolean(problem.isLikedByMe));
  const [likesCount, setLikesCount] = useState(problem.likesCount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [createLike] = useMutation(CreateWhatToDiscardProblemLikeDocument);
  const [deleteLike] = useMutation(DeleteWhatToDiscardProblemLikeDocument);

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    if (!isLoggedIn) return onOpen();
    if (isSubmitting) return null;
    setIsSubmitting(true);

    try {
      if (isLiked) {
        await deleteLike({
          variables: {
            whatToDiscardProblemId: String(problem.id),
          },
        });

        setIsLiked(false);
        setLikesCount(prev => prev - 1);

        successToast({ title: "いいねを取り消しました" });
      } else {
        await createLike({
          variables: {
            whatToDiscardProblemId: String(problem.id),
          },
        });

        setIsLiked(true);
        setLikesCount(prev => prev + 1);

        successToast({ title: "いいねしました" });
      }
    } catch (error) {
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
