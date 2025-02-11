import { FaAngleDown, FaAngleUp, FaRegComment } from "react-icons/fa";
import TileImage from "./TileImage";
import { useRef, useState } from "react";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router";
import WhatToDiscardProblemCommentList from "./WhatToDiscardProblemCommentList";
import { WhatToDiscardProblem } from "../page";
import WhatToDiscardProblemLikeButton from "../../../features/what-to-discard-problems/WhatToDiscardProblemLikeButton";
import PopButton from "../../../components/PopButton";

export const TILES_NUM = 13;
export const TILE_TYPES_NUM = 34;
export const MAX_ROUND = 18;
export type HandKeys = `hand${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13}`;

type TileSpecies = "萬子" | "筒子" | "索子" | "字牌";

type Tile = {
  id: number;
  name: string;
};

type Tiles = {
  species: TileSpecies;
  tiles: Tile[];
}[];

const tiles: Tiles = [
  {
    species: "萬子",
    tiles: [
      { id: 1, name: "一萬" },
      { id: 2, name: "二萬" },
      { id: 3, name: "三萬" },
      { id: 4, name: "四萬" },
      { id: 5, name: "五萬" },
      { id: 6, name: "六萬" },
      { id: 7, name: "七萬" },
      { id: 8, name: "八萬" },
      { id: 9, name: "九萬" },
    ],
  },
  {
    species: "筒子",
    tiles: [
      { id: 10, name: "一筒" },
      { id: 11, name: "二筒" },
      { id: 12, name: "三筒" },
      { id: 13, name: "四筒" },
      { id: 14, name: "五筒" },
      { id: 15, name: "六筒" },
      { id: 16, name: "七筒" },
      { id: 17, name: "八筒" },
      { id: 18, name: "九筒" },
    ],
  },
  {
    species: "索子",
    tiles: [
      { id: 19, name: "一索" },
      { id: 20, name: "二索" },
      { id: 21, name: "三索" },
      { id: 22, name: "四索" },
      { id: 23, name: "五索" },
      { id: 24, name: "六索" },
      { id: 25, name: "七索" },
      { id: 26, name: "八索" },
      { id: 27, name: "九索" },
    ],
  },
  {
    species: "字牌",
    tiles: [
      { id: 28, name: "東" },
      { id: 29, name: "南" },
      { id: 30, name: "西" },
      { id: 31, name: "北" },
      { id: 32, name: "白" },
      { id: 33, name: "發" },
      { id: 34, name: "中" },
    ],
  },
];

export default function WhatToDiscardProblemCard({problem}: {problem: WhatToDiscardProblem}) {
  const [commentVisible, setCommentVisible] = useState<boolean>(false);
  const [voted, setVoted] = useState<boolean>(false);
  const [voteResultVisible, setVoteResultVisible] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="mt-12">
      <div className="text-xl">
        <span className="font-sans font-extralight">
          {new Date(problem.created_at).toLocaleString()}
        </span>
      </div>

      <div className="bg-green-700 rounded-md overflow-hidden mt-2">
        <div className="lg:mt-2 mt-1 lg:h-10 h-9 lg:pl-4 pl-3 pt-2 flex justify-between items-center">
          <Link to={`/users/${problem.user.id}`} className="h-full">
            <div className="h-full font-bold text-lg flex items-center gap-2">
              <div className="h-full aspect-square rounded-full overflow-hidden">
                <img src="https://placehold.jp/150x150.png" className="h-full w-full object-cover" />
              </div>
              <span className="lg:text-base text-sm">{problem.user.name}</span>
            </div>
          </Link>
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
                <TileImage tile={problem.dora} hover={false} />
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

                <PopButton value={
                  <div className="lg:w-12 w-6">
                    <TileImage tile={problem.tsumo} />
                  </div>}
                />
              </div>

              <div className="flex justify-center items-end">
                {Array(TILES_NUM)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <PopButton value={
                        <div key={index} className="w-12">
                          <TileImage tile={problem[`hand${index + 1}` as HandKeys]} />
                        </div>
                      } />
                    );
                  })}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className={`${voteResultVisible && "opacity-0"} lg:text-xl flex items-center justify-center gap-1 font-medium`}>
                <div className="w-fit animate-bounce flex items-center gap-1">
                  <span>投票結果</span>
                  <FaAngleDown />
                </div>
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
                          <PopButton value={
                            <div className="lg:h-12 h-8">
                              <TileImage tile={problem[`hand${index + 1}` as HandKeys]} />
                            </div>}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>

              <button onClick={() => {
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

        <div className="mt-4 py-1 overflow-hidden bg-slate-100 text-gray-700">
          <div className="font-bold py-2 flex items-center gap-3 lg:pl-4 pl-2">
            <WhatToDiscardProblemLikeButton likes={problem.likes}  />

            <PopButton value={
              <div onClick={() => {setCommentVisible(!commentVisible)}}>
                <div className="flex items-center gap-1">
                  <FaRegComment color="#333" size={24} />
                  <div className="font-sans lg:text-lg">13</div>
                </div>
              </div>}
              defaultClassName="pt-1"
            />

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
              <WhatToDiscardProblemCommentList problemId={problem.id} />
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
