import { FaAngleDown } from "react-icons/fa";
import TileImage from "../../components/TileImage";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { WhatToDiscardProblem } from "../../pages/what-to-discard-problems/page";
import WhatToDiscardProblemLikeButton from "./WhatToDiscardProblemLikeButton";
import PopButton from "../../components/PopButton";
import WhatToDiscardProblemCommentSection from "./WhatToDiscardProblemCommentSection";
import WhatToDiscardProblemVotesCount, {
  MyVoteType,
} from "./WhatToDiscardProblemVotesCount";
import WhatToDiscardProblemVoteList from "./WhatToDiscardProblemVoteList";
import WhatToDiscardProblemCommentsCount from "./WhatToDiscardProblemCommentsCount";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import CloseAccordionButton from "../../components/CloseAccordionButton";
import ToggleWrapper from "../../components/ToggleWrapper";
import WhatToDiscardProblemDeleteButton from "./WhatToDiscardProblemDeleteButton";
import useMyUserId from "../../hooks/useMyUserId";

export default function WhatToDiscardProblemCard({
  problem,
}: {
  problem: WhatToDiscardProblem;
}) {
  const [isVoteResultOpen, setIsVoteResultOpen] = useState(false);
  const [isCommentListOpen, setIsCommentListOpen] = useState(false);

  const [commentsCount, setCommentsCount] = useState(problem.comments_count);
  const [votesCount, setVotesCount] = useState(problem.votes_count);
  const [myVote, setMyVote] = useState<MyVoteType>({ id: null, tile_id: null });

  const problemCardRef = useRef<HTMLDivElement>(null);

  const myUserId = useMyUserId();

  return (
    <Box ref={problemCardRef} mt={12} w="full">
      <Text fontSize="xl">{new Date(problem.created_at).toLocaleString()}</Text>

      <Box boxShadow="base" borderRadius="md" className="bg-green-700">
        <Flex justifyContent="space-between" px="3" pt="2">
          <Link to={`/users/${problem.user.id}`}>
            <HStack>
              <Image
                borderRadius="full"
                objectFit="cover"
                h="8"
                src="https://placehold.jp/150x150.png"
              />

              <Text fontSize="20">{problem.user.name}</Text>
            </HStack>
          </Link>

          {problem.user.id == myUserId && (
            <HStack>
              {/* <Button bgColor="inherit" _hover={{ bgColor: "green.400" }}>
              <MdEdit size={20} color="white" />
            </Button> */}

              <WhatToDiscardProblemDeleteButton problemId={problem.id} />
            </HStack>
          )}
        </Flex>

        <Box px="3" mt="3">
          <HStack fontSize={[18, 20]}>
            <Text>{`${problem.round}局`}</Text>

            <Text>{problem.turn}巡目</Text>

            <Text>{`${problem.wind}家`}</Text>

            <HStack h="8">
              <Text>ドラ:</Text>
              <TileImage tile={problem.dora_id} hover={false} />
            </HStack>
          </HStack>

          <Grid templateColumns="repeat(4,1fr)" fontSize={[18, 20]} mt="2">
            {[
              { label: "東家", point: problem.point_east },
              { label: "南家", point: problem.point_west },
              { label: "西家", point: problem.point_west },
              { label: "北家", point: problem.point_north },
            ].map((obj) => {
              return (
                <GridItem colSpan={[2, 1]}>
                  <HStack key={obj.label}>
                    <Text>{obj.label}</Text>
                    <Text className="font-sans font-normal">{obj.point}点</Text>
                  </HStack>
                </GridItem>
              );
            })}
          </Grid>

          <Flex
            flexDir={["column", "row-reverse"]}
            justifyContent="center"
            gap="3"
            mt="3"
          >
            <Flex flexDir={["row", "column"]} alignItems="center">
              <Text>ツモ</Text>

              <PopButton
                value={<TileImage tile={problem.tsumo_id} />}
                defaultClassName="sm:h-auto h-8"
              />
            </Flex>

            <Flex justifyContent="center" alignItems="flex-end">
              {problem.hand_ids.slice(0, -1).map((hand_id, index) => {
                return (
                  <PopButton value={<TileImage tile={hand_id} />} key={index} />
                );
              })}
            </Flex>
          </Flex>

          <Center mt={[3, 6]}>
            {!isVoteResultOpen && (
              <Button
                bgColor="inherit"
                color="white"
                _hover={{ bgColor: "green.400" }}
                onClick={() => setIsVoteResultOpen(!isVoteResultOpen)}
              >
                投票結果
                <FaAngleDown />
              </Button>
            )}
          </Center>

          <ToggleWrapper flag={isVoteResultOpen}>
            {isVoteResultOpen && (
              <WhatToDiscardProblemVoteList
                problemId={problem.id}
                myVote={myVote}
                setMyVote={setMyVote}
                setIsVoteResultOpen={setIsVoteResultOpen}
                problemCardRef={problemCardRef}
                setVotesCount={setVotesCount}
              />
            )}

            <CloseAccordionButton
              onClick={() => {
                problemCardRef?.current?.scrollIntoView({
                  behavior: "smooth",
                });
                setIsVoteResultOpen(false);
              }}
              arrowColor="white"
            />
          </ToggleWrapper>
        </Box>

        <Box
          mt="4"
          py="2"
          px="4"
          bgColor="white"
          color="gray.700"
          className="rounded-b-md"
        >
          <HStack>
            <WhatToDiscardProblemLikeButton problemId={problem.id} />

            <WhatToDiscardProblemCommentsCount
              commentsCount={commentsCount}
              isCommentListOpen={isCommentListOpen}
              setCommentListOpen={setIsCommentListOpen}
            />

            <WhatToDiscardProblemVotesCount
              problemId={problem.id}
              myVote={myVote}
              setMyVote={setMyVote}
              votesCount={votesCount}
              isVoteResultOpen={isVoteResultOpen}
              setIsVoteResultOpen={setIsVoteResultOpen}
            />
          </HStack>

          <ToggleWrapper flag={isCommentListOpen}>
            <WhatToDiscardProblemCommentSection
              problemId={problem.id}
              isCommentListOpen={isCommentListOpen}
              setIsCommentListOpen={setIsCommentListOpen}
              problemCardRef={problemCardRef}
              setCommentsCount={setCommentsCount}
            />

            <CloseAccordionButton
              onClick={() => {
                problemCardRef?.current?.scrollIntoView({
                  behavior: "smooth",
                });
                setIsCommentListOpen(false);
              }}
            />
          </ToggleWrapper>
        </Box>
      </Box>
    </Box>
  );
}
