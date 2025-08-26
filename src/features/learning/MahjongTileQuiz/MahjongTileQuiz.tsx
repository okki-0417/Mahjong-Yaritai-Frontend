"use client";

import TileImage from "@/src/components/TileImage";
import Quizzes from "@/src/features/learning/MahjongTileQuiz/quizzes.json";
import { Box, Button, HStack, Text, Wrap } from "@chakra-ui/react";
import { useState } from "react";

export default function MahjongTileQuiz() {
  const [answerVisible, setAnswerVisible] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);

  const shuffledQuizzes = Quizzes.quizzes;

  const handleNextQuiz = () => {
    setQuizIndex(quizIndex + 1);
    setAnswerVisible(false);
  };

  const handlePrevQuiz = () => {
    setQuizIndex(quizIndex - 1);
    setAnswerVisible(false);
  };

  return (
    <Box borderRadius="md" bgColor="blackAlpha.300" p="4">
      {shuffledQuizzes.length > 0 && (
        <Box>
          <Text as="h3" fontSize={["lg", "xl"]}>
            Q. {shuffledQuizzes[quizIndex].question}
          </Text>

          <Wrap mt="3">
            {shuffledQuizzes[quizIndex].tileIds.map((tileId, index) => (
              <TileImage key={index} tileId={tileId} />
            ))}
          </Wrap>
        </Box>
      )}

      <HStack justify="end" mt="2">
        <Button
          onClick={handlePrevQuiz}
          size={["sm", "md"]}
          colorScheme="whiteAlpha"
          disabled={quizIndex == 0}>
          前の問題へ
        </Button>

        {answerVisible ? (
          <Button onClick={handleNextQuiz} size={["sm", "md"]}>
            次の問題へ
          </Button>
        ) : (
          <Button onClick={() => setAnswerVisible(true)} colorScheme="green" size={["sm", "md"]}>
            答えを見る
          </Button>
        )}
      </HStack>

      <Text fontSize={["lg", "xl"]} className={`${answerVisible ? "" : "hidden"}`} mt="2">
        A. {answerVisible && shuffledQuizzes[quizIndex].answer}
      </Text>
    </Box>
  );
}
