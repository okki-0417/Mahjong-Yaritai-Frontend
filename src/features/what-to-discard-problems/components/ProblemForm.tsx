"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
  VisuallyHiddenInput,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import useErrorToast from "@/src/hooks/useErrorToast";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { customDefaultErrorMap } from "@/src/lib/zodErrorMap";
import {
  customCreateWhatToDiscardProblem_BodySchema,
  TOTAL_POINTS,
} from "@/src/features/what-to-discard-problems/schema/customWhatToDiscardProbemSchema";

const MAX_TURN = 18;
const ALL_TILES_NUM = 34;
export const handFieldNames = [
  "what_to_discard_problem.hand1_id",
  "what_to_discard_problem.hand2_id",
  "what_to_discard_problem.hand3_id",
  "what_to_discard_problem.hand4_id",
  "what_to_discard_problem.hand5_id",
  "what_to_discard_problem.hand6_id",
  "what_to_discard_problem.hand7_id",
  "what_to_discard_problem.hand8_id",
  "what_to_discard_problem.hand9_id",
  "what_to_discard_problem.hand10_id",
  "what_to_discard_problem.hand11_id",
  "what_to_discard_problem.hand12_id",
  "what_to_discard_problem.hand13_id",
] as const;

const tileFieldNames = [
  ...handFieldNames,
  "what_to_discard_problem.dora_id",
  "what_to_discard_problem.tsumo_id",
] as const;

const pointFieldNames = [
  "what_to_discard_problem.point_east",
  "what_to_discard_problem.point_south",
  "what_to_discard_problem.point_west",
  "what_to_discard_problem.point_north",
] as const;

