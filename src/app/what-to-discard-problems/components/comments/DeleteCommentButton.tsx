"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { Comment } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useMutation } from "@apollo/client/react";
import { DeleteCommentDocument } from "@/src/generated/graphql";

export default function DeleteCommentButton({ comment }: { comment: Comment }) {
  const [deleting, setDeleting] = useState(false);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const [deleteCommentMutation] = useMutation(DeleteCommentDocument);

  const deleteComment = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const isConfirmed = confirm("コメントを削除しますか？");

      if (!isConfirmed) {
        setDeleting(false);
        return;
      }

      await deleteCommentMutation({
        variables: {
          commentId: String(comment.id),
        },
      });

      successToast({
        title: "コメントを削除しました",
        description: "リロードでページの表示も更新されます",
      });
    } catch (error) {
      errorToast({
        error,
        title: "コメントの削除に失敗しました",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Button size="sm" bgColor="inherit" px="1" onClick={deleteComment}>
      <IoMdTrash size="20" className="text-secondary hover:text-red-500" />
    </Button>
  );
}
