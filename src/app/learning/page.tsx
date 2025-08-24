import { Container, Divider, Text, Box } from "@chakra-ui/react";
import { Metadata } from "next";
import LearningCategoriesSection from "@/src/features/learning/components/LearningCategoriesSection";
import { Suspense } from "react";
import Fallback from "@/src/components/fallbacks/Fallback";

export const metadata: Metadata = {
  title: "麻雀ハジメタイ",
  description:
    "麻雀を始めたい人のための学習コンテンツ。基本ルールから戦術まで、段階的に麻雀を学べます。",
  openGraph: {
    title: "麻雀ヤリタイ - 麻雀ハジメタイ",
    description: "麻雀を始めたい人のための学習コンテンツ",
  },
};

export default function LearningPage() {
  return (
    <Container mt="20" maxW="4xl" mb="20">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        麻雀ハジメタイ
      </Text>
      <Divider />

      <Box mt="8">
        <Text fontSize={["md", "lg"]}>
          麻雀に関するシンプルな問題を繰り返し解いて、実践的な知識を身につけることができます。
        </Text>

        <Box mt="10">
          <Suspense fallback={<Fallback />}>
            <LearningCategoriesSection />
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
}
