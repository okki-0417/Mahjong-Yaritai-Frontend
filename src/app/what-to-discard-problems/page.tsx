import { Box, Text, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import ProblemsSection from "@/src/features/what-to-discard-problems/components/ProblemsSection";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

export type WhatToDiscardProblems = z.infer<typeof schemas.WhatToDiscardProblem>[] | [];

export default function WhatToDiscardProblems() {
  return (
    <Box className="max-w-4xl lg:mx-auto mt-36">
      <Box mx="4">
        <h1 className="lg:text-5xl text-3xl mt-12 font-bold">何切る問題</h1>
        <hr className="mt-3" />
        <VStack mt="6" alignItems="start">
          <Text fontSize="lg">
            ここでは様々な状況での最適な選択を考えながら、他のプレイヤーと意見を交換したり、自分の判断力を磨いたりできます。
          </Text>
          <Text fontSize="lg">麻雀の奥深さを学びながら、より良い打牌選択を身につけましょう。</Text>
        </VStack>
      </Box>

      <Suspense>
        <Box mx="2">
          <ProblemsSection />
        </Box>
      </Suspense>
    </Box>
  );
}
