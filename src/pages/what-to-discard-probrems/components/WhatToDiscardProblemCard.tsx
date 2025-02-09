import { FaAngleDown, FaAngleUp, FaRegComment } from "react-icons/fa";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6"
import TileImage from "./TileImage";
import { HandKeys, TILES_NUM } from "../new/page";
import { WhatToDiscardProblem } from "../index/page";
import { useRef, useState } from "react";
import { MdHowToVote } from "react-icons/md";
import WhatToDiscardProblemCommentCard from "./WhatToDiscardProblemCommentCard";
import { useNavigate } from "react-router";

export default function WhatToDiscardProblemCard({problem}: {problem: WhatToDiscardProblem}) {
  const [liked, setLiked] = useState<boolean>(false);
  const [commentVisible, setCommentVisible] = useState<boolean>(false);
  const [voted, setVoted] = useState<boolean>(false);
  const [voteResultVisible, setVoteResultVisible] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  return (
    <div ref={ref} className="mt-12">
      <div className="text-xl">
        <span className="font-sans font-extralight">
          21:05 2025-02-08
        </span>
      </div>

      <div className="bg-green-700 rounded-md overflow-hidden mt-2">
        <div className="lg:mt-2 mt-1 lg:h-10 h-9 lg:pl-4 pl-3 pt-2 flex justify-between items-center">
          <button onClick={() => {navigate("/users/1")}} className="h-full">
            <div className="h-full font-bold text-lg flex items-center gap-2">
              <div className="h-full aspect-square rounded-full overflow-hidden">
                <img src="https://placehold.jp/150x150.png" className="h-full w-full object-cover" />
              </div>
              <span className="lg:text-base text-sm">村井 オウキ</span>
            </div>
          </button>
        </div>

        <div className="lg:mt-5 mt-2 flex flex-col justify-between lg:px-4 px-3">
          <button onClick={() => setVoteResultVisible(!voteResultVisible)}>

            <div className="md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6">
              <span>{`${problem.round}局`}</span>
              <span>
                <span className="font-sans font-normal">{problem.turn}</span>
                <span>巡目</span>
              </span>
              <span>{`${problem.wind}家`}</span>
              <div className="flex gap-2">
                <span>ドラ:</span>
                <TileImage tile={problem.dora} />
              </div>
            </div>

            <div className="mt-2 md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4">
              <div className="flex gap-1">
                <span>東家</span>
                <span className="font-sans font-normal">
                  {problem.point_east}00
                </span>
                <span>点</span>
              </div>
              <div className="flex gap-1">
                <span>南家</span>
                <span className="font-sans font-normal">
                  {problem.point_south}00
                </span>
                <span>点</span>
              </div>
              <div className="flex gap-1">
                <span>西家</span>
                <span className="font-sans font-normal">
                  {problem.point_south}00
                </span>
                <span>点</span>
              </div>
              <div className="flex gap-1">
                <span>北家</span>
                <span className="font-sans font-normal">
                  {problem.point_north}00
                </span>
                <span>点</span>
              </div>
            </div>

            <div className="flex lg:flex-row-reverse flex-col justify-center gap-4 mt-4">
              <div className="flex lg:flex-col flex-row items-center gap-1">
                <span className="font-bold text-center text-base">
                  <span>ツモ</span>
                  <span className="lg:hidden">:</span>
                </span>

                <div className="lg:w-12 w-6">
                  <TileImage tile={problem.tsumo} />
                </div>
              </div>

              <div className="flex justify-center items-end">
                {Array(TILES_NUM)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <div key={index} className="w-12">
                        <TileImage tile={problem[`hand${index + 1}` as HandKeys]} />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className={`${voteResultVisible && "opacity-0"} lg:text-xl flex items-center justify-center gap-1 font-medium`}>
                <span>投票結果</span>
                <FaAngleDown />
              </div>
            </div>
          </button>

          <div>
            <div className={`${voteResultVisible ? "max-h-screen" : "max-h-0"} overflow-hidden transition-all`}>
              <div className="flex justify-center">
                <div className="max-w-fit flex lg:flex-row flex-col lg:justify-center items-start gap-2">
                  {Array(TILES_NUM)
                    .fill(null)
                    .map((_, index) => {
                      return (
                        <div key={index} className="flex lg:flex-col flex-row-reverse items-center gap-2">
                          <div className="lg:block flex flex-row-reverse items-center gap-2">
                            <span className="font-sans">23</span>
                            <div className="lg:h-32 h-4 lg:w-4 w-32 bg-white"></div>
                          </div>
                          <div className="lg:h-12 h-8 hover:scale-110 transition-all">
                            <TileImage tile={problem[`hand${index + 1}` as HandKeys]} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button onClick={() => {
                  ref?.current?.scrollIntoView({ behavior: "smooth" });
                  setVoteResultVisible(false);
                }}>
                  <FaAngleUp color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 py-1 overflow-hidden bg-slate-100 text-gray-700">
          <div className="font-bold py-2 flex items-center gap-3 lg:pl-4 pl-2">
            <button onClick={() => {setLiked(!liked)}}>
              <div className="flex items-center gap-1">
                {liked ?
                  <FaThumbsUp color="#f765d6" size={24} /> :
                  <FaRegThumbsUp color="#333" size={24}/>}
                <div className="font-sans lg:text-lg">13</div>
              </div>
            </button>
            <button onClick={() => {setCommentVisible(!commentVisible)}}>
              <div className="flex items-center gap-1">
                <FaRegComment color="#333" size={24} />
                <div className="font-sans lg:text-lg">13</div>
              </div>
            </button>
            <button
              onClick={() => {setVoteResultVisible(true)}}
            >
              <div className="flex items-center gap-1">
                {voted ?
                  <MdHowToVote color="#06c5ff" size={26} /> :
                  <MdHowToVote color="#333" size={26} />
                  }
                <div className="font-sans lg:text-lg">13</div>
              </div>
            </button>
          </div>

          <div className={`${commentVisible ? "max-h-[9999px]" : "max-h-0"} overflow-hidden lg:px-2 px-1 transition-all`}>
            <div className="mt-4">
              <WhatToDiscardProblemCommentCard />
              <WhatToDiscardProblemCommentCard />
              <WhatToDiscardProblemCommentCard />
              <WhatToDiscardProblemCommentCard />
            </div>

            <div className="flex justify-center mt-4 mb-2">
              <button onClick={() => {
                ref?.current?.scrollIntoView({ behavior: "smooth" });
                setCommentVisible(false);
              }}>
                <FaAngleUp color="#333" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
