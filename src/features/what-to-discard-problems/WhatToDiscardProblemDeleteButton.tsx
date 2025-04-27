import { Button } from "@chakra-ui/react";
import axios from "axios";
import { IoMdTrash } from "react-icons/io";
import { apiClient } from "../../ApiConfig";
import { useSetToast } from "../../hooks/useSetToast";
import { useState } from "react";

export default function WhatToDiscardProblemDeleteButton({
  problemId,
}: {
  problemId: number;
}) {
  const setToast = useSetToast();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    const isConfirmed = confirm("この何切る問題を削除しますか？");
    if (!isConfirmed) return;

    try {
      await apiClient.delete(`/what_to_discard_problems/${problemId}`);

      setToast({ type: "success", message: "何切る問題を削除しました" });
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.message);
      } else {
        console.error(error);
      }

      setToast({ type: "error", message: "削除に失敗" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      bgColor="inherit"
      _hover={{ bgColor: "green.400" }}
      onClick={handleClick}
    >
      <IoMdTrash size={20} color="white" />
    </Button>
  );
}
