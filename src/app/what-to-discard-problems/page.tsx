import { Box, Container, Divider, Text, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import ProblemsSection from "@/src/features/what-to-discard-problems/components/ProblemsSection";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import ProblemsSectionFallback from "@/src/features/what-to-discard-problems/components/ProblemSectionFallback";
import { Metadata } from "next";

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
  keywords: ["何切る", "麻雀問題", "麻雀練習", "打牌選択", "麻雀上達"],
};

export default function WhatToDiscardProblems() {
  return (
    <Container mt="20" maxW="4xl" px="2">
      <VStack gap="4" alignItems="stretch">
        <Box>
          <Text as="h1" fontSize={["2xl", "4xl"]} fontWeight="bold">
            何切る問題
          </Text>
          <Divider />
        </Box>

        <Text fontSize="lg">
          ここでは様々な状況での最適な選択を考えながら、他のプレイヤーと意見を交換したり、自分の判断力を磨いたりできます。
          <br />
          麻雀の奥深さを学びながら、より良い打牌選択を身につけましょう。
        </Text>

        <Box mt="8">
          <Suspense fallback={<ProblemsSectionFallback />}>
            <ProblemsSection />
          </Suspense>
        </Box>
      </VStack>
    </Container>
  );
}
