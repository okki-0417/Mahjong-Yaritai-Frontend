import { FaAngleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemVoteButton from "./WhatToDiscardProblemVoteButton";
import { Button, Flex } from "@chakra-ui/react";
import { MyVoteType } from "./WhatToDiscardProblemVotesCount";

export type VotesType = {
  results: { tile_id: number; count: number }[];
  total_count: number;
  current_user_vote_id: number;
};

export default function WhatToDiscardProblemVoteList({
  problemId,
  myVote,
  setMyVote,
  setIsVoteResultOpen,
  problemCardRef,
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
    <div>
      <div className="flex justify-center">
        <div className="max-w-fit flex lg:flex-row flex-col lg:justify-center items-start gap-2">
          {votes?.results.map((result, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex flex-col justify-end items-center h-40">
                  <div className="font-sans text-center grow-0">
                    {result.count}
                  </div>

                  <div
                    className={`${myVote.tile_id == result.tile_id ? "bg-sky-400" : "bg-green-400"} lg:w-4 border border-white border-b-0 rounded-t-sm`}
                    style={{
                      height: `${Math.round((result.count / mostVotedCount) * 100)}%`,
                    }}
                  />
                </div>

                <WhatToDiscardProblemVoteButton
                  setVotesCount={setVotesCount}
                  problemId={problemId}
                  tileId={result.tile_id}
                  myVote={myVote}
                  setMyVote={setMyVote}
                  setVotes={setVotes}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Flex justify="center" mt={3}>
        <Button
          bgColor="inherit"
          _hover={{ bgColor: "green.400" }}
          onClick={() => {
            problemCardRef?.current?.scrollIntoView({
              behavior: "smooth",
            });
            setIsVoteResultOpen(false);
          }}
        >
          <FaAngleUp color="white" />
        </Button>
      </Flex>
    </div>
  );
}
