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
import { Button } from "@chakra-ui/react";
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
    <div ref={problemCardRef} className="mt-12">
      <div className="text-xl">
        <span className="font-sans font-extralight">
          {new Date(problem.created_at).toLocaleString()}
        </span>
      </div>

      <div className="bg-green-700 rounded-md mt-2 drop-shadow shadow-gray-800">
        <div className="h-10 px-3 pt-2 flex justify-between items-center">
          <Link to={`/users/${problem.user.id}`} className="h-full">
            <div className="h-full font-bold text-lg flex items-center gap-2">
              <div className="h-full aspect-square rounded-full overflow-hidden">
                <img
                  src="https://placehold.jp/150x150.png"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="lg:text-base text-sm">{problem.user.name}</span>
            </div>
          </Link>

          {problem.user.id == myUserId && (
            <div className="flex">
              {/* <Button bgColor="inherit" _hover={{ bgColor: "green.400" }}>
              <MdEdit size={20} color="white" />
            </Button> */}

              <WhatToDiscardProblemDeleteButton problemId={problem.id} />
            </div>
          )}
        </div>

        <div className="lg:mt-5 mt-2 flex flex-col justify-between lg:px-4 px-3">
          <div>
            <div className="md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6">
              <span>{`${problem.round}局`}</span>

              <div>
                <span className="font-sans font-normal">{problem.turn}</span>
                <span>巡目</span>
              </div>

              <span>{`${problem.wind}家`}</span>

              <div className="flex gap-2">
                <span>ドラ:</span>
                <TileImage tile={problem.dora_id} hover={false} />
              </div>
            </div>

            <div className="mt-2 md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4">
              {[
                { label: "東家", point: problem.point_east },
                { label: "南家", point: problem.point_west },
                { label: "西家", point: problem.point_west },
                { label: "北家", point: problem.point_north },
              ].map((obj) => {
                return (
                  <div className="flex gap-1" key={obj.label}>
                    <span>{obj.label}</span>
                    <span className="font-sans font-normal">{obj.point}</span>
                    <span>点</span>
                  </div>
                );
              })}
            </div>

            <div className="flex lg:flex-row-reverse flex-col justify-center gap-4 mt-4">
              <div className="flex lg:flex-col flex-row items-center gap-1">
                <span className="font-bold text-center text-base">
                  <span>ツモ</span>
                  <span className="lg:hidden">:</span>
                </span>

                <PopButton value={<TileImage tile={problem.tsumo_id} />} />
              </div>

              <div className="flex justify-center items-end">
                {problem.hand_ids.slice(0, -1).map((hand_id, index) => {
                  return (
                    <PopButton
                      value={<TileImage tile={hand_id} />}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div
                className={`${isVoteResultOpen && "hidden"} lg:text-xl flex items-center justify-center gap-1 font-medium`}
              >
                <Button
                  bgColor="inherit"
                  color="white"
                  _hover={{ bgColor: "green.400" }}
                  onClick={() => setIsVoteResultOpen(!isVoteResultOpen)}
                >
                  <span>投票結果</span>
                  <FaAngleDown />
                </Button>
              </div>
            </div>
          </div>

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
        </div>

        <div className="mt-4 py-1 rounded-b-md bg-slate-100 text-gray-700">
          <div className="font-bold py-2 flex items-center gap-3 lg:pl-4 pl-2">
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
          </div>

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
        </div>
      </div>
    </div>
  );
}
