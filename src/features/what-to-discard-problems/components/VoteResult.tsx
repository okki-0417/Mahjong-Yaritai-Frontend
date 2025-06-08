"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import { Box, Center, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";
import { IoReloadCircleSharp } from "react-icons/io5";
import { VoteResultType } from "@/src/types/ApiData";
import VoteButton from "@/src/features/what-to-discard-problems/components/VoteButton";
import { MyVoteContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/MyVoteContext";

export default function VoteResult({ problemId }: { problemId: number }) {
	const { myVote } = useContext(MyVoteContext);

	const [voteResult, setVoteResult] = useState<VoteResultType | null>(null);
	const [mostVotedCount, setMostVotedCount] = useState(0);
	const [loadResultFlag, setLoadResultFlag] = useState(true);

	const isMyVotedTileId = (votedTileId: number) => {
		return votedTileId == myVote?.tile.id;
	};

	useEffect(() => {
		if (!loadResultFlag) {
			return;
		}

		const fetchVotes = async () => {
			try {
				const response = await apiClient.post("/graphql", {
					query: `
            query GetWhatToDiscardProblemVoteResult($whatToDiscardProblemId: Int!) {
              whatToDiscardProblemVoteResult(whatToDiscardProblemId: $whatToDiscardProblemId) {
                tileId
                count
              }
            }
          `,
					variables: {
						whatToDiscardProblemId: Number(problemId),
					},
				});

				const data: VoteResultType = response.data.data.whatToDiscardProblemVoteResult;

				setVoteResult(data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error(error.status);
					console.error(error.message);
				} else {
					console.error(error);
				}
			} finally {
				setLoadResultFlag(false);
			}
		};

		fetchVotes();
	}, [loadResultFlag, problemId]);

	useEffect(() => {
		if (!voteResult) {
			return;
		}

		setMostVotedCount(Math.max(...voteResult.map(result => result.count)));
	}, [voteResult]);

	return (
		<Box>
			<Flex justifyContent="end" px={[8, 16]}>
				<IconButton
					aria-label="Reload vote result"
					variant="ghost"
					color="white"
					onClick={() => setLoadResultFlag(true)}>
					<IoReloadCircleSharp size="30" />
				</IconButton>
			</Flex>
			<Center mt={[0, 6]} h={["auto", 280]}>
				<Flex
					flexDir={["column", "row"]}
					justifyContent="center"
					alignItems={["center", "flex-start"]}
					gap="1"
					w="full">
					{loadResultFlag ? (
						<Spinner />
					) : (
						voteResult?.map((result, index) => {
							return (
								<Flex
									flexDir={["row-reverse", "column"]}
									alignItems="center"
									justifyContent="flex-end"
									gap={1}
									key={index}>
									<Flex h={["auto", "52"]} w={["2xs", "auto"]} alignItems="flex-end">
										<Box
											display={["none", "flex"]}
											className={`${
												isMyVotedTileId(result.tileId) ? "bg-sky-400" : "bg-green-400"
											} border border-b-0 rounded-t-sm`}
											w="4"
											justifyContent="center"
											borderColor="white"
											position="relative"
											style={{
												height: `${Math.round((result.count / mostVotedCount) * 100)}%`,
											}}>
											<Text fontFamily="sans-serif" position="absolute" w="fit-content" top="-6">
												{result.count}
											</Text>
										</Box>
										<Box
											display={["block", "none"]}
											className={`${
												isMyVotedTileId(result.tileId) ? "bg-sky-400" : "bg-green-400"
											} border border-l-0 rounded-r-sm`}
											h="4"
											borderColor="white"
											position="relative"
											style={{
												width: `${Math.round((result.count / mostVotedCount) * 100)}%`,
											}}>
											<Text fontFamily="sans-serif" position="absolute" right="-4" top="-1.5">
												{result.count}
											</Text>
										</Box>
									</Flex>
									<VoteButton
										problemId={problemId}
										tileId={result.tileId}
										setLoadResultFlag={setLoadResultFlag}
									/>
								</Flex>
							);
						})
					)}
				</Flex>
			</Center>
		</Box>
	);
}
