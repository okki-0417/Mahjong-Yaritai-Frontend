import { SubmitHandler, useForm } from "react-hook-form";
import PopButton from "../../components/PopButton";
import TileImage from "../../components/TileImage";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BASEURL } from "../../ApiConfig";
import ErrorMessage from "../../components/ErrorMessage";

type WhatToDiscardProblemCreateFormType = {
  round: string;
  turn: number;
  wind: string;
  dora: number;

  totalPoints: number;
  point_east: number;
  point_south: number;
  point_west: number;
  point_north: number;

  tileUsage: string;
  handSort: string;
  hand1: TileId;
  hand2: TileId;
  hand3: TileId;
  hand4: TileId;
  hand5: TileId;
  hand6: TileId;
  hand7: TileId;
  hand8: TileId;
  hand9: TileId;
  hand10: TileId;
  hand11: TileId;
  hand12: TileId;
  hand13: TileId;
  tsumo: TileId;
};

type TileInputs =
  | "hand1"
  | "hand2"
  | "hand3"
  | "hand4"
  | "hand5"
  | "hand6"
  | "hand7"
  | "hand8"
  | "hand9"
  | "hand10"
  | "hand11"
  | "hand12"
  | "hand13"
  | "tsumo"
  | "dora";

type PointInputs = "point_east" | "point_south" | "point_west" | "point_north";
type TileId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34;

export const TILES_NUM = 13;
export const TILE_TYPES_NUM = 34;
export const MAX_ROUND = 18;
export type HandKeys =
  `hand${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13}`;

