"use client";

import { SubmitHandler } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import { customCreateWhatToDiscardProblem_BodySchema } from "@/src/app/what-to-discard-problems/schema/customWhatToDiscardProblemSchema";
import useProblemForm from "@/src/hooks/useProblemForm";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";

export default function ProblemCreateForm({
  onClose,
  setProblems,
}: {
  onClose: () => void;
  setProblems: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const { BaseForm } = useProblemForm();

  const onSubmit: SubmitHandler<
    z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>
  > = async formData => {
    const isConfirmed = confirm("これで作成しますか？");
    if (!isConfirmed) return;

    try {
      const response = await apiClient.createWhatToDiscardProblem(formData);

      setProblems(prev => [response.what_to_discard_problem, ...prev]);
      onClose();
      successToast({ title: "何切る問題を作成しました" });
    } catch (error) {
      errorToast({ error, title: "何切る問題の作成に失敗しました" });
    }
  };

  return <BaseForm onSubmit={onSubmit} />;
}
