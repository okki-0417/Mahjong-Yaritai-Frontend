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
import { CreateWhatToDiscardProblemDocument } from "@/src/generated/graphql";

export default function ProblemCreateForm({
  onClose,
  setProblems,
}: {
  onClose: () => void;
  setProblems: Dispatch<SetStateAction<WhatToDiscardProblem[]>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [createProblem] = useMutation(CreateWhatToDiscardProblemDocument);
  const { BaseForm } = useProblemForm(problem);

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
        const graphqlProblem = data.createWhatToDiscardProblem.whatToDiscardProblem;
        // GraphQL レスポンスを完全な WhatToDiscardProblem 型に変換
        const newProblem: WhatToDiscardProblem = {
          ...graphqlProblem,
          // 不足しているフィールドを補完
          bookmarksCount: 0,
          comments: [],
          isLikedByMe: false,
          isBookmarkedByMe: false,
          updatedAt: graphqlProblem.createdAt,
          dora: null,
          hand1: null,
          hand2: null,
          hand3: null,
          hand4: null,
          hand5: null,
          hand6: null,
          hand7: null,
          hand8: null,
          hand9: null,
          hand10: null,
          hand11: null,
          hand12: null,
          hand13: null,
          tsumo: null,
          myVote: null,
          voteResults: [],
        } as WhatToDiscardProblem;
        setProblems(prev => [newProblem, ...prev]);
        onClose();
        successToast({ title: "何切る問題を作成しました" });
      }
    } catch (error) {
      errorToast({ error, title: "何切る問題の作成に失敗しました" });
    }
  };

  return <BaseForm onSubmit={onSubmit} />;
}
