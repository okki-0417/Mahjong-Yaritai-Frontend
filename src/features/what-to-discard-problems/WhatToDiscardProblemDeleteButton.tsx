import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { IoMdTrash } from "react-icons/io";
import { apiClient } from "../../ApiConfig";
import { useState } from "react";
import useErrorToast from "../../hooks/useErrorToast";

export default function WhatToDiscardProblemDeleteButton({
  problemId,
}: {
  problemId: number;
}) {
  const toast = useToast();
  const errorToast = useErrorToast();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    const isConfirmed = confirm("この何切る問題を削除しますか？");
    if (!isConfirmed) return;

    try {
      await apiClient.delete(`/what_to_discard_problems/${problemId}`);

      toast({
        title: "何切る問題を削除しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({ error, title: "削除に失敗しました" });
      }
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
