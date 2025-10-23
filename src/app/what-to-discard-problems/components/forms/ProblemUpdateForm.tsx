"use client";

import { SubmitHandler } from "react-hook-form";
import {
  UpdateWhatToDiscardProblemInput,
  UpdateWhatToDiscardProblemMutationVariables,
  WhatToDiscardProblem,
} from "@/src/generated/graphql";
import { useMutation } from "@apollo/client/react";
import { UpdateWhatToDiscardProblemDocument } from "@/src/generated/graphql";
import { useToast } from "@chakra-ui/react";
import useProblemForm from "@/src/hooks/useProblemForm";

type ProblemUpdateFormInputs = UpdateWhatToDiscardProblemInput;

type Props = {
  problem: WhatToDiscardProblem;
  onClose: () => void;
};

export default function ProblemUpdateForm({ problem, onClose }: Props) {
  const toast = useToast();

  const [updateProblem] = useMutation<
    UpdateWhatToDiscardProblemInput,
    UpdateWhatToDiscardProblemMutationVariables
  >(UpdateWhatToDiscardProblemDocument, {
    onCompleted: () => {
      toast({
        title: "何切る問題を更新しました",
        status: "success",
      });
      onClose();
    },
    onError: error => {
      toast({
        title: "何切る問題の更新に失敗しました",
        status: "error",
        description: error.message,
      });
    },
  });

  const { BaseForm } = useProblemForm(problem);

  const onSubmit: SubmitHandler<ProblemUpdateFormInputs> = async formData => {
    const isConfirmed = confirm("これで更新しますか？");
    if (!isConfirmed) return;

    await updateProblem({ variables: { ...formData } });
  };

  return <BaseForm onSubmit={onSubmit} />;
}
