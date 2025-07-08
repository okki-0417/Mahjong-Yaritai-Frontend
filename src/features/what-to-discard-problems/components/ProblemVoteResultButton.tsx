import PopButton from "@/src/components/PopButton";
import { schemas } from "@/src/zodios/api";
import { HStack, Text } from "@chakra-ui/react";
import { MdHowToVote } from "react-icons/md";
import { z } from "zod";

export default function ProblemVoteResultButton({
  problem,
  initialMyVote,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  initialMyVote: z.infer<typeof schemas.WhatToDiscardProblemVote>;
}) {
  return (
    <PopButton>
      <HStack>
        {initialMyVote ? (
          <MdHowToVote color="#0080ff" size={26} />
        ) : (
          <MdHowToVote color="#333" size={26} />
        )}
        <Text fontFamily="sans-serif" fontWeight="bold">
          {problem.votes_count}
        </Text>
      </HStack>
    </PopButton>
  );
}
