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
import { CreateWhatToDiscardProblemDocument } from "@/src/generated/graphql";

export default function ProblemCreateForm({
  onClose,
  setProblems,
}: {
  onClose: () => void;
  setProblems: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [createProblem] = useMutation(CreateWhatToDiscardProblemDocument);
  const { BaseForm } = useProblemForm();

  const onSubmit: SubmitHandler<
    z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>
  > = async formData => {
    const isConfirmed = confirm("これで作成しますか？");
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

      const { data } = await createProblem({
        variables: {
          title: problemData.round || "",
          description: problemData.description || null,
          tileIds: tileIds,
          doraId: problemData.dora_id ? String(problemData.dora_id) : null,
        },
      });

      if (data?.createWhatToDiscardProblem?.whatToDiscardProblem) {
        // GraphQLデータをREST APIフォーマットに変換
        const graphqlProblem = data.createWhatToDiscardProblem.whatToDiscardProblem;
        const restFormatProblem: z.infer<typeof schemas.WhatToDiscardProblem> = {
          id: Number(graphqlProblem.id),
          round: graphqlProblem.round || null,
          turn: graphqlProblem.turn || null,
          wind: graphqlProblem.wind || null,
          points: graphqlProblem.points || null,
          description: graphqlProblem.description || null,
          votes_count: graphqlProblem.votesCount,
          comments_count: graphqlProblem.commentsCount,
          likes_count: graphqlProblem.likesCount,
          created_at: graphqlProblem.createdAt,
          user: {
            id: Number(graphqlProblem.user.id),
            name: graphqlProblem.user.name,
            avatar_url: graphqlProblem.user.avatarUrl || null,
          },
          // 他の必要なフィールドはデフォルト値を設定
          is_liked_by_me: false,
          is_voted_by_me: false,
          my_vote_tile_id: null,
        } as any;

        setProblems(prev => [restFormatProblem, ...prev]);
        onClose();
        successToast({ title: "何切る問題を作成しました" });
      }
    } catch (error) {
      errorToast({ error, title: "何切る問題の作成に失敗しました" });
    }
  };

  return <BaseForm onSubmit={onSubmit} />;
}
