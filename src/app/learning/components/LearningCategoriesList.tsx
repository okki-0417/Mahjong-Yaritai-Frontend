"use client";

import {
  Box,
  VStack,
  HStack,
  Circle,
  Text,
  useDisclosure,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { QuestionsModal } from "./QuestionsModal";
import { apiClient } from "@/src/lib/api/client";
import useErrorToast from "@/src/hooks/useErrorToast";

type LearningCategory = z.infer<typeof schemas.LearningCategory>;
type LearningQuestion = z.infer<typeof schemas.LearningQuestion>;

interface LearningCategoriesListProps {
  categories: LearningCategory[];
}

export function LearningCategoriesList({ categories }: LearningCategoriesListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [questions, setQuestions] = useState<LearningQuestion[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const errorToast = useErrorToast();

  const handleCategoryClick = async (category: LearningCategory) => {
    setLoadingStates(prev => ({ ...prev, [category.id]: true }));

    try {
      const response = await apiClient.getLearningQuestions({
        params: { category_id: category.id.toString() },
      });
      setQuestions(response.learning_questions);
      onOpen();
    } catch (error) {
      errorToast({
        error,
        title: "問題の取得に失敗しました",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [category.id]: false }));
    }
  };

  return (
    <>
      <VStack spacing="6" align="stretch" position="relative">
        {/* 垂直のパス線 */}
        <Box
          position="absolute"
          left="24px"
          top="24px"
          bottom="24px"
          width="2px"
          className="bg-mj-mat-light"
          zIndex={0}
        />

        {categories.map((category, index) => (
          <HStack
            key={index}
            onClick={() => handleCategoryClick(category)}
            gap="6"
            align="center"
            cursor="pointer"
            position="relative"
            zIndex="1">
            {/* ノード（丸） */}
            <Tooltip
              label={
                <VStack gap="1" align="start" p={2}>
                  <Text fontWeight="bold" fontSize="md">
                    {category.name}
                  </Text>
                  <Text fontSize="sm">{category.description}</Text>
                </VStack>
              }
              placement="right"
              hasArrow
              bg="gray.700"
              color="white"
              borderRadius="md"
              p="3">
              <Circle
                size="48px"
                className="bg-mj-mat hover:bg-mj-mat-light"
                color="white"
                fontSize="lg"
                fontWeight="bold"
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{
                  transform: "scale(1.1)",
                }}>
                <Button
                  isLoading={loadingStates[category.id]}
                  colorScheme=""
                  borderRadius="full"
                  fontFamily="sans-serif"
                  fontSize={["md", "lg"]}
                  fontWeight="bold"
                  size="sm">
                  {index + 1}
                </Button>
              </Circle>
            </Tooltip>

            {/* 学習内容 */}
            <Box
              flex="1"
              p="4"
              borderRadius="md"
              transition="all 0.3s"
              _hover={{
                transform: "translateX(3px)",
              }}>
              <Text fontSize={["md", "lg"]} fontWeight="bold" mb={1} className="text-neutral">
                {category.name}
              </Text>
              <Text fontSize="sm" className="text-neutral" opacity="0.8">
                {category.description}
              </Text>
            </Box>
          </HStack>
        ))}

        <Text fontSize="md" fontWeight="bold" className="text-neutral-300" mt="6">
          Coming Soon...
        </Text>
      </VStack>

      {/* 問題表示モーダル */}
      <QuestionsModal isOpen={isOpen} onClose={onClose} questions={questions} />
    </>
  );
}
