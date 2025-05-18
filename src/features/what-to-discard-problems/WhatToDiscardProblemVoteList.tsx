import { useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "../../lib/apiClients/ApiClients";
import WhatToDiscardProblemVoteButton from "./WhatToDiscardProblemVoteButton";
import { MyVoteType } from "./WhatToDiscardProblemVotesCount";
import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";

export type VotesType = {
  results: { tile_id: number; count: number }[];
  total_count: number;
  current_user_vote_id: number;
};

export default function WhatToDiscardProblemVoteList({
  problemId,
  myVote,
  setMyVote,
  setVotesCount,
}: {
  problemId: number;
  myVote: MyVoteType;
  setMyVote: React.Dispatch<React.SetStateAction<MyVoteType>>;
  setIsVoteResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
  problemCardRef: React.RefObject<HTMLDivElement>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [votes, setVotes] = useState<VotesType | null>(null);
  const [mostVotedCount, setMostVotedCount] = useState(0);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await apiClient.get(
          `/what_to_discard_problems/${problemId}/votes`
        );

        setVotes(response.data.what_to_discard_problem_votes);
        setVotesCount(response.data.what_to_discard_problem_votes.total_count);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.status);
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    };
    fetchVotes();
  }, []);

  useEffect(() => {
    if (votes) {
      setMostVotedCount(
        Math.max(...votes.results.map((result) => result.count))
      );
    }
  }, [votes]);

  return (
    <Center mt={6} h={["auto", 280]}>
      <Flex
        flexDir={["column", "row"]}
        justifyContent="center"
        alignItems={["center", "flex-start"]}
        gap="1"
        w="full"
      >
        {votes ? (
          votes.results.map((result, index) => {
            return (
              <Flex
                flexDir={["row-reverse", "column"]}
                alignItems="center"
                justifyContent="flex-end"
                gap={1}
                key={index}
              >
                <Flex
                  h={["auto", "52"]}
                  w={["2xs", "auto"]}
                  alignItems="flex-end"
                >
                  <Box
                    display={["none", "flex"]}
                    className={`${myVote.tile_id == result.tile_id ? "bg-sky-400" : "bg-green-400"} border border-b-0 rounded-t-sm`}
                    w="4"
                    justifyContent="center"
                    borderColor="white"
                    position="relative"
                    style={{
                      height: `${Math.round((result.count / mostVotedCount) * 100)}%`,
                    }}
                  >
                    <Text
                      fontFamily="sans-serif"
                      position="absolute"
                      w="fit-content"
                      top="-6"
                    >
                      {result.count}
                    </Text>
                  </Box>

                  <Box
                    display={["block", "none"]}
                    className={`${myVote.tile_id == result.tile_id ? "bg-sky-400" : "bg-green-400"} border border-l-0 rounded-r-sm`}
                    h="4"
                    borderColor="white"
                    position="relative"
                    style={{
                      width: `${Math.round((result.count / mostVotedCount) * 100)}%`,
                    }}
                  >
                    <Text
                      fontFamily="sans-serif"
                      position="absolute"
                      right="-4"
                      top="-1.5"
                    >
                      {result.count}
                    </Text>
                  </Box>
                </Flex>

                <WhatToDiscardProblemVoteButton
                  setVotesCount={setVotesCount}
                  problemId={problemId}
                  tileId={result.tile_id}
                  myVote={myVote}
                  setMyVote={setMyVote}
                  setVotes={setVotes}
                />
              </Flex>
            );
          })
        ) : (
          <Spinner />
        )}
      </Flex>
    </Center>
  );
}
