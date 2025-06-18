import { Comment, WhatToDiscardProblemCommentApi } from "@/api-client";
import { apiConfig } from "@/config/apiConfig";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";

const apiClient = new WhatToDiscardProblemCommentApi(apiConfig);

export default function DeleteCommentButton({ comment }: { comment: Comment }) {
  const [deleting, setDeleting] = useState(false);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const deleteComment = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const isConfirmed = confirm("コメントを削除しますか？");

      if (!isConfirmed) return;

      await apiClient.deleteComment({
        whatToDiscardProblemId: String(comment.commentableId),
        id: String(comment.id),
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
    <Button size="sm" px="1" bgColor="inherit" onClick={deleteComment}>
      <IoMdTrash size={20} color="#365158" />
    </Button>
  );
}
