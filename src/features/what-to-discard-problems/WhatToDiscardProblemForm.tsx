import { SubmitHandler, useForm } from "react-hook-form";
import PopButton from "../../components/PopButton";
import TileImage from "../../components/TileImage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  useToast,
  VisuallyHiddenInput,
  Wrap,
} from "@chakra-ui/react";
import { WhatToDiscardProblems } from "../../pages/what-to-discard-problems/page";
import useErrorToast from "../../hooks/useErrorToast";
import axios from "axios";

type WhatToDiscardProblemCreateFormType = {
  round: string;
  turn: number;
  wind: string;
  dora_id: number;

  totalPoints: number;
  point_east: number;
  point_south: number;
  point_west: number;
  point_north: number;

  tileUsage: string;
  handSort: string;
  hand1_id: number;
  hand2_id: number;
  hand3_id: number;
  hand4_id: number;
  hand5_id: number;
  hand6_id: number;
  hand7_id: number;
  hand8_id: number;
  hand9_id: number;
  hand10_id: number;
  hand11_id: number;
  hand12_id: number;
  hand13_id: number;
  tsumo_id: number;
};

type TileInputNameType =
  | "hand1_id"
  | "hand2_id"
  | "hand3_id"
  | "hand4_id"
  | "hand5_id"
  | "hand6_id"
  | "hand7_id"
  | "hand8_id"
  | "hand9_id"
  | "hand10_id"
  | "hand11_id"
  | "hand12_id"
  | "hand13_id"
  | "tsumo_id"
  | "dora_id";

type PointInputs = "point_east" | "point_south" | "point_west" | "point_north";

const MAX_TURN = 18;
const ALL_TILES_NUM = 34;
const TOTAL_POINTS = 100000;
const MAX_DUPLICATE_TILES_NUM = 4;

