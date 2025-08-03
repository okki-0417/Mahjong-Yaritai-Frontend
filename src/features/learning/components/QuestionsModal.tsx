"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Text,
  Button,
  HStack,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

type LearningQuestion = z.infer<typeof schemas.LearningQuestion>;

interface QuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: LearningQuestion[];
}

export function QuestionsModal({ isOpen, onClose, questions }: QuestionsModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // モーダルが開いたときに状態をリセット
  useEffect(() => {
    if (!isOpen) return;
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setIsStarted(false);
  }, [isOpen]);

  if (questions.length == 0) return null;

  const handleStart = () => setIsStarted(true);

  const handleNextQuestion = () => {
    if (currentQuestionIndex == questions.length - 1) return;
    setCurrentQuestionIndex(prev => prev + 1);
    setShowAnswer(false);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex <= 0) return;
    setCurrentQuestionIndex(prev => prev - 1);
    setShowAnswer(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack align="start" spacing={1}>
            <Text fontSize="lg">{questions[0].category.name}</Text>
            <Text fontSize="sm" color="gray.600">
              {questions[0].category.description}
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {(() => {
            if (questions.length == 0) {
              return (
                <Text textAlign="center" py={8} color="gray.500">
                  まだ問題が登録されていません
                </Text>
              );
            } else if (isStarted == false) {
              // スタート画面
              return (
                <VStack spacing={6} align="center" py={8}>
                  <Box textAlign="center">
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      {questions[0].category.name}
                    </Text>
                    <Text color="gray.600" mb={4}>
                      {questions[0].category.description}
                    </Text>
                    <Text fontSize="lg" color="teal.600">
                      全{questions.length}問
                    </Text>
                  </Box>

                  <Button size="lg" colorScheme="teal" onClick={handleStart} px={8}>
                    問題を始める
                  </Button>

                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    問題に答えて、麻雀の知識を深めましょう！
                  </Text>
                </VStack>
              );
            } else {
              // 問題表示
              return (
                <VStack spacing={4} align="stretch">
                  {/* 進捗バー */}
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" color="gray.600">
                        問題 {currentQuestionIndex + 1} / {questions.length}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                      </Text>
                    </HStack>
                    <Progress
                      value={((currentQuestionIndex + 1) / questions.length) * 100}
                      size="sm"
                      colorScheme="teal"
                    />
                  </Box>

                  {/* 問題 */}
                  <Box borderWidth="1px" borderRadius="md" p={6} bg="gray.50">
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                      Q. {questions[currentQuestionIndex].statement}
                    </Text>

                    {/* 答えを見るボタン -> 次の問題へボタン */}
                    {showAnswer ? (
                      <>
                        {/* 次の問題へボタン（最後の問題でなければ） */}
                        {currentQuestionIndex < questions.length - 1 && (
                          <Button
                            onClick={handleNextQuestion}
                            colorScheme="teal"
                            width="full"
                            mb={4}>
                            次の問題へ
                          </Button>
                        )}

                        {/* 答え */}
                        <Box
                          bg="teal.50"
                          mt={4}
                          p={4}
                          borderRadius="md"
                          borderLeft="4px"
                          borderColor="teal.400">
                          <Text fontWeight="bold" color="teal.700">
                            答え:
                          </Text>
                          <Text>{questions[currentQuestionIndex].answer}</Text>
                        </Box>
                      </>
                    ) : (
                      <Button
                        onClick={() => setShowAnswer(true)}
                        colorScheme="teal"
                        variant="outline"
                        width="full"
                        mb={4}>
                        答えを見る
                      </Button>
                    )}
                  </Box>

                  {/* ナビゲーションボタン */}
                  <HStack justify="space-between" mt={4}>
                    <Button
                      onClick={handlePreviousQuestion}
                      isDisabled={currentQuestionIndex === 0}
                      variant="outline">
                      前の問題
                    </Button>

                    {currentQuestionIndex == questions.length - 1 ? (
                      <Button onClick={onClose} colorScheme="teal">
                        学習を終了
                      </Button>
                    ) : (
                      <Box />
                    )}
                  </HStack>
                </VStack>
              );
            }
          })()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
