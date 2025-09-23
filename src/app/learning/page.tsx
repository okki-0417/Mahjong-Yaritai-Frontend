import { Container, Text } from "@chakra-ui/react";
import { Metadata } from "next";

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
    <Container mt="20" maxW="4xl">
      <Text fontSize="4xl" fontWeight="bold">
        麻雀ハジメタイ
      </Text>
      <Text mt="4">Coming Soon...</Text>
    </Container>
  );
}
