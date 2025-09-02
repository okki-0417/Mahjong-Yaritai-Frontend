"use client";

import { SubmitHandler } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import { customCreateWhatToDiscardProblem_BodySchema } from "@/src/features/what-to-discard-problems/schema/customWhatToDiscardProblemSchema";
import useProblemForm from "@/src/hooks/useProblemForm";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";

export default function ProblemUpdateForm({
  problem,
  onClose,
  setProblems,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  onClose: () => void;
  setProblems: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const { BaseForm } = useProblemForm(problem);

  const onSubmit: SubmitHandler<
    z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>
  > = async formData => {
    const isConfirmed = confirm("これで作成しますか？");
    if (!isConfirmed) return;

    try {
      const response = await apiClient.updateWhatToDiscardProblem(formData, {
        params: {
          id: String(problem.id),
        },
      });

      setProblems(prev => {
        const newProblems = [...prev];

        newProblems[prev.findIndex(p => p.id === problem.id)] = response.what_to_discard_problem;
        return newProblems;
      });
      onClose();
      successToast({ title: "何切る問題を更新しました" });
    } catch (error) {
      errorToast({ error, title: "何切る問題の更新に失敗しました" });
    }
  };

  return <BaseForm onSubmit={onSubmit} />;
}
