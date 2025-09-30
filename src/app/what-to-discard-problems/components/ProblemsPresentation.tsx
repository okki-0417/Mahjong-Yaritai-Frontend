"use client";

import LoadNextPageProblemButton from "@/src/app/what-to-discard-problems/components/LoadNextPageProblemButton";
import ProblemCard from "@/src/app/what-to-discard-problems/components/ProblemCard";
import { Box, Flex, useDisclosure, VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CursorPaginationType } from "@/src/lib/types/schema-compat";
import PopButton from "@/src/components/PopButton";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import ProblemCreateFormModal from "@/src/app/what-to-discard-problems/components/ProblemCreateFormModal";
import { ProblemsContext } from "@/src/app/what-to-discard-problems/context-providers/ProblemsContextProvider";

export default function ClientProblemSection({
  initialCursor,
  graphqlProblems = [],
}: {
  initialCursor: CursorPaginationType;
  // GraphQLのWhatToDiscardProblem型の配列
  graphqlProblems?: any[];
}) {
  const { problems, setProblems } = useContext(ProblemsContext);
  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const {
    onOpen: onOpenNotLoggedIn,
    isOpen: isNotLoggedInOpen,
    onClose: onCloseNotLoggedIn,
  } = useDisclosure();
  const { onOpen: onOpenForm, isOpen: isFormOpen, onClose: onCloseForm } = useDisclosure();

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
        {problems.map((problem, index) => {
          // GraphQLデータがあればそれを渡す
          const graphqlProblem = graphqlProblems[index];
          return <ProblemCard key={problem.id} problem={problem} graphqlProblem={graphqlProblem} />;
        })}
      </VStack>

      <Flex justify="center" mt={5}>
        <LoadNextPageProblemButton setProblem={setProblems} initialCursor={initialCursor} />
      </Flex>
    </Box>
  );
}
