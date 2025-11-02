"use client";

import { Fragment, useState } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { MdBookmarkAdded } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { useMutation } from "@apollo/client/react";
import {
  CreateWhatToDiscardProblemBookmarkMutation,
  DeleteWhatToDiscardProblemBookmarkMutation,
  CreateWhatToDiscardProblemBookmarkDocument,
  DeleteWhatToDiscardProblemBookmarkDocument,
  WhatToDiscardProblem,
} from "@/src/generated/graphql";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import useGetSession from "@/src/hooks/useGetSession";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  problem: WhatToDiscardProblem;
};

export default function BookmarkButton({ problem }: Props) {
  const { session } = useGetSession();

  const [isBookmarked, setIsBookmarked] = useState(problem.isBookmarkedByMe);
  const [bookmarksCount, setBookmarksCount] = useState(problem.bookmarksCount);
  const toast = useToast();

  const {
    isOpen: isNotLoggedInModalOpen,
    onOpen: onNotLoggedInModalOpen,
    onClose: onNotLoggedInModalClose,
  } = useDisclosure();

  const [createBookmark] = useMutation<CreateWhatToDiscardProblemBookmarkMutation>(
    CreateWhatToDiscardProblemBookmarkDocument,
    {
      onCompleted: () => {
        setIsBookmarked(true);
        setBookmarksCount(bookmarksCount + 1);

        toast({
          title: "ブックマークに追加しました",
          status: "success",
        });
      },
      onError: error => {
        toast({
          title: "ブックマークの追加に失敗しました",
          description: error.message,
          status: "error",
        });
      },
    },
  );

  const [deleteBookmark] = useMutation<DeleteWhatToDiscardProblemBookmarkMutation>(
    DeleteWhatToDiscardProblemBookmarkDocument,
    {
      onCompleted: () => {
        setIsBookmarked(false);
        setBookmarksCount(bookmarksCount - 1);

        toast({ title: "ブックマークから削除しました", status: "success" });
      },
      onError: error => {
        toast({
          title: "ブックマークの削除に失敗しました",
          description: error.message,
          status: "error",
        });
      },
    },
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<{}> = async () => {
    await (() => new Promise(resolve => setTimeout(resolve, 500)))();

    if (!session?.isLoggedIn) {
      onNotLoggedInModalOpen();
      return;
    }
    if (isBookmarked) {
      await deleteBookmark({ variables: { problemId: String(problem.id) } });
    } else {
      await createBookmark({ variables: { problemId: String(problem.id) } });
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" isLoading={isSubmitting} size="sm" colorScheme="">
          {isBookmarked ? <MdBookmarkAdded size={24} /> : <FaRegBookmark size={20} />}
        </Button>
      </form>

      <NotLoggedInModal isOpen={isNotLoggedInModalOpen} onClose={onNotLoggedInModalClose} />
    </Fragment>
  );
}