export default function ProblemForm({
  setIsCreateFormOpen,
  setProblems,
}: {
  setIsCreateFormOpen: Dispatch<SetStateAction<boolean>>;
  setProblems: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
}) {
  const [focussedPointFieldName, setFocussedPointFieldName] = useState<
    (typeof pointFieldNames)[number]
  >("what_to_discard_problem.point_east");
  const [focussedTileFieldName, setFocussedTileFieldName] = useState<
    (typeof tileFieldNames)[number]
  >("what_to_discard_problem.dora_id");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>>({
    defaultValues: {
      "what_to_discard_problem.point_east": 25000,
      "what_to_discard_problem.point_south": 25000,
      "what_to_discard_problem.point_west": 25000,
      "what_to_discard_problem.point_north": 25000,
    },
    resolver: zodResolver(customCreateWhatToDiscardProblem_BodySchema),
    mode: "onChange",
  });
  z.setErrorMap(customDefaultErrorMap);

  const pointSum =
    Number(watch("what_to_discard_problem.point_east")) +
    Number(watch("what_to_discard_problem.point_south")) +
    Number(watch("what_to_discard_problem.point_west")) +
    Number(watch("what_to_discard_problem.point_north"));

  const tileFiledErrors = [
    errors.what_to_discard_problem?.dora_id,
    errors.what_to_discard_problem?.hand1_id,
    errors.what_to_discard_problem?.hand2_id,
    errors.what_to_discard_problem?.hand3_id,
    errors.what_to_discard_problem?.hand4_id,
    errors.what_to_discard_problem?.hand5_id,
    errors.what_to_discard_problem?.hand6_id,
    errors.what_to_discard_problem?.hand7_id,
    errors.what_to_discard_problem?.hand8_id,
    errors.what_to_discard_problem?.hand9_id,
    errors.what_to_discard_problem?.hand10_id,
    errors.what_to_discard_problem?.hand11_id,
    errors.what_to_discard_problem?.hand12_id,
    errors.what_to_discard_problem?.hand13_id,
    errors.what_to_discard_problem?.tsumo_id,
  ];

  const pointFieldErrors = [
    errors.what_to_discard_problem?.point_east,
    errors.what_to_discard_problem?.point_south,
    errors.what_to_discard_problem?.point_west,
    errors.what_to_discard_problem?.point_north,
  ];

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleTileInputted = (tileId: number) => {
    setValue(focussedTileFieldName, Number(tileId));
    tileFieldNames.some(fieldName => {
      if (getValues(fieldName)) {
        return false;
      } else {
        setFocussedTileFieldName(fieldName);
        return true;
      }
    });
  };

  const onSubmit: SubmitHandler<
    z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>
  > = async formData => {
    const isConfirmed = confirm("これで作成しますか？");
    if (!isConfirmed) return;
    try {
      const response = await apiClient.createWhatToDiscardProblem(formData);

      setProblems(prev => [response.what_to_discard_problem, ...prev]);
      setIsCreateFormOpen(false);
      successToast({ title: "何切る問題を作成しました" });
    } catch (error) {
      errorToast({ error, title: "何切る問題の作成に失敗しました" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral text-primary">
      <VStack gap={6} align="stretch">
        <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.round)} isRequired>
          <VStack alignItems="start">
            <FormLabel fontSize="lg" m="0">
              局数
            </FormLabel>
            <VisuallyHiddenInput {...register("what_to_discard_problem.round")} readOnly />
            <FormErrorMessage>{errors.what_to_discard_problem?.round?.message}</FormErrorMessage>
            <DisplayInput>
              {watch("what_to_discard_problem.round") &&
                `${watch("what_to_discard_problem.round")}局`}
            </DisplayInput>

            <Wrap gap={2}>
              {["東一", "東二", "東三", "東四", "南一", "南二", "南三", "南四"].map(
                (roundName, index) => {
                  return (
                    <PopButton
                      key={index}
                      onClick={() => setValue("what_to_discard_problem.round", roundName)}
                      className="form-button">
                      {roundName}
                    </PopButton>
                  );
                },
              )}
            </Wrap>
          </VStack>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.turn)} isRequired>
          <VStack alignItems="start">
            <FormLabel fontSize="lg" m="0">
              巡目
            </FormLabel>
            <FormErrorMessage>{errors.what_to_discard_problem?.turn?.message}</FormErrorMessage>
            <VisuallyHiddenInput {...register("what_to_discard_problem.turn")} readOnly />
            <DisplayInput>
              {watch("what_to_discard_problem.turn") &&
                `${getValues("what_to_discard_problem.turn")}巡目`}
            </DisplayInput>

            <Wrap gap={2}>
              {Array(MAX_TURN)
                .fill(null)
                .map((_, index) => {
                  const turn = index + 1;
                  return (
                    <PopButton
                      onClick={() => setValue("what_to_discard_problem.turn", turn)}
                      className="form-button"
                      key={index}>
                      {`${turn}巡目`}
                    </PopButton>
                  );
                })}
            </Wrap>
          </VStack>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.wind)} isRequired>
          <VStack alignItems="start">
            <FormLabel fontSize="lg" m="0">
              風
            </FormLabel>
            <FormErrorMessage>{errors.what_to_discard_problem?.wind?.message}</FormErrorMessage>
            <VisuallyHiddenInput {...register("what_to_discard_problem.wind")} readOnly />
            <DisplayInput>
              {watch("what_to_discard_problem.wind") &&
                `${getValues("what_to_discard_problem.wind")}家`}
            </DisplayInput>

            <Wrap gap={2}>
              {["東", "南", "西", "北"].map((windName, index) => {
                return (
                  <PopButton
                    key={index}
                    onClick={() => setValue("what_to_discard_problem.wind", windName)}
                    className="form-button">
                    {windName}
                  </PopButton>
                );
              })}
            </Wrap>
          </VStack>
        </FormControl>

        <FormControl isRequired isInvalid={pointFieldErrors.some(Boolean)}>
          <VStack alignItems="start">
            <FormLabel as="legend" fontSize="lg" m="0">
              点数状況
            </FormLabel>

            <HStack>
              <Text>合計</Text>
              <Text
                fontFamily="sans-serif"
                fontWeight="bold"
                className={`${pointSum == TOTAL_POINTS ? "text-green-500" : "text-red-500"}`}>
                {new Intl.NumberFormat("en-US").format(pointSum)}
              </Text>
              <Text fontFamily="sans-serif">/ 100,000</Text>点
            </HStack>

            <FormErrorMessage>{pointFieldErrors.find(Boolean)?.message}</FormErrorMessage>
            <Wrap gap={2}>
              {(
                [
                  { label: "東家", inputName: "what_to_discard_problem.point_east" },
                  { label: "南家", inputName: "what_to_discard_problem.point_south" },
                  { label: "西家", inputName: "what_to_discard_problem.point_west" },
                  { label: "北家", inputName: "what_to_discard_problem.point_north" },
                ] as const
              ).map((obj, index) => {
                return (
                  <Box key={index}>
                    <FormLabel htmlFor={obj.inputName} m="0">
                      {obj.label}
                    </FormLabel>
                    <VisuallyHiddenInput {...register(obj.inputName)} readOnly />
                    <DisplayInput
                      className={`form-button ${
                        focussedPointFieldName == obj.inputName
                          ? "scale-105 border-blue-500 shadow shadow-blue-500"
                          : "border border-primary"
                      }`}
                      onClick={() => setFocussedPointFieldName(obj.inputName)}>
                      {watch(obj.inputName) &&
                        new Intl.NumberFormat("en-US").format(watch(obj.inputName))}
                    </DisplayInput>
                  </Box>
                );
              })}
            </Wrap>

            <Wrap gap={2}>
              {[10000, -10000, 1000, -1000, 100, -100].map((addend, index) => {
                return (
                  <PopButton
                    key={index}
                    className="form-button"
                    onClick={() =>
                      setValue(
                        focussedPointFieldName,
                        Number(getValues(focussedPointFieldName)) + addend,
                      )
                    }>
                    {`${addend > 0 ? "+" : ""} ${new Intl.NumberFormat("en-US").format(addend)}`}
                  </PopButton>
                );
              })}

              <PopButton
                className="form-button"
                onClick={() => pointFieldNames.map(fieldName => setValue(fieldName, 25000))}>
                得点をリセット
              </PopButton>
            </Wrap>
          </VStack>
        </FormControl>

        <FormControl isRequired isInvalid={tileFiledErrors.some(Boolean)}>
          <VStack alignItems="start">
            <FormLabel as="legend" fontSize="lg" m="0">
              手牌状況
            </FormLabel>

            <FormErrorMessage>{tileFiledErrors.find(Boolean)?.message}</FormErrorMessage>

            <Box>
              <FormLabel fontSize="lg" m="0">
                ドラ
              </FormLabel>
              <VisuallyHiddenInput {...register("what_to_discard_problem.dora_id")} readOnly />
              <button
                type="button"
                onClick={() => setFocussedTileFieldName("what_to_discard_problem.dora_id")}
                className={`${
                  focussedTileFieldName == "what_to_discard_problem.dora_id"
                    ? "scale-105 border-blue-500 shadow shadow-blue-500"
                    : "border-primary"
                }
                      w-9 h-12 rounded-sm border`}>
                {watch("what_to_discard_problem.dora_id") && (
                  <TileImage tile={getValues("what_to_discard_problem.dora_id")} hover={false} />
                )}
              </button>
            </Box>

            <Box>
              <FormLabel fontSize="lg" m="0">
                手牌
              </FormLabel>

              <Flex gap={1}>
                {tileFieldNames
                  .filter(
                    fieldName =>
                      fieldName != "what_to_discard_problem.dora_id" &&
                      fieldName != "what_to_discard_problem.tsumo_id",
                  )
                  .map((fieldName, index) => {
                    return (
                      <Box key={index}>
                        <VisuallyHiddenInput {...register(fieldName)} readOnly />
                        <button
                          type="button"
                          onClick={() => setFocussedTileFieldName(fieldName)}
                          className={`w-9 h-12 rounded-sm border ${
                            focussedTileFieldName == fieldName
                              ? "scale-105 border-blue-500 shadow shadow-blue-500"
                              : "border-secondary"
                          }`}>
                          {watch(fieldName) && (
                            <TileImage tile={getValues(fieldName)} hover={false} />
                          )}
                        </button>
                      </Box>
                    );
                  })}
              </Flex>
            </Box>

            <Box>
              <FormLabel>ツモ</FormLabel>
              <VisuallyHiddenInput {...register("what_to_discard_problem.tsumo_id")} readOnly />
              <button
                type="button"
                onClick={() => setFocussedTileFieldName("what_to_discard_problem.tsumo_id")}
                className={`${
                  focussedTileFieldName == "what_to_discard_problem.tsumo_id"
                    ? "scale-105 border-blue-500 shadow shadow-blue-500"
                    : "border border-primary"
                }
                      w-9 h-12 rounded-sm border`}>
                {watch("what_to_discard_problem.tsumo_id") && (
                  <TileImage tile={getValues("what_to_discard_problem.tsumo_id")} hover={false} />
                )}
              </button>
            </Box>

            <PopButton
              className="form-button"
              onClick={() => {
                tileFieldNames.map(fieldName => setValue(fieldName, null));
                setFocussedTileFieldName("what_to_discard_problem.dora_id");
              }}>
              牌をリセット
            </PopButton>
          </VStack>
        </FormControl>

        <Divider borderColor="gray.500" variant="dashed" />

        <Box>
          <Wrap>
            {Array(ALL_TILES_NUM)
              .fill(null)
              .map((_, index) => {
                const tileId = index + 1;

                return (
                  <Flex flexDir="column" alignItems="center" key={index}>
                    <PopButton
                      onClick={() => handleTileInputted(tileId)}
                      className="w-10 border  border-primary rounded-sm">
                      <TileImage tile={tileId} hover={false} />
                    </PopButton>
                  </Flex>
                );
              })}
          </Wrap>
        </Box>

        <Center>
          <Button type="submit" colorScheme="teal" size="lg" isLoading={isSubmitting}>
            作成する
          </Button>
        </Center>
      </VStack>
    </form>
  );
}

const DisplayInput = ({
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
      onClick={onClick}>
      {children}
    </Text>
  );
};