export default function WhatToDiscardProblemForm({
  setIsCreateFormOpen,
}: {
  setIsCreateFormOpen: Dispatch<SetStateAction<boolean | null>>;
}) {
  const [focussedTileInput, setFocussedTileInput] =
    useState<TileInputs>("dora");

  const [focussedPointInput, setFocussedPointInput] =
    useState<PointInputs | null>("point_east");

  const [sameIdTilesCount, setSameIdTilesCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0,
    31: 0,
    32: 0,
    33: 0,
    34: 0,
  });

  const MAX_TURN = 18;
  const ALL_TILES_NUM = 34;
  const TOTAL_POINTS = 100000;
  const MAX_DUPLICATE_TILES_NUM = 4;

  const tileInputs: TileInputs[] = [
    "dora",
    "hand1",
    "hand2",
    "hand3",
    "hand4",
    "hand5",
    "hand6",
    "hand7",
    "hand8",
    "hand9",
    "hand10",
    "hand11",
    "hand12",
    "hand13",
    "tsumo",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    // resetField,
    formState: { errors },
  } = useForm<WhatToDiscardProblemCreateFormType>({
    defaultValues: {
      point_east: 25000,
      point_south: 25000,
      point_west: 25000,
      point_north: 25000,
    },
  });

  const pointSum =
    Number(watch("point_east")) +
    Number(watch("point_south")) +
    Number(watch("point_west")) +
    Number(watch("point_north"));

  const hand = {
    hand1: watch("hand1"),
    hand2: watch("hand2"),
    hand3: watch("hand3"),
    hand4: watch("hand4"),
    hand5: watch("hand5"),
    hand6: watch("hand6"),
    hand7: watch("hand7"),
    hand8: watch("hand8"),
    hand9: watch("hand9"),
    hand10: watch("hand10"),
    hand11: watch("hand11"),
    hand12: watch("hand12"),
    hand13: watch("hand13"),
  };

  const selectedTiles = {
    dora: watch("dora"),
    tsumo: watch("tsumo"),
    ...hand,
  };

  const allInputs = {
    round: watch("round"),
    turn: watch("turn"),
    wind: watch("wind"),
    point_east: watch("point_east"),
    point_south: watch("point_south"),
    point_west: watch("point_west"),
    point_north: watch("point_north"),
    ...selectedTiles,
  };

  const updateTileUsage = () => {
    const selectedTilesValue = Object.values(selectedTiles).filter(
      (value) => typeof value == "number"
    );

    const tally: Record<number, number> = selectedTilesValue.reduce(
      (duplicateTilesCount, tileId) => {
        duplicateTilesCount[tileId] = (duplicateTilesCount[tileId] || 0) + 1;
        return duplicateTilesCount;
      },
      {} as Record<number, number>
    );

    setSameIdTilesCount((prev) => {
      const newCount = { ...prev };

      Object.keys(tally).forEach((key) => {
        newCount[Number(key) as TileId] = tally[Number(key)];
      });

      return newCount;
    });
  };

  const isTooManyDuplicateTiles = () => {
    return Object.values(sameIdTilesCount).some(
      (count) => count > MAX_DUPLICATE_TILES_NUM
    );
  };

  const isHandSorted = () => {
    const handValues = Object.values(hand).filter((value) => !!value);

    return handValues.every((_, index) => {
      return index === 0 || handValues[index - 1] <= handValues[index];
    });
  };

  useEffect(() => {
    if (pointSum != TOTAL_POINTS) {
      setError("totalPoints", {
        type: "manual",
        message: "持ち点の合計を100,000点にしてください。",
      });
    } else {
      clearErrors("totalPoints");
    }
  }, [pointSum]);

  useEffect(() => {
    updateTileUsage();
  }, [...Object.values(selectedTiles)]);

  useEffect(() => {
    if (isTooManyDuplicateTiles()) {
      setError("tileUsage", {
        type: "manual",
        message: "4枚以上使っている牌があります。",
      });
    } else {
      clearErrors("tileUsage");
    }

    if (!isHandSorted()) {
      setError("handSort", {
        type: "manual",
        message:
          "「萬子 → 筒子 → 索子 → 字牌（東南西北白發中）」の順番で理牌してください。",
      });
    } else {
      clearErrors("handSort");
    }
  }, [...Object.values(sameIdTilesCount)]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem(
      "WhatToDiscardProblemCreateForm",
      JSON.stringify(allInputs)
    );
  }, [...Object.values(allInputs)]);

  useEffect(() => {
    const form = localStorage.getItem("WhatToDiscardProblemCreateForm");

    if (form) {
      const formData = JSON.parse(form);

      Object.keys(formData).forEach((key) => {
        setValue(
          key as keyof WhatToDiscardProblemCreateFormType,
          formData[key]
        );
      });
    }
  }, []);

  const onSubmit: SubmitHandler<WhatToDiscardProblemCreateFormType> = async (
    formData
  ) => {
    try {
      const response = await fetch(`${BASEURL}/what_to_discard_problems`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ what_to_discard_problem: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed To Create What-To-Discard-Problem");
      }

      setIsCreateFormOpen(false);
      localStorage.removeItem("WhatToDiscardProblemCreateForm");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 bg-white rounded-md text-gray-700 p-4"
    >
      <fieldset>
        <div className="pl-1">
          <label htmlFor="round" className="w-full text-xl">
            局数
          </label>
        </div>

        <ErrorMessage message={errors?.round?.message} />

        <div className="mt-1">
          <input
            type="hidden"
            {...register("round", { required: "局数は必須です。" })}
          />
          <input
            type="text"
            readOnly
            value={watch("round") ? `${watch("round")}局` : ""}
            className="form-button"
          />
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { value: "東一", onClick: () => setValue("round", "東一") },
            { value: "東二", onClick: () => setValue("round", "東二") },
            { value: "東三", onClick: () => setValue("round", "東三") },
            { value: "東四", onClick: () => setValue("round", "東四") },
            { value: "南一", onClick: () => setValue("round", "南一") },
            { value: "南二", onClick: () => setValue("round", "南二") },
            { value: "南三", onClick: () => setValue("round", "南三") },
            { value: "南四", onClick: () => setValue("round", "南四") },
          ].map((obj, index) => {
            return (
              <PopButton
                key={index}
                value={obj.value}
                onClick={obj.onClick}
                defaultClassName="form-button"
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <div className="pl-1">
          <label htmlFor="turn" className="w-full text-xl">
            巡目
          </label>
        </div>

        <ErrorMessage message={errors?.turn?.message} />

        <div className="mt-1">
          <input
            type="hidden"
            {...register("turn", { required: "巡目は必須です。" })}
            required
          />
          <input
            type="text"
            readOnly
            className="form-button"
            value={watch("turn") ? `${watch("turn")}巡目` : ""}
          />
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {Array(MAX_TURN)
            .fill(null)
            .map((_, index) => {
              return (
                <PopButton
                  key={index}
                  value={`${index + 1}巡目`}
                  onClick={() => setValue("turn", index + 1)}
                  defaultClassName="form-button"
                />
              );
            })}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <div className="pl-1">
          <label htmlFor="wind" className="w-full text-xl">
            風
          </label>
        </div>

        <ErrorMessage message={errors.wind?.message} />

        <div className="mt-1">
          <input
            type="hidden"
            {...register("wind", { required: "風は必須です。" })}
            required
          />
          <input
            type="text"
            readOnly
            className="form-button"
            value={watch("wind") ? `${watch("wind")}家` : ""}
          />
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { value: "東", onClick: () => setValue("wind", "東") },
            { value: "南", onClick: () => setValue("wind", "南") },
            { value: "西", onClick: () => setValue("wind", "西") },
            { value: "北", onClick: () => setValue("wind", "北") },
          ].map((obj, index) => {
            return (
              <PopButton
                key={index}
                value={obj.value}
                onClick={obj.onClick}
                defaultClassName="form-button"
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <div>
          <legend className="text-xl">点数状況</legend>
        </div>

        <ErrorMessage message={errors.totalPoints?.message} />

        <ErrorMessage message={errors?.point_east?.message} />
        <ErrorMessage message={errors?.point_west?.message} />
        <ErrorMessage message={errors?.point_south?.message} />
        <ErrorMessage message={errors?.point_north?.message} />

        <section className="mt-1 flex gap-1 items-baseline">
          <label>合計</label>
          <span
            className={`font-sans text-lg ${pointSum == TOTAL_POINTS ? "text-green-500" : "text-red-500"}`}
          >
            {new Intl.NumberFormat("en-US").format(pointSum)}
          </span>
          <span className="font-sans">/ 100,000</span>点
        </section>

        <section className="mt-1 flex lg:flex-row flex-col gap-3">
          {[
            { label: "東家", inputName: "point_east" },
            { label: "南家", inputName: "point_south" },
            { label: "西家", inputName: "point_west" },
            { label: "北家", inputName: "point_north" },
          ].map((obj, index) => {
            return (
              <div key={index}>
                <div>
                  <label htmlFor={obj.inputName}>{obj.label}</label>
                </div>

                <input
                  type="hidden"
                  {...register(obj.inputName as PointInputs, {
                    validate: {
                      pointsLimit: (data) => {
                        if (data > 200000)
                          return `${obj.label}の点数を200,000点以下にしてください。`;
                      },
                    },
                  })}
                />

                <div>
                  <input
                    type="text"
                    readOnly
                    className={`${
                      focussedPointInput == obj.inputName
                        ? "scale-105 border-blue-500 shadow shadow-blue-500"
                        : "border-gray-700"
                    }
                      form-button w-full`}
                    value={
                      watch(obj.inputName as PointInputs) &&
                      new Intl.NumberFormat("en-US").format(
                        watch(obj.inputName as PointInputs)
                      )
                    }
                    onClick={() => {
                      focussedPointInput == obj.inputName
                        ? setFocussedPointInput(null)
                        : setFocussedPointInput(obj.inputName as PointInputs);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-3 flex gap-1">
          {[10000, -10000, 1000, -1000, 100, -100].map((value, index) => {
            return (
              <PopButton
                key={index}
                value={`
                  ${
                    value > 0
                      ? `+${new Intl.NumberFormat("en-US").format(value)}`
                      : `${new Intl.NumberFormat("en-US").format(value)}`
                  }
                `}
                defaultClassName="form-button"
                onClick={() => {
                  if (!focussedPointInput) return;
                  setValue(
                    focussedPointInput,
                    Number(watch(focussedPointInput)) + value
                  );
                }}
              />
            );
          })}

          <PopButton
            value="リセット"
            defaultClassName="form-button"
            onClick={() => {
              if (!focussedPointInput) return;
              setValue(focussedPointInput, 25000);
            }}
          />
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <div>
          <legend className="w-full text-xl">手牌状況</legend>
        </div>

        {(errors.dora ||
          errors.hand1 ||
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
          errors.tsumo) && (
          <ErrorMessage message="選択していない手牌情報があります。" />
        )}

        <ErrorMessage message={errors.tileUsage?.message} />
        <ErrorMessage message={errors.handSort?.message} />

        <fieldset className="mt-1">
          <div className="max-w-fit flex flex-col items-center">
            <label htmlFor="dora">ドラ</label>

            <input
              type="hidden"
              {...register("dora", { required: "ドラは必須です。" })}
            />

            <button
              type="button"
              onClick={() => setFocussedTileInput("dora")}
              className={`${
                focussedTileInput == "dora"
                  ? "scale-105 border-blue-500 shadow shadow-blue-500"
                  : "border-gray-700"
              }
                w-9 h-12 rounded-sm border`}
            >
              {watch("dora") && (
                <TileImage tile={watch("dora")} hover={false} />
              )}
            </button>
          </div>
        </fieldset>

        <fieldset className="mt-2 flex gap-4">
          <fieldset>
            <label>手牌</label>

            <div className="flex gap-1">
              {Array(TILES_NUM)
                .fill(null)
                .map((_, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="hidden"
                        {...register(`hand${index + 1}` as HandKeys, {
                          required: `手牌${index + 1}は必須です。`,
                        })}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setFocussedTileInput(`hand${index + 1}` as HandKeys)
                        }
                        className={`${
                          focussedTileInput == `hand${index + 1}`
                            ? "scale-105 border-blue-500 shadow shadow-blue-500"
                            : "border-gray-700"
                        }
                        w-9 h-12 rounded-sm border`}
                      >
                        {watch(`hand${index + 1}` as HandKeys) && (
                          <TileImage
                            tile={watch(`hand${index + 1}` as HandKeys)}
                            hover={false}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>
          </fieldset>

          <fieldset className="flex flex-col">
            <label>ツモ</label>

            <input type="hidden" {...register("tsumo")} />

            <button
              type="button"
              onClick={() => setFocussedTileInput("tsumo")}
              className={`${
                focussedTileInput == "tsumo"
                  ? "scale-105 border-blue-500 shadow shadow-blue-500"
                  : "border-gray-700"
              }
                w-9 h-12 rounded-sm border`}
            >
              {watch("tsumo") && (
                <TileImage tile={watch("tsumo")} hover={false} />
              )}
            </button>
          </fieldset>
        </fieldset>

        {/* <div className="mt-2">
          <PopButton
            value="リセット"
            onClick={() => {
              tileInputs.map((inputName) => {
                resetField(inputName);
              })
            }}
            defaultClassName="form-button"
          />
        </div> */}

        <div className="mt-4">
          <div className="border-t border-gray-700 border-dotted pt-4 flex flex-wrap gap-1">
            {Array(ALL_TILES_NUM)
              .fill(null)
              .map((_, index) => {
                const tileId = (index + 1) as TileId;

                return (
                  <div className="flex flex-col items-center" key={index}>
                    <PopButton
                      value={<TileImage tile={tileId} hover={false} />}
                      onClick={() => {
                        setValue(focussedTileInput, tileId);

                        tileInputs.some((fieldName) => {
                          if (!watch(fieldName)) {
                            setFocussedTileInput(fieldName);
                            return true;
                          }
                        });
                      }}
                      defaultClassName="w-10 border border-gray-700 rounded-sm"
                    />

                    <span className="font-sans">
                      {MAX_DUPLICATE_TILES_NUM - sameIdTilesCount[tileId]}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <div>
          <input
            type="submit"
            value="作成する"
            className="mt-6 btn btn-main"
            onClick={() => confirm("これで作成しますか？")}
          />
        </div>
      </fieldset>
    </form>
  );
}
