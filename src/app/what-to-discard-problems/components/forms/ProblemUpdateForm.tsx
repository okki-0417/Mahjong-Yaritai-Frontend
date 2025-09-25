"use client";

import { SubmitHandler } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import { customCreateWhatToDiscardProblem_BodySchema } from "@/src/app/what-to-discard-problems/schema/customWhatToDiscardProblemSchema";
import useProblemForm from "@/src/hooks/useProblemForm";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import { useMutation } from "@apollo/client/react";
import { UpdateWhatToDiscardProblemDocument } from "@/src/generated/graphql";

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

  const [updateProblem] = useMutation(UpdateWhatToDiscardProblemDocument);
  const { BaseForm } = useProblemForm(problem);

  const onSubmit: SubmitHandler<
    z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>
  > = async formData => {
    const isConfirmed = confirm("これで更新しますか？");
    if (!isConfirmed) return;

    try {
      const problemData = formData.what_to_discard_problem;
      const tileIds = [
        problemData.hand1_id,
        problemData.hand2_id,
        problemData.hand3_id,
        problemData.hand4_id,
        problemData.hand5_id,
        problemData.hand6_id,
        problemData.hand7_id,
        problemData.hand8_id,
        problemData.hand9_id,
        problemData.hand10_id,
        problemData.hand11_id,
        problemData.hand12_id,
        problemData.hand13_id,
        problemData.tsumo_id,
      ].map(String);

      const { data } = await updateProblem({
        variables: {
          id: String(problem.id),
          title: problemData.round || null,
          description: problemData.description || null,
          tileIds: tileIds,
          doraId: problemData.dora_id ? String(problemData.dora_id) : null,
        },
      });

      if (data?.updateWhatToDiscardProblem?.whatToDiscardProblem) {
        const graphqlProblem = data.updateWhatToDiscardProblem.whatToDiscardProblem;
        // GraphQLデータをREST APIフォーマットに変換
        // 既存のフィールドを継承
        const restFormatProblem: z.infer<typeof schemas.WhatToDiscardProblem> = {
          ...problem,
          id: Number(graphqlProblem.id),
          round: graphqlProblem.round || null,
          turn: graphqlProblem.turn || null,
          wind: graphqlProblem.wind || null,
          points: graphqlProblem.points || null,
          description: graphqlProblem.description || null,
          votes_count: graphqlProblem.votesCount,
          comments_count: graphqlProblem.commentsCount,
          likes_count: graphqlProblem.likesCount,
        } as any;

        setProblems(prev => {
          const newProblems = [...prev];
          newProblems[prev.findIndex(p => p.id === problem.id)] = restFormatProblem;
          return newProblems;
        });
        onClose();
        successToast({ title: "何切る問題を更新しました" });
      }
    } catch (error) {
      errorToast({ error, title: "何切る問題の更新に失敗しました" });
    }
  };

  return <BaseForm onSubmit={onSubmit} />;
}
