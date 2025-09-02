"use client";

import LoadNextPageProblemButton from "@/src/features/what-to-discard-problems/components/LoadNextPageProblemButton";
import ProblemCard from "@/src/features/what-to-discard-problems/components/ProblemCard";
import { Box, Flex, useDisclosure, VStack, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import PopButton from "@/src/components/PopButton";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { SessionContext } from "@/src/features/what-to-discard-problems/context-providers/SessionContextProvider";
import ProblemCreateFormModal from "@/src/features/what-to-discard-problems/components/ProblemCreateFormModal";
import { ProblemsContext } from "@/src/features/what-to-discard-problems/context-providers/ProblemsContextProvider";

export default function ClientProblemSection({
  initialCursor,
}: {
  initialCursor: z.infer<typeof schemas.CursorPagination>;
}) {
  const { problems, setProblems } = useContext(ProblemsContext);
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

      <ProblemCreateFormModal isOpen={isFormOpen} onClose={onCloseForm} setProblems={setProblems} />

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
