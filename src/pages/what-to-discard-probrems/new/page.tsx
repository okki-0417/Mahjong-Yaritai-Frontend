import { SubmitHandler, useForm } from "react-hook-form";
import { BASEURL } from "../../../api-config";
import { useEffect, useState } from "react";
import { Errors } from "../../../components/render-errors";
import { useNavigate } from "react-router";
import { loadTile } from "../[:id]/page";

export const TILES_NUM = 13;
export const TILE_TYPES_NUM = 34;
export const MAX_ROUND = 18;
export type HandKeys = `hand${ 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 }`;

export default function NewWhatToDiscardProblems() {
  type TileSpecies = "萬子" | "筒子" | "索子" | "字牌"

  type Tile = {
      id: number;
      name: string;
  }

  type Tiles = {
    species: TileSpecies;
    tiles: Tile[];
  }[]

  const tiles: Tiles = [
    {
      "species": "萬子",
      "tiles": [
        { "id": 1, "name": "一萬" },
        { "id": 2, "name": "二萬" },
        { "id": 3, "name": "三萬" },
        { "id": 4, "name": "四萬" },
        { "id": 5, "name": "五萬" },
        { "id": 6, "name": "六萬" },
        { "id": 7, "name": "七萬" },
        { "id": 8, "name": "八萬" },
        { "id": 9, "name": "九萬" },
      ],
    },
    {
      "species": "筒子",
      "tiles": [
        { "id": 10, "name": "一筒" },
        { "id": 11, "name": "二筒" },
        { "id": 12, "name": "三筒" },
        { "id": 13, "name": "四筒" },
        { "id": 14, "name": "五筒" },
        { "id": 15, "name": "六筒" },
        { "id": 16, "name": "七筒" },
        { "id": 17, "name": "八筒" },
        { "id": 18, "name": "九筒" },
      ],
    },
    {
      "species": "索子",
      "tiles": [
        { "id": 19, "name": "一索" },
        { "id": 20, "name": "二索" },
        { "id": 21, "name": "三索" },
        { "id": 22, "name": "四索" },
        { "id": 23, "name": "五索" },
        { "id": 24, "name": "六索" },
        { "id": 25, "name": "七索" },
        { "id": 26, "name": "八索" },
        { "id": 27, "name": "九索" },
      ]
    },
    {
      "species": "字牌",
      "tiles": [
        { "id": 28, "name": "東" },
        { "id": 29, "name": "南" },
        { "id": 30, "name": "西" },
        { "id": 31, "name": "北" },
        { "id": 32, "name": "白" },
        { "id": 33, "name": "發" },
        { "id": 34, "name": "中" },
      ],
    },
  ];

  const [resErrors, setResErrors] = useState<Errors[]>([]);
  const navigate = useNavigate();

  type WhatToDiscardProblem = {
    round: string;
    turn: string;
    wind: string;
    dora: string;
    point_east: string;
    point_south: string;
    point_west: string;
    point_north: string;

    hand1: string;
    hand2: string;
    hand3: string;
    hand4: string;
    hand5: string;
    hand6: string;
    hand7: string;
    hand8: string;
    hand9: string;
    hand10: string;
    hand11: string;
    hand12: string;
    hand13: string;

    tsumo: string;
  };

  const [tileImagePaths, setTileImagePaths] = useState<string[]>([]);

  useEffect(() => {
    const getTileImagePaths = async () => {
      const paths = await Promise.all(Array(TILE_TYPES_NUM).fill(null).map(async (_, index) => await loadTile(index + 1)))
      setTileImagePaths(paths);
    }

    getTileImagePaths();
  }, []);

  const drawTile = (id: string) => {
    const path = tileImagePaths[Number(id) - 1];
    return (
      <img src={path} />
    )
  };

  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<WhatToDiscardProblem>();

  const onSubmit: SubmitHandler<WhatToDiscardProblem> =  async (formData) => {
    const csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

    const response = await fetch(`${BASEURL}/what_to_discard_problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken || "",
      },
      credentials: "include",
      body: JSON.stringify({ what_to_discard_problem: formData }),
    });

    if (!response.ok) {
      setResErrors([...resErrors, (await response.json())?.errors]);
    }

    const data = await response.json();

    navigate(`/what-to-discard-problems/${data.what_to_discard_problem.id}`);
  };

  return (
    <div className="lg:w-4/5 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mt-8 lg:text-4xl text-2xl text-center">何切る問題を作る</h1>

        <div className="flex flex-col justify-between mt-8 min-h-40 bg-green-700 text-white rounded-md px-4 py-2">
          <div>
            <div className="md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6">
              <span>{watch("round") && `${watch("round")}局`}</span>
              <span>{watch("turn") && `${watch("turn")}巡目`}</span>
              <span>{watch("wind") && `${watch("wind")}家`}</span>
              <div className="flex gap-2">
                {watch("dora") && "ドラ:"}
                {watch("dora") && drawTile(watch("dora"))}
              </div>
            </div>
            <div className="md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4">
              <span>{watch("point_east") ? `東家:${watch("point_east")}00点` : "東家25000点"}</span>
              <span>{watch("point_south") ? `南家:${watch("point_south")}00点` : "南家25000点"}</span>
              <span>{watch("point_west") ? `西家:${watch("point_west")}00点` : "西家25000点"}</span>
              <span>{watch("point_north") ? `北家:${watch("point_north")}00点` : "北家25000点"}</span>
            </div>
          </div>

          <div className="flex justify-center items-end mt-6">
            {Array(TILES_NUM).fill(null).map((_, index) => {
              return (
                <div key={index} className="w-12">
                  {watch(`hand${index+1}` as HandKeys) && drawTile(watch(`hand${index+1}` as HandKeys))}
                </div>
              )
            })}

            <div  className="w-12 ml-4 flex flex-col">
              {watch("tsumo") && <span className="font-bold text-center md:text-base text-[10px]">ツモ</span>}
              {watch("tsumo") && drawTile(watch("tsumo"))}
            </div>
          </div>
        </div>

        <section>
          <div className="mt-12 flex items-baseline">
            <h2 className="lg:text-3xl text-2xl">状況</h2>
            <span className="text-xl ml-2 text-red-400">※必須</span>
          </div>

          <hr />

          <div className="mt-2 text-xl text-red-400">
            {(errors.round ||
              errors.turn ||
              errors.wind ||
              errors.dora ||
              errors.point_east ||
              errors.point_south ||
              errors.point_west ||
              errors.point_north) &&
              <span>※場の状況を全て入力してください</span>}
          </div>

          <div className="flex md:flex-row flex-col gap-8 text-2xl mt-2">
            <div className="flex gap-1">
              <select className="text-gray-800 md:w-fit w-10/12 text-center" defaultValue="" {...register("round", {required: true})}>
                <option value="" disabled>未選択</option>
                <option value="東一">東一</option>
                <option value="東二">東二</option>
                <option value="東三">東三</option>
                <option value="東四">東四</option>
                <option value="南一">南一</option>
                <option value="南二">南二</option>
                <option value="南三">南三</option>
                <option value="南四">南四</option>
              </select>
              <span>局</span>
            </div>

            <div className="flex gap-1">
              <select className="text-gray-800 md:w-fit w-10/12 text-center" defaultValue="" {...register("turn", {required: true})}>
                <option value="" disabled>未選択</option>
                { Array(MAX_ROUND).fill(null).map((_, index) => {
                    return (
                      <option key={index} value={index + 1}>{index + 1}</option>
                    )
                  }
                )}
              </select>
              <span className="min-w-fit">巡目</span>
            </div>

            <div className="flex gap-1">
              <select className="text-gray-800 md:w-fit w-10/12 text-center" defaultValue="" {...register("wind", {required: true})}>
                <option value="" disabled>未選択</option>
                <option value="東">東</option>
                <option value="南">南</option>
                <option value="西">西</option>
                <option value="北">北</option>
              </select>
              <span>家</span>
            </div>

            <div className="flex gap-2 text-2xl">
              <span className="min-w-fit">ドラ:</span>
              <div className="w-full">
                {<select className="text-gray-800 border border-gray-800 md:w-fit w-10/12 text-center" defaultValue="" {...register("dora", {required: true})}>
                  {tiles.map((tile, index)=> {return (
                    <optgroup key={index} label={tile.species}>
                      <option value="" disabled>未選択</option>
                      {tile.tiles.map((tile) => {
                        return (
                          <option key={tile.id} value={tile.id}>
                            {tile.name}
                          </option>
                        )
                      })}
                    </optgroup>
                    )}
                  )}
                </select>}
              </div>
            </div>
          </div>


          <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex gap-2 text-2xl mt-6">
              <span>東家:</span>
              <input type="number" className="text-gray-800 text-right w-20 px-2" defaultValue="250" max="1500" {...register("point_east", {required: true})} />
              <span>00点</span>
            </div>

            <div className="flex gap-2 text-2xl mt-6">
              <span>南家:</span>
              <input type="number" className="text-gray-800 text-right w-20 px-2" defaultValue="250" max="1500" {...register("point_south", {required: true})} />
              <span>00点</span>
            </div>

            <div className="flex gap-2 text-2xl mt-6">
              <span>西家:</span>
              <input type="number" className="text-gray-800 text-right w-20 px-2" defaultValue="250" max="1500" {...register("point_west", {required: true})} />
              <span>00点</span>
            </div>

            <div className="flex gap-2 text-2xl mt-6">
              <span>北家:</span>
              <input type="number" className="text-gray-800 text-right w-20 px-2" defaultValue="250" max="1500" {...register("point_north", {required: true})} />
              <span>00点</span>
            </div>
          </div>
        </section>

        <section>
          <div className="mt-12 flex items-baseline">
            <h2 className="lg:text-3xl text-2xl">手牌</h2>
            <span className="text-xl ml-2 text-red-400">※必須</span>
          </div>

          <hr />

          <div className="mt-2 text-xl text-red-400">
            {(errors.hand1 ||
              errors.hand2 ||
              errors.hand3 ||
              errors.hand4 ||
              errors.hand5 ||
              errors.hand6 ||
              errors.hand7 ||
              errors.hand8 ||
              errors.hand9 ||
              errors.hand10 ||
              errors.hand11 ||
              errors.hand12 ||
              errors.hand13 ||
              errors.tsumo) &&
              <span>※手牌情報を全て入力してください</span>}
          </div>

          <div className="mt-4 grid lg:grid-cols-7 md:grid-cols-4 grid-cols-3 ml-0 max-w-fit mx-auto gap-x-4 gap-y-4">
            { Array(TILES_NUM).fill(null).map((_, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-white">{index + 1}</span>
                  <select className="text-gray-800 text-2xl border border-gray-800" defaultValue="" {...register(`hand${index + 1}` as HandKeys, { required: true})}>
                    <option value="" disabled>未選択</option>
                    {tiles.map((tile, index)=> {return (
                      <optgroup key={index} label={tile.species}>
                        {tile.tiles.map((tile) => {
                          return (
                            <option key={tile.id} value={tile.id}>
                              {tile.name}
                            </option>
                          )
                        })}
                      </optgroup>
                      )}
                    )}
                  </select>
                </div>
              )})
            }
            <div className="flex flex-col items-center">
              <span className="text-white">ツモ</span>
              <select className="text-gray-800 text-2xl border border-gray-800" defaultValue="" {...register("tsumo", {required: true})}>
                <option value="" disabled>未選択</option>
                {tiles.map((tile, index)=> {return (
                  <optgroup key={index} label={tile.species}>
                    {tile.tiles.map((tile) => {
                      return (
                        <option key={tile.id} value={tile.id}>
                          {tile.name}
                        </option>
                      )
                    })}
                  </optgroup>
                  )}
                )}
              </select>
            </div>
          </div>
        </section>

        <input type="submit" value="作成する" className="btn btn-main mt-16" />
      </form>
    </div>
  );
}
