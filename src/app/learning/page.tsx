import {
  Container,
  Divider,
  Text,
  Box,
  HStack,
  UnorderedList,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { Metadata } from "next";
import MahjongPlayGround from "@/src/features/learning/MahjongPlayGround";
import TileImage from "@/src/components/TileImage";
import MahjongTileNames from "@/src/features/learning/MahjongTileQuiz/MahjongTileNames";
import Link from "next/link";

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
    <Container mt="20" maxW="4xl" px="2">
      <Box as="article">
        <Text as="h1" fontSize={["4xl", "5xl"]} fontWeight="bold">
          麻雀ハジメタイ
        </Text>
        <Divider />

        <Text fontSize={["lg", "xl"]} mt="8">
          「麻雀ハジメタイ」へようこそ！このページでは麻雀の最初の一歩から、一人で麻雀を楽しめるレベルまでを学習します。
        </Text>

        <Link href="/learning/legacy" className="mt-4 inline-block text-lg link-text">
          レガシー版へ
        </Link>

        <Box mt="20" as="section">
          <Text as="h2" fontSize={["2xl", "3xl"]} fontWeight="bold">
            実践的に学ぶ。
          </Text>
          <Text fontSize={["lg", "xl"]} mt="2">
            練習問題をたくさんを解きましょう。文章での学習は退屈なので、慣れてきたらにしましょう。
          </Text>
        </Box>

        <Box as="section" mt="20" rounded="md" p="6" className="bg-secondary-light">
          <Text as="h2" fontSize={["xl", "2xl"]} fontWeight="bold">
            ここでやること
          </Text>

          <Box as="nav" fontSize="lg">
            <UnorderedList className="">
              <VStack align="start" mt="2" gap="1">
                <ListItem>
                  <Link href="#section-1" className="hover:underline">
                    牌をそろえてみよう
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="#section-2" className="hover:underline">
                    麻雀牌を知ろう
                  </Link>
                </ListItem>

                <ListItem>Coming Soon...</ListItem>
              </VStack>
            </UnorderedList>
          </Box>
        </Box>

        <Box as="section" mt="20" id="section-1">
          <Text as="h2" fontSize={["2xl", "3xl"]} fontWeight="bold">
            牌をそろえてみよう
          </Text>

          <Text mt="3" fontSize={["lg", "xl"]}>
            以下のシミュレーターで、この形を作ってみてください。
          </Text>

          <HStack w="fit-content" mt="4" borderRadius="md" gap="0">
            <TileImage tileId={2} hover={false} />
            <TileImage tileId={3} hover={false} />
            <TileImage tileId={4} hover={false} />
            <TileImage tileId={10} hover={false} />
            <TileImage tileId={10} hover={false} />
            <TileImage tileId={10} hover={false} />
            <TileImage tileId={24} hover={false} />
            <TileImage tileId={25} hover={false} />
            <TileImage tileId={26} hover={false} />
            <TileImage tileId={30} hover={false} />
            <TileImage tileId={30} hover={false} />
            <TileImage tileId={30} hover={false} />
            <TileImage tileId={34} hover={false} />
            <TileImage tileId={34} hover={false} />
          </HStack>

          <Box mt="6">
            <MahjongPlayGround />
          </Box>

          <Text mt="4" fontSize={["lg", "xl"]}>
            「ツモって捨てる」、が麻雀の基本です。
          </Text>
        </Box>

        <Box as="section" mt="20" id="section-2">
          <Text as="h2" fontSize={["2xl", "3xl"]} fontWeight="bold">
            麻雀牌を知ろう
          </Text>

          <Text mt="4" fontSize={["lg", "xl"]}>
            トランプのスートや呼び名を覚えるようなものです。牌の画像をクリックして呼び名を確認できます。
          </Text>

          <Box mt="4">
            <MahjongTileNames />
          </Box>
        </Box>

        <Box mt="20" fontSize={["2xl", "3xl"]}>
          Coming Soon...
        </Box>
      </Box>
    </Container>
  );
}
