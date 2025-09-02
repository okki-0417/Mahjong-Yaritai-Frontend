import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { apiClient } from "@/src/lib/api/client";
import { useState } from "react";

export default function useProblemDelete(problemId: number) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const [loading, setLoading] = useState(false);

  const deleteProblem = async () => {
    if (loading) return;

    const isConfirmed = confirm("この何切る問題を削除しますか？");
    if (!isConfirmed) return;

    setLoading(true);
    try {
      await apiClient.deleteWhatToDiscardProblem([], {
        params: {
          id: String(problemId),
        },
      });

      successToast({
        title: "何切る問題を削除しました",
        description: "リロードするとページにも反映されます",
      });
    } catch (error) {
      errorToast({ error, title: "何切る問題の削除に失敗しました" });
    } finally {
      setLoading(false);
    }
  };

  return { deleteProblem, loading };
}
