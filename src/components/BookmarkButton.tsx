"use client";

import { useState, useContext, useEffect } from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { MdBookmarkAdded } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { useMutation } from "@apollo/client/react";
import {
  CreateWhatToDiscardProblemBookmarkMutation,
  DeleteWhatToDiscardProblemBookmarkMutation,
  CreateWhatToDiscardProblemBookmarkDocument,
  DeleteWhatToDiscardProblemBookmarkDocument,
} from "@/src/generated/graphql";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";

interface BookmarkButtonProps {
  problemId: string;
  isBookmarked: boolean;
  bookmarksCount: number;
  /* eslint-disable no-unused-vars */
  onBookmarkUpdate?: (isBookmarked: boolean, bookmarksCount: number) => void;
  /* eslint-enable no-unused-vars */
}

export default function BookmarkButton({
  problemId,
  isBookmarked,
  bookmarksCount,
  onBookmarkUpdate,
}: BookmarkButtonProps) {
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);
  const [bookmarksCountState, setBookmarksCountState] = useState(bookmarksCount);
  const [isLoading, setIsLoading] = useState(false);

  // Props が更新されたら state も更新
  useEffect(() => {
    setIsBookmarkedState(isBookmarked);
    setBookmarksCountState(bookmarksCount);
  }, [isBookmarked, bookmarksCount]);

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [createBookmark] = useMutation<CreateWhatToDiscardProblemBookmarkMutation>(
    CreateWhatToDiscardProblemBookmarkDocument,
  );

  const [deleteBookmark] = useMutation<DeleteWhatToDiscardProblemBookmarkMutation>(
    DeleteWhatToDiscardProblemBookmarkDocument,
  );

  const handleBookmarkToggle = async () => {
    if (!isLoggedIn) {
      onOpen();
      return;
    }

    setIsLoading(true);

    try {
      if (isBookmarkedState) {
        const { data } = await deleteBookmark({
          variables: {
            problemId,
          },
          refetchQueries: ["WhatToDiscardProblemDetail"],
        });

        if (data?.deleteWhatToDiscardProblemBookmark?.success) {
          const newBookmarksCount = Math.max(0, bookmarksCountState - 1);
          setIsBookmarkedState(false);
          setBookmarksCountState(newBookmarksCount);
          onBookmarkUpdate?.(false, newBookmarksCount);
          successToast({ title: "ブックマークから削除しました" });
        } else {
          const errors = data?.deleteWhatToDiscardProblemBookmark?.errors;
          throw new Error(
            `Failed to delete bookmark: ${errors ? JSON.stringify(errors) : "Unknown error"}`,
          );
        }
      } else {
        const { data } = await createBookmark({
          variables: {
            problemId,
          },
          refetchQueries: ["WhatToDiscardProblemDetail"],
        });

        if (data?.createWhatToDiscardProblemBookmark?.success) {
          const newBookmarksCount = bookmarksCountState + 1;
          setIsBookmarkedState(true);
          setBookmarksCountState(newBookmarksCount);
          onBookmarkUpdate?.(true, newBookmarksCount);
          successToast({ title: "ブックマークに追加しました" });
        } else {
          const errors = data?.createWhatToDiscardProblemBookmark?.errors;
          if (errors && errors.some((e: any) => e.includes("unique") || e.includes("already"))) {
            setIsBookmarkedState(true);
            successToast({ title: "すでにブックマークに追加されています" });
          } else {
            throw new Error(
              `Failed to create bookmark: ${errors ? JSON.stringify(errors) : "Unknown error"}`,
            );
          }
        }
      }
    } catch (error) {
      errorToast({ error, title: "ブックマークの操作に失敗しました" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton
        aria-label={isBookmarkedState ? "ブックマークから削除" : "ブックマークに追加"}
        icon={isBookmarkedState ? <MdBookmarkAdded size={26} /> : <FaRegBookmark size={22} />}
        className="hover:scale-105 transition-transform"
        colorScheme=""
        size="sm"
        onClick={handleBookmarkToggle}
        isLoading={isLoading}
      />

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
