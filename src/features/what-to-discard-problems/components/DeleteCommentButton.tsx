import { apiClient } from "@/src/lib/apiClients/ApiClient";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { schemas } from "@/src/zodios/api";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { z } from "zod";

export default function DeleteCommentButton({
  comment,
}: {
  comment: z.infer<typeof schemas.Comment>;
}) {
  const [deleting, setDeleting] = useState(false);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const deleteComment = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const isConfirmed = confirm("コメントを削除しますか？");

      if (!isConfirmed) return;

      await apiClient.deleteComment([], {
        params: {
          what_to_discard_problem_id: String(comment.commentable_id),
          id: String(comment.id),
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
    <Button size="sm" px="1" bgColor="inherit" onClick={deleteComment}>
      <IoMdTrash size={20} color="#365158" />
    </Button>
  );
}
