import { useEffect, useState } from "react";
import { BASEURL } from "../../../api-config";
import { useParams } from "react-router";
import { WhatToDiscardProblem } from "../index/page";
import { HandKeys, TILES_NUM } from "../new/page";

export default function ShowWhatToDiscardProblems() {
  const [whatToDiscardProblem, setWhatToDiscardProblem] = useState<WhatToDiscardProblem>()
  const { id } = useParams();
  const drawTile = (id: number) => {
    return (
      <img src={`/dist/tiles/${Number(id)}.png`} />
    )
  };

  useEffect(() => {
    const getWhatToDiscardProblems = async () => {
      const response = await fetch(`${BASEURL}/what_to_discard_problems/${id}`)

      const data = await response.json();
      console.log(`DATA: ${JSON.stringify(data)}`);

      setWhatToDiscardProblem(data.what_to_discard_problem)
    }

    getWhatToDiscardProblems();
  }, []);

  return (
    <div>
      <div className="w-4/5 mx-auto flex flex-col justify-between mt-8 min-h-40 bg-green-700 rounded-md px-4 py-2">
        <div className="md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6">
          <span>{`${whatToDiscardProblem?.round}局`}</span>
          <span>{`${whatToDiscardProblem?.turn}巡目`}</span>
          <span>{`${whatToDiscardProblem?.wind}家`}</span>
          <div className="flex gap-2">
            <span>ドラ:</span>
            {whatToDiscardProblem?.dora && drawTile(whatToDiscardProblem.dora)}
          </div>
        </div>
        <div className="md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4">
          <span>{`東家:${whatToDiscardProblem?.point_east}00点`}</span>
          <span>{`南家:${whatToDiscardProblem?.point_south}00点`}</span>
          <span>{`西家:${whatToDiscardProblem?.point_west}00点`}</span>
          <span>{`北家:${whatToDiscardProblem?.point_north}00点`}</span>
        </div>
        <div className="flex justify-center items-end mt-6">
          {Array(TILES_NUM).fill(null).map((_, index) => {
            return (
              <div key={index} className="w-12">
                {whatToDiscardProblem && whatToDiscardProblem[`hand${index + 1}` as HandKeys]
                  && drawTile(whatToDiscardProblem[`hand${index + 1}` as HandKeys])}
              </div>
            )
          })}
          <div  className="w-12 ml-4 flex flex-col">
            <span className="font-bold text-center md:text-base text-[10px]">ツモ</span>
            {whatToDiscardProblem?.tsumo && drawTile(whatToDiscardProblem?.tsumo)}
          </div>
        </div>
      </div>
    </div>
  )
}
