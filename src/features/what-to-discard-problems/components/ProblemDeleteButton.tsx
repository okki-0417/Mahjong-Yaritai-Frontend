"use client";

import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { IoMdTrash } from "react-icons/io";
import { useState } from "react";
import useErrorToast from "@/src/hooks/useErrorToast";
import { apiClient } from "@/src/lib/api/client";

export default function ProblemDeleteButton({ problemId }: { problemId: number }) {
  const toast = useToast();
  const errorToast = useErrorToast();
  const [loading, setLoading] = useState(false);

  const deleteProblem = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    /* eslint no-alert: 0 */
    const isConfirmed = confirm("この何切る問題を削除しますか？");
    if (!isConfirmed) {
      return;
    }

    try {
      await apiClient.deleteWhatToDiscardProblem([], {
        params: {
          id: String(problemId),
        },
      });

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
    <Button bgColor="inherit" _hover={{ bgColor: "green.400" }} onClick={deleteProblem}>
      <IoMdTrash size={20} color="white" />
    </Button>
  );
}
