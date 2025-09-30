"use client";

import { SubmitHandler } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { WhatToDiscardProblem } from "@/src/generated/graphql";
import { customCreateWhatToDiscardProblem_BodySchema } from "@/src/app/what-to-discard-problems/schema/customWhatToDiscardProblemSchema";
import { z } from "zod";
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
  problem: WhatToDiscardProblem;
  onClose: () => void;
  setProblems: Dispatch<SetStateAction<WhatToDiscardProblem[]>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [updateProblem] = useMutation(UpdateWhatToDiscardProblemDocument);
  // GraphQL型をuseProblemFormの期待する形式に変換
  const problemForForm = {
    hand1_id: problem.hand1?.id ? Number(problem.hand1.id) : undefined,
    hand2_id: problem.hand2?.id ? Number(problem.hand2.id) : undefined,
    hand3_id: problem.hand3?.id ? Number(problem.hand3.id) : undefined,
    hand4_id: problem.hand4?.id ? Number(problem.hand4.id) : undefined,
    hand5_id: problem.hand5?.id ? Number(problem.hand5.id) : undefined,
    hand6_id: problem.hand6?.id ? Number(problem.hand6.id) : undefined,
    hand7_id: problem.hand7?.id ? Number(problem.hand7.id) : undefined,
    hand8_id: problem.hand8?.id ? Number(problem.hand8.id) : undefined,
    hand9_id: problem.hand9?.id ? Number(problem.hand9.id) : undefined,
    hand10_id: problem.hand10?.id ? Number(problem.hand10.id) : undefined,
    hand11_id: problem.hand11?.id ? Number(problem.hand11.id) : undefined,
    hand12_id: problem.hand12?.id ? Number(problem.hand12.id) : undefined,
    hand13_id: problem.hand13?.id ? Number(problem.hand13.id) : undefined,
    tsumo_id: problem.tsumo?.id ? Number(problem.tsumo.id) : undefined,
    dora_id: problem.dora?.id ? Number(problem.dora.id) : undefined,
    round: problem.round || undefined,
    turn: problem.turn ? String(problem.turn) : undefined,
    wind: problem.wind || undefined,
    points: problem.points ? Number(problem.points) : undefined,
    description: problem.description || undefined,
  };
  const { BaseForm } = useProblemForm(problemForForm);

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
        // GraphQLデータをコンポーネント用フォーマットに変換
        const updatedProblem: WhatToDiscardProblem = {
          ...problem,
          id: graphqlProblem.id,
          round: graphqlProblem.round || null,
          turn: graphqlProblem.turn || null,
          wind: graphqlProblem.wind || null,
          points: graphqlProblem.points || null,
          description: graphqlProblem.description || null,
          votesCount: graphqlProblem.votesCount,
          commentsCount: graphqlProblem.commentsCount,
          likesCount: graphqlProblem.likesCount,
        };

        setProblems(prev => {
          const newProblems = [...prev];
          newProblems[prev.findIndex(p => p.id === problem.id)] = updatedProblem;
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
