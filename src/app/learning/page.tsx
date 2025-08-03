import { Container, Divider, Text, Box } from "@chakra-ui/react";
import { Metadata } from "next";
import createApiPageClient from "@/src/lib/api/server";
import { LearningCategoriesList } from "@/src/features/learning/components/LearningCategoriesList";

export const metadata: Metadata = {
  title: "麻雀ハジメタイ",
  description:
    "麻雀を始めたい人のための学習コンテンツ。基本ルールから戦術まで、段階的に麻雀を学べます。",
  openGraph: {
    title: "麻雀ヤリタイ - 麻雀ハジメタイ",
    description: "麻雀を始めたい人のための学習コンテンツ",
  },
  keywords: ["麻雀", "学習", "初心者", "ルール", "戦術"],
};

export default async function LearningPage() {
  const apiPageClient = await createApiPageClient();
  const response = await apiPageClient.getLearningCategories();

  const categories = response.learning_categories;

  return (
    <Container mt="20" maxW="4xl">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        麻雀ハジメタイ
      </Text>
      <Divider />

      <Box mt="8">
        <Text fontSize={["md", "lg"]}>
          麻雀に関するシンプルな問題を繰り返し解いて、実践的な知識を身につけることができます。
        </Text>

        <Box mt="10">
          <LearningCategoriesList categories={categories} />
        </Box>
      </Box>
    </Container>
  );
}
