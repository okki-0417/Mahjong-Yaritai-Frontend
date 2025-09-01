"use client";

import LoadNextPageProblemButton from "@/src/features/what-to-discard-problems/components/LoadNextPageProblemButton";
import ProblemCard from "@/src/features/what-to-discard-problems/components/ProblemCard";
import {
  Box,
  Flex,
  useDisclosure,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import PopButton from "@/src/components/PopButton";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import ProblemForm from "@/src/features/what-to-discard-problems/components/ProblemForm";
import { SessionContext } from "@/src/features/what-to-discard-problems/context-providers/SessionContextProvider";

export default function ClientProblemSection({
  initialProblems,
  initialCursor,
}: {
  initialProblems: z.infer<typeof schemas.WhatToDiscardProblem>[];
  initialCursor: z.infer<typeof schemas.CursorPagination>;
}) {
  const [problems, setProblems] =
    useState<z.infer<typeof schemas.WhatToDiscardProblem>[]>(initialProblems);
  const [cursor, setCursor] =
    useState<z.infer<typeof schemas.CursorPagination | null>>(initialCursor);

  const {
    onOpen: onOpenNotLoggedIn,
    isOpen: isNotLoggedInOpen,
    onClose: onCloseNotLoggedIn,
  } = useDisclosure();
  const { onOpen: onOpenForm, isOpen: isFormOpen, onClose: onCloseForm } = useDisclosure();

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const handleFormOpen = () => {
    if (!isLoggedIn) return onOpenNotLoggedIn();
    return onOpenForm();
  };

  const handleFormClose = () => {
    const isConfirmed = window.confirm("フォームを閉じますか？入力内容は保存されません。");

    if (isConfirmed) onCloseForm();
  };

  return (
    <Box>
      <PopButton
        className="fixed bottom-5 right-5 size-18 btn-circle btn-main z-40 shadow-lg shadow-gray-700"
        onClick={handleFormOpen}>
        <Text as="span" fontSize="3xl" fontWeight="bold">
          ＋
        </Text>
      </PopButton>

      <NotLoggedInModal isOpen={isNotLoggedInOpen} onClose={onCloseNotLoggedIn} />

      <Modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isOpen={isFormOpen}
        onClose={onCloseForm}
        size="xl"
        scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent fontFamily="serif">
          <ModalHeader>何切る問題を作成</ModalHeader>
          <ModalCloseButton onClick={handleFormClose} />
          <ModalBody>
            <ProblemForm setIsCreateFormOpen={onCloseForm} setProblems={setProblems} />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>

      <VStack gap={["8", "16"]}>
        {problems.map(problem => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </VStack>

      <Flex justify="center" mt={5}>
        <LoadNextPageProblemButton setProblem={setProblems} cursor={cursor} setCursor={setCursor} />
      </Flex>
    </Box>
  );
}
