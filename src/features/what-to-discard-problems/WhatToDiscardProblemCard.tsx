import { FaAngleDown, FaAngleUp, FaRegComment } from "react-icons/fa";
import TileImage from "../../components/TileImage";
import { useRef, useState } from "react";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router";
import { WhatToDiscardProblem } from "../../pages/what-to-discard-problems/page";
import WhatToDiscardProblemLikeButton from "./WhatToDiscardProblemLikeButton";
import PopButton from "../../components/PopButton";
import WhatToDiscardProblemCommentSection from "./WhatToDiscardProblemCommentSection";
import WhatToDiscardProblemVoteButton from "./WhatToDiscardProblemVoteButton";

export default function WhatToDiscardProblemCard({
  problem,
}: {
  problem: WhatToDiscardProblem;
}) {
  const [commentVisible, setCommentVisible] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voteResultVisible, setVoteResultVisible] = useState(false);
  const [votedTileId, setVotedTileId] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="mt-12">
      <div className="text-xl">
        <span className="font-sans font-extralight">
          {new Date(problem.created_at).toLocaleString()}
        </span>
      </div>

      <div className="bg-green-700 rounded-md mt-2 drop-shadow shadow-gray-800">
        <div className="lg:mt-2 mt-1 lg:h-10 h-9 lg:pl-4 pl-3 pt-2 flex justify-between items-center">
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
                <TileImage tile={problem.dora} hover={false} />
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

                <WhatToDiscardProblemVoteButton
                  tileId={problem.tsumo}
                  problemId={problem.id}
                  setVoted={setVoted}
                  votedTileId={votedTileId}
                  setVotedTileId={setVotedTileId}
                />
              </div>

              <div className="flex justify-center items-end">
                {problem.hands.map((hand, index) => {
                  return (
                    <PopButton
                      value={<TileImage tile={hand.value} />}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div
                className={`${voteResultVisible && "opacity-0"} lg:text-xl flex items-center justify-center gap-1 font-medium`}
              >
                <button
                  className="w-fit animate-bounce flex items-center gap-1 z-0"
                  onClick={() => setVoteResultVisible(!voteResultVisible)}
                >
                  <span>投票結果</span>
                  <FaAngleDown />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`${voteResultVisible ? "max-h-screen" : "max-h-0"} overflow-hidden transition-all`}
            >
              <div className="flex justify-center">
                <div className="max-w-fit flex lg:flex-row flex-col lg:justify-center items-start gap-2">
                  {problem.hands.map((hand, index) => {
                    return (
                      <div
                        key={index}
                        className="flex lg:flex-col flex-row-reverse items-center gap-2"
                      >
                        <div className="lg:block flex flex-row-reverse items-center gap-2">
                          <span className="font-sans">23</span>
                          <div className="lg:h-32 h-4 lg:w-4 w-32 bg-white"></div>
                        </div>
                        <PopButton
                          value={
                            <div className="lg:h-12 h-8">
                              <TileImage tile={hand.value} />
                            </div>
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  ref?.current?.scrollIntoView({ behavior: "smooth" });
                  setVoteResultVisible(false);
                }}
                className="w-full flex justify-center mt-6"
              >
                <FaAngleUp color="white" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 py-1 rounded-b-md bg-slate-100 text-gray-700">
          <div className="font-bold py-2 flex items-center gap-3 lg:pl-4 pl-2">
            <WhatToDiscardProblemLikeButton likes={problem.likes} />

            <PopButton
              value={
                <div className="flex items-center gap-1">
                  <FaRegComment color="#333" size={24} />
                  <div className="font-sans lg:text-lg">
                    {problem.comments_count}
                  </div>
                </div>
              }
              onClick={() => {
                setCommentVisible(!commentVisible);
              }}
              defaultClassName="pt-1"
            />

            <button
              onClick={() => {
                setVoteResultVisible(true);
              }}
            >
              <div className="flex items-center gap-1">
                {voted ? (
                  <MdHowToVote color="#06c5ff" size={26} />
                ) : (
                  <MdHowToVote color="#333" size={26} />
                )}
                <div className="font-sans lg:text-lg">13</div>
              </div>
            </button>
          </div>

          <div
            className={`${commentVisible ? "max-h-[9999px]" : "max-h-0"} overflow-hidden lg:px-2 px-1 transition-all`}
          >
            <div className="mt-4">
              <WhatToDiscardProblemCommentSection problemId={problem.id} />
            </div>

            <div className="flex justify-center mt-4 mb-2">
              <button
                onClick={() => {
                  ref?.current?.scrollIntoView({ behavior: "smooth" });
                  setCommentVisible(false);
                }}
              >
                <FaAngleUp color="#333" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
