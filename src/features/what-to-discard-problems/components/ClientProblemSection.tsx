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
} from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import PopButton from "@/src/components/PopButton";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import ProblemForm from "@/src/features/what-to-discard-problems/components/ProblemForm";

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
  const isLoggedIn = useIsLoggedIn();

  const handleFormOpen = () => {
    if (!isLoggedIn) return onOpenNotLoggedIn();
    return onOpenForm();
  };

  return (
    <Box>
      <PopButton className="btn-circle btn-main mb-8" onClick={handleFormOpen}>
        ＋
      </PopButton>

      <NotLoggedInModal isOpen={isNotLoggedInOpen} onClose={onCloseNotLoggedIn} />

      <Modal isOpen={isFormOpen} onClose={onCloseForm} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent fontFamily="serif">
          <ModalHeader>何切る問題を作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProblemForm setIsCreateFormOpen={onCloseForm} setProblems={setProblems} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack gap="16">
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
