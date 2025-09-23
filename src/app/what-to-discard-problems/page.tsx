import { Container } from "@chakra-ui/react";
import { Suspense } from "react";
import ProblemsSection from "@/src/app/what-to-discard-problems/components/ProblemsSection";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { Metadata } from "next";
import ProblemsSectionSkeleton from "@/src/app/what-to-discard-problems/components/ProblemsSectionSkeleton";

export type WhatToDiscardProblems = z.infer<typeof schemas.WhatToDiscardProblem>[] | [];

export const metadata: Metadata = {
  title: "何切る問題集",
  description:
    "様々な麻雀の状況での最適な選択を考えながら、他のプレイヤーと意見を交換できます。麻雀の判断力を磨き、より良い打牌選択を身につけましょう。",
  openGraph: {
    title: "何切る問題集 | 麻雀ヤリタイ",
    description:
      "様々な状況での最適な選択を考え、他のプレイヤーと意見交換。麻雀の判断力を磨きましょう。",
  },
};

export default function WhatToDiscardProblems() {
  return (
    <Container mt={["6", "12"]} maxW="4xl" px={["3", "0"]}>
      <Suspense fallback={<ProblemsSectionSkeleton />}>
        <ProblemsSection />
      </Suspense>
    </Container>
  );
}