export default function WhatToDiscardProblemForm({
  setIsCreateFormOpen,
  whatToDiscardProblems,
  setWhatToDiscardProblems,
  setNextPage,
}: {
  setIsCreateFormOpen: Dispatch<SetStateAction<boolean>>;
  whatToDiscardProblems: WhatToDiscardProblems;
  setWhatToDiscardProblems: Dispatch<SetStateAction<WhatToDiscardProblems>>;
  setNextPage: Dispatch<SetStateAction<number | null>>;
}) {
  const [focussedTileInput, setFocussedTileInput] =
    useState<TileInputNameType>("dora_id");

  const [focussedPointInput, setFocussedPointInput] =
    useState<PointInputs | null>("point_east");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
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

  const enteredHandIds = [
    watch("hand1_id"),
    watch("hand2_id"),
    watch("hand3_id"),
    watch("hand4_id"),
    watch("hand5_id"),
    watch("hand6_id"),
    watch("hand7_id"),
    watch("hand8_id"),
    watch("hand9_id"),
    watch("hand10_id"),
    watch("hand11_id"),
    watch("hand12_id"),
    watch("hand13_id"),
  ];

  const enteredTileIds = [
    ...enteredHandIds,
    watch("dora_id"),
    watch("tsumo_id"),
  ];

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
    if (!isSorted(enteredHandIds)) {
      setError("handSort", {
        type: "manual",
        message:
          "「萬子 → 筒子 → 索子 → 字牌（東南西北白發中）」の順番で理牌してください。",
      });
    } else {
      clearErrors("handSort");
    }
  }, [...enteredHandIds]);

  useEffect(() => {
    const usedTilesCountTally = enteredTileIds.reduce<Record<string, number>>(
      (accumulator, tileId) => {
        accumulator[String(tileId)] = (accumulator[String(tileId)] || 0) + 1;
        return accumulator;
      },
      {}
    );

    if (!isNoTileOverused(usedTilesCountTally)) {
      setError("tileUsage", {
        type: "manual",
        message: "4枚以上使っている牌があります。",
      });
    } else {
      clearErrors("tileUsage");
    }
  }, [...enteredTileIds]);

  const toast = useToast();
  const errorToast = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<WhatToDiscardProblemCreateFormType> = async (
    formData
  ) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await apiClient.post("/what_to_discard_problems", {
        what_to_discard_problem: formData,
      });
      const data = response.data;

      setWhatToDiscardProblems([
        ...whatToDiscardProblems,
        data.what_to_discard_problem,
      ]);

      // setNextPage(data.meta.pagination.next_page);

      setIsCreateFormOpen(false);
      toast({
        title: "何切る問題を作成しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({ error, title: "何切る問題の作成に失敗しました" });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 bg-white rounded-md text-gray-700 p-4"
    >
      <FormControl isRequired isInvalid={!!errors.round}>
        <FormLabel htmlFor="round" fontSize={20}>
          局数
        </FormLabel>

        <FormErrorMessage>{errors?.round?.message}</FormErrorMessage>

        <VisuallyHiddenInput
          {...register("round", { required: "局数は必須です。" })}
        />

        <TentativeInput>
          {watch("round") ? `${watch("round")}局` : ""}
        </TentativeInput>

        <Wrap gap={2} mt={2}>
          {["東一", "東二", "東三", "東四", "南一", "南二", "南三", "南四"].map(
            (roundName, index) => {
              return (
                <PopButton
                  key={index}
                  value={roundName}
                  onClick={() => setValue("round", roundName)}
                  defaultClassName="form-button"
                />
              );
            }
          )}
        </Wrap>
      </FormControl>

      <FormControl mt={4} isRequired isInvalid={!!errors.turn}>
        <FormLabel htmlFor="turn" fontSize={20}>
          巡目
        </FormLabel>

        <FormErrorMessage>{errors?.turn?.message}</FormErrorMessage>

        <VisuallyHiddenInput
          {...register("turn", { required: "巡目は必須です。" })}
        />

        <TentativeInput>
          {watch("turn") ? `${watch("turn")}巡目` : ""}
        </TentativeInput>

        <Wrap gap={2} mt={2}>
          {Array(MAX_TURN)
            .fill(null)
            .map((_, index) => {
              const turn = index + 1;

              return (
                <PopButton
                  value={`${turn}巡目`}
                  onClick={() => setValue("turn", turn)}
                  defaultClassName="form-button"
                  key={index}
                />
              );
            })}
        </Wrap>
      </FormControl>

      <FormControl mt={4} isRequired isInvalid={!!errors.wind}>
        <FormLabel htmlFor="wind" fontSize={20}>
          風
        </FormLabel>

        <FormErrorMessage>{errors.wind?.message}</FormErrorMessage>

        <VisuallyHiddenInput
          {...register("wind", { required: "風は必須です。" })}
        />

        <TentativeInput>
          {watch("wind") ? `${watch("wind")}家` : ""}
        </TentativeInput>

        <Wrap gap={2} mt={2}>
          {["東", "南", "西", "北"].map((windName, index) => {
            return (
              <PopButton
                key={index}
                value={windName}
                onClick={() => setValue("wind", windName)}
                defaultClassName="form-button"
              />
            );
          })}
        </Wrap>
      </FormControl>

      <FormControl isInvalid={!!errors.totalPoints} mt={4}>
        <FormLabel as="legend" fontSize={20}>
          点数状況
        </FormLabel>

        <Flex gap={2}>
          <Text>合計</Text>
          <Text
            className={`${pointSum == TOTAL_POINTS ? "text-green-500" : "text-red-500"}`}
            fontFamily="sans-serif"
          >
            {new Intl.NumberFormat("en-US").format(pointSum)}
          </Text>
          <Text fontFamily="sans-serif">/ 100,000</Text>点
        </Flex>

        <FormErrorMessage>{errors.totalPoints?.message}</FormErrorMessage>

        <Flex mt={2} gap={2}>
          {(
            [
              { label: "東家", inputName: "point_east" },
              { label: "南家", inputName: "point_south" },
              { label: "西家", inputName: "point_west" },
              { label: "北家", inputName: "point_north" },
            ] as const
          ).map((obj, index) => {
            return (
              <FormControl isInvalid={!!errors[obj.inputName]} key={index}>
                <FormLabel htmlFor={obj.inputName}>{obj.label}</FormLabel>

                <VisuallyHiddenInput
                  {...register(obj.inputName as PointInputs, {
                    validate: {
                      pointsLimit: (data) => {
                        if (data > 200000)
                          return `${obj.label}の点数を200,000点以下にしてください。`;
                      },
                    },
                  })}
                />

                <TentativeInput
                  className={`form-button ${
                    focussedPointInput == obj.inputName
                      ? "scale-105 border-blue-500 shadow shadow-blue-500"
                      : "border-gray-700"
                  }`}
                  onClick={() => {
                    focussedPointInput == obj.inputName
                      ? setFocussedPointInput(null)
                      : setFocussedPointInput(obj.inputName);
                  }}
                >
                  {watch(obj.inputName) &&
                    new Intl.NumberFormat("en-US").format(watch(obj.inputName))}
                </TentativeInput>
              </FormControl>
            );
          })}
        </Flex>

        <FormErrorMessage>
          {errors?.point_east?.message}
          {errors?.point_west?.message}
          {errors?.point_south?.message}
          {errors?.point_north?.message}
        </FormErrorMessage>

        <Wrap mt={2} gap={2}>
          {[10000, -10000, 1000, -1000, 100, -100].map((value, index) => {
            return (
              <PopButton
                key={index}
                value={`${value > 0 ? "+" : ""} ${new Intl.NumberFormat("en-US").format(value)}`}
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
        </Wrap>
      </FormControl>

      <FormControl
        mt={4}
        isRequired
        isInvalid={!!(errors.tileUsage || errors.handSort)}
      >
        <FormLabel as="legend" fontSize={20}>
          手牌状況
        </FormLabel>

        {(errors.dora_id ||
          errors.hand1_id ||
          errors.hand2_id ||
          errors.hand3_id ||
          errors.hand4_id ||
          errors.hand5_id ||
          errors.hand6_id ||
          errors.hand7_id ||
          errors.hand8_id ||
          errors.hand9_id ||
          errors.hand10_id ||
          errors.hand11_id ||
          errors.hand12_id ||
          errors.hand13_id ||
          errors.tsumo_id) && (
          <FormErrorMessage>選択していない手牌があります</FormErrorMessage>
        )}

        <Box>
          <FormErrorMessage>{errors.tileUsage?.message}</FormErrorMessage>
          <FormErrorMessage>{errors.handSort?.message}</FormErrorMessage>
        </Box>

        <Box>
          <FormLabel htmlFor="dora">ドラ</FormLabel>
          <VisuallyHiddenInput
            {...register("dora_id", { required: "ドラは必須です。" })}
          />
          <button
            type="button"
            onClick={() => setFocussedTileInput("dora_id")}
            className={`${
              focussedTileInput == "dora_id"
                ? "scale-105 border-blue-500 shadow shadow-blue-500"
                : "border-gray-700"
            }
                    w-9 h-12 rounded-sm border`}
          >
            {watch("dora_id") && (
              <TileImage tile={watch("dora_id")} hover={false} />
            )}
          </button>
        </Box>

        <Box>
          <FormLabel mt={2}>手牌</FormLabel>
          <Flex gap={1}>
            {(
              [
                "hand1_id",
                "hand2_id",
                "hand3_id",
                "hand4_id",
                "hand5_id",
                "hand6_id",
                "hand7_id",
                "hand8_id",
                "hand9_id",
                "hand10_id",
                "hand11_id",
                "hand12_id",
                "hand13_id",
              ] as const
            ).map((name, index) => {
              return (
                <Box key={index}>
                  <VisuallyHiddenInput
                    {...register(name, {
                      required: `手牌${index + 1}は必須です。`,
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setFocussedTileInput(name)}
                    className={`w-9 h-12 rounded-sm border ${
                      focussedTileInput == name
                        ? "scale-105 border-blue-500 shadow shadow-blue-500"
                        : "border-gray-700"
                    }`}
                  >
                    {watch(name) && (
                      <TileImage tile={watch(name)} hover={false} />
                    )}
                  </button>
                </Box>
              );
            })}
          </Flex>
        </Box>

        <Box>
          <FormLabel>ツモ</FormLabel>
          <VisuallyHiddenInput {...register("tsumo_id")} />
          <button
            type="button"
            onClick={() => setFocussedTileInput("tsumo_id")}
            className={`${
              focussedTileInput == "tsumo_id"
                ? "scale-105 border-blue-500 shadow shadow-blue-500"
                : "border-gray-700"
            }
                    w-9 h-12 rounded-sm border`}
          >
            {watch("tsumo_id") && (
              <TileImage tile={watch("tsumo_id")} hover={false} />
            )}
          </button>
        </Box>
      </FormControl>

      <Divider borderColor="gray.500" mt={4} variant="dashed" />

      <Box mt={4}>
        <Wrap>
          {Array(ALL_TILES_NUM)
            .fill(null)
            .map((_, index) => {
              const tileId = index + 1;

              return (
                <Flex flexDir="column" alignItems="center" key={index}>
                  <PopButton
                    value={<TileImage tile={tileId} hover={false} />}
                    onClick={() => {
                      setValue(focussedTileInput, tileId);
                      (
                        [
                          "hand1_id",
                          "hand2_id",
                          "hand3_id",
                          "hand4_id",
                          "hand5_id",
                          "hand6_id",
                          "hand7_id",
                          "hand8_id",
                          "hand9_id",
                          "hand10_id",
                          "hand11_id",
                          "hand12_id",
                          "hand13_id",
                          "tsumo_id",
                          "dora_id",
                        ] as const
                      ).some((fieldName) => {
                        if (watch(fieldName)) return true;

                        setFocussedTileInput(fieldName);
                      });
                    }}
                    defaultClassName="w-10 border border-gray-700 rounded-sm"
                  />
                </Flex>
              );
            })}
        </Wrap>
      </Box>

      <Center mt={4}>
        <Button
          type="submit"
          onClick={() => confirm("これで作成しますか？")}
          colorScheme="teal"
          size="lg"
        >
          作成する
        </Button>
      </Center>
    </form>
  );
}

const isNoTileOverused = (sameIdTilesCount: { [key: number]: number }) => {
  return Object.entries(sameIdTilesCount).every(([tileId, count]) => {
    if (!tileId) return true;
    return count <= MAX_DUPLICATE_TILES_NUM;
  });
};

const isSorted = (array: number[]) => {
  return array.every((n, index) => {
    if (index == 0) return true;
    if (!Number(n) || !Number(array[index - 1])) return true;

    return n >= array[index - 1];
  });
};

const TentativeInput = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Text
      fontFamily="sans-serif"
      w="xs"
      h={10}
      border="1px"
      borderColor="gray.400"
      py={2}
      px={4}
      width={40}
      borderRadius="md"
      bgColor="gray.100"
      className={className}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};
