import { useEffect, useState } from "react";
import { BASEURL } from "../../../api-config";
import { HandKeys, TILE_TYPES_NUM, TILES_NUM } from "../new/page";
import { Link } from "react-router";
import NoContent from "./no-content";
import { loadTile } from "../[:id]/page";

export type WhatToDiscardProblem = {
  id: number,
  round: number,
  turn: number,
  wind: string,
  dora: number,
  point_east: number,
  point_south: number,
  point_west: number,
  point_north: number,
  hand1: number,
  hand2: number,
  hand3: number,
  hand4: number,
  hand5: number,
  hand6: number,
  hand7: number,
  hand8: number,
  hand9: number,
  hand10: number,
  hand11: number,
  hand12: number,
  hand13: number,
  tsumo: number,
}

export default function IndexWhatToDiscardProblems() {
  const [whatToDiscardProblems, setWhatToDiscardProblems] = useState<WhatToDiscardProblems>([])
  const [tileImagePaths, setTileImagePaths] = useState<string[]>([]);

  type WhatToDiscardProblems = WhatToDiscardProblem[];

  const drawTile = (id: number) => {
    const path = tileImagePaths[Number(id) - 1];
    return (
      <img src={path} />
    )
  };

  useEffect(() => {
    const getWhatToDiscardProblems = async () => {
      const response = await fetch(`${BASEURL}/what_to_discard_problems`)
      const data = await response.json();
      setWhatToDiscardProblems(data.what_to_discard_problems)

      const paths = await Promise.all(Array(TILE_TYPES_NUM).fill(null).map(async (_, index) => await loadTile(index + 1)))
      setTileImagePaths(paths);
    }

    getWhatToDiscardProblems();
  }, []);

  return (
    <div>
      {whatToDiscardProblems.length ?
        whatToDiscardProblems.map((problem) => (
        <Link to={`/what-to-discard-problems/${problem.id}`} key={problem.id}>
          <div className="w-4/5 mx-auto flex flex-col justify-between mt-8 min-h-40 bg-green-700 rounded-md px-4 py-2">
            <div className="md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6">
              <span>{`${problem.round}局`}</span>
              <span>{`${problem.turn}巡目`}</span>
              <span>{`${problem.wind}家`}</span>
              <div className="flex gap-2">
                <span>ドラ:</span>
                {drawTile(problem.dora)}
              </div>
            </div>
            <div className="md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4">
              <span>{`東家:${problem.point_east}00点`}</span>
              <span>{`南家:${problem.point_south}00点`}</span>
              <span>{`西家:${problem.point_west}00点`}</span>
              <span>{`北家:${problem.point_north}00点`}</span>
            </div>
            <div className="flex justify-center items-end mt-6">
              {Array(TILES_NUM).fill(null).map((_, index) => {
                return (
                  <div key={index} className="w-12">
                    {drawTile(problem[`hand${index + 1}` as HandKeys])}
                  </div>
                )
              })}
              <div  className="w-12 ml-4 flex flex-col">
                <span className="font-bold text-center md:text-base text-[10px]">ツモ</span>
                {drawTile(problem.tsumo)}
              </div>
            </div>
          </div>
        </Link>
      ))
      : <NoContent />}
    </div>
  );
}
