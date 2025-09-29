import { Container } from "@chakra-ui/react";
import { Suspense } from "react";
import ProblemsSectionWithGraphQL from "@/src/app/what-to-discard-problems/components/ProblemsSectionWithGraphQL";
import WhatToDiscardProblemsSideNavigation from "@/src/app/what-to-discard-problems/components/WhatToDiscardProblemsSideNavigation";
import { Metadata } from "next";
import ProblemsSectionSkeleton from "@/src/app/what-to-discard-problems/components/ProblemsSectionSkeleton";
import getSession from "@/src/lib/getSession";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

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

export default async function WhatToDiscardProblems() {
  const session = await getSession();

  return (
    <Container maxW="8xl" px={["1px", "6"]} mt={["6", "12"]}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-3 items-start justify-items-end">
        <div className="w-full lg:col-span-1">
          <div className="sticky left-20 top-20 w-full ">
            <WhatToDiscardProblemsSideNavigation session={session} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto lg:col-span-2">
          <Suspense fallback={<ProblemsSectionSkeleton />}>
            <ProblemsSectionWithGraphQL />
          </Suspense>
        </div>

        <div className="lg:col-span-1">
          <div className="hidden lg:flex justify-start">
            {/* 将来的に他の関連コンテンツを配置予定 */}
          </div>
        </div>
      </div>
    </Container>
  );
}
