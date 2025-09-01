"use client";

import { SubmitHandler } from "react-hook-form";
import { useCustomForm } from "@/src/hooks/useCustomForm";
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
  Textarea,
  VisuallyHiddenInput,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import useErrorToast from "@/src/hooks/useErrorToast";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { customCreateWhatToDiscardProblem_BodySchema } from "@/src/features/what-to-discard-problems/schema/customWhatToDiscardProbemSchema";

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

export default function ProblemForm({
  setIsCreateFormOpen,
  setProblems,
}: {
  setIsCreateFormOpen: Dispatch<SetStateAction<boolean>>;
  setProblems: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
}) {
  const [focussedTileFieldName, setFocussedTileFieldName] = useState<
    (typeof tileFieldNames)[number]
  >("what_to_discard_problem.hand1_id");

  const [detailSettingVisible, setDetailSettingVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useCustomForm<z.infer<typeof customCreateWhatToDiscardProblem_BodySchema>>({
    resolver: zodResolver(customCreateWhatToDiscardProblem_BodySchema),
    mode: "onChange",
  });

  const tileFiledErrors = [
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
    errors.what_to_discard_problem?.dora_id,
  ];

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

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

  const handleTileClick = (tileId: string) => {
    setValue(focussedTileFieldName, tileId);

    const nextFocussedTileFieldName = tileFieldNames.find(
      name => Boolean(getValues(name)) == false,
    );

    if (nextFocussedTileFieldName) {
      setFocussedTileFieldName(nextFocussedTileFieldName);
    }

    return null;
  };

  const handleTileReset = () => {
    tileFieldNames.map(fieldName => setValue(fieldName, null));
    setFocussedTileFieldName("what_to_discard_problem.hand1_id");
  };

  const TileDisplay = ({ fieldName }: { fieldName: typeof focussedTileFieldName }) => (
    <Box>
      <VisuallyHiddenInput {...register(fieldName)} readOnly />
      <button
        type="button"
        onClick={() => setFocussedTileFieldName(fieldName)}
        className={`h-12 aspect-7/9 border rounded-sm ${
          focussedTileFieldName == fieldName
            ? "border-blue-500 shadow shadow-blue-500"
            : "border-secondary"
        }`}>
        {watch(fieldName) && <TileImage tileId={getValues(fieldName)} hover={false} />}
      </button>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral text-primary">
      <VStack gap={6} align="stretch">
        <FormControl isRequired isInvalid={tileFiledErrors.some(Boolean)}>
          <VStack alignItems="start">
            <FormErrorMessage>{tileFiledErrors.find(Boolean)?.message}</FormErrorMessage>

            <Box>
              <FormLabel fontSize="lg" m="0">
                手牌
              </FormLabel>

              <Wrap gap="0" mt="2">
                {handFieldNames.map((fieldName, index) => (
                  <TileDisplay key={index} fieldName={fieldName} />
                ))}
              </Wrap>
            </Box>

            <HStack>
              <Box>
                <FormLabel fontSize="md" m="0">
                  ツモ
                </FormLabel>

                <TileDisplay fieldName="what_to_discard_problem.tsumo_id" />
              </Box>

              <Box>
                <FormLabel fontSize="md" m="0">
                  ドラ
                </FormLabel>

                <TileDisplay fieldName="what_to_discard_problem.dora_id" />
              </Box>
            </HStack>

            <PopButton className="form-button" onClick={() => handleTileReset()}>
              <Text as="span" fontSize={["md", "lg"]}>
                牌をリセット
              </Text>
            </PopButton>
          </VStack>

          <Divider borderColor="gray.500" variant="dashed" mt="6" />

          <Box mt="6">
            <Text fontSize="sm">牌をクリックして選ぶ</Text>
            <Wrap mt="1">
              {Array.from({ length: ALL_TILES_NUM }).map((_, index) => {
                const tileId = String(index + 1);
                return (
                  <Flex flexDir="column" alignItems="center" key={index}>
                    <PopButton
                      onClick={() => handleTileClick(tileId)}
                      className="h-12 aspect-7/9 border  border-primary rounded-sm">
                      <TileImage tile={tileId} hover={false} />
                    </PopButton>
                  </Flex>
                );
              })}
            </Wrap>
          </Box>
        </FormControl>

        <Button onClick={() => setDetailSettingVisible(!detailSettingVisible)}>詳細な設定</Button>

        <VStack>
          <FormControl>
            <Textarea
              {...register("what_to_discard_problem.description")}
              placeholder="問題にコメントを追加する（任意）"
              rows={5}
            />
          </FormControl>
        </VStack>

        <VStack spacing="6" display={detailSettingVisible ? "flex" : "none"}>
          <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.round)}>
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
                        <Text as="span" fontSize="lg">
                          {roundName}
                        </Text>
                      </PopButton>
                    );
                  },
                )}
              </Wrap>

              <PopButton
                className="form-button"
                onClick={() => setValue("what_to_discard_problem.round", null)}>
                <Text as="span" fontSize="lg">
                  局数をリセット
                </Text>
              </PopButton>
            </VStack>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.turn)}>
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
                {Array.from({ length: MAX_TURN }).map((_, index) => {
                  const turn = String(index + 1);
                  return (
                    <PopButton
                      onClick={() => setValue("what_to_discard_problem.turn", turn)}
                      className="form-button"
                      key={index}>
                      <Text fontSize="lg">{`${turn}巡目`}</Text>
                    </PopButton>
                  );
                })}
              </Wrap>

              <PopButton
                className="form-button"
                onClick={() => setValue("what_to_discard_problem.turn", null)}>
                <Text as="span" fontSize="lg">
                  巡目をリセット
                </Text>
              </PopButton>
            </VStack>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.wind)}>
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
                      <Text fontSize="lg">{windName}</Text>
                    </PopButton>
                  );
                })}
              </Wrap>

              <PopButton
                className="form-button"
                onClick={() => setValue("what_to_discard_problem.wind", null)}>
                <Text as="span" fontSize="lg">
                  風をリセット
                </Text>
              </PopButton>
            </VStack>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.what_to_discard_problem?.points)}>
            <VStack alignItems="start">
              <Box>
                <FormLabel m="0" fontSize="xl">
                  持ち点
                </FormLabel>

                <FormErrorMessage>
                  {errors.what_to_discard_problem?.points?.message}
                </FormErrorMessage>

                <VisuallyHiddenInput {...register("what_to_discard_problem.points")} readOnly />

                <DisplayInput>
                  {watch("what_to_discard_problem.points") &&
                    new Intl.NumberFormat("en-US").format(
                      Number(watch("what_to_discard_problem.points")),
                    )}
                </DisplayInput>
              </Box>

              <Wrap gap={2}>
                {[10000, 1000, 100, -10000, -1000, -100].map((addend, index) => (
                  <PopButton
                    key={index}
                    className="form-button"
                    onClick={() =>
                      setValue(
                        "what_to_discard_problem.points",
                        String(Number(getValues("what_to_discard_problem.points")) + addend),
                      )
                    }>
                    <Text as="span" fontSize="lg">
                      {`${addend > 0 ? "+" : ""} ${new Intl.NumberFormat("en-US").format(addend)}`}
                    </Text>
                  </PopButton>
                ))}
              </Wrap>

              <PopButton
                className="form-button"
                onClick={() => setValue("what_to_discard_problem.points", null)}>
                <Text as="span" fontSize="lg">
                  得点をリセット
                </Text>
              </PopButton>
            </VStack>
          </FormControl>
        </VStack>

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
      w="xs"
      minH="12"
      border="1px"
      borderColor="gray.400"
      py={2}
      px={4}
      fontSize="xl"
      width={40}
      borderRadius="md"
      bgColor="gray.50"
      className={className}
      onClick={onClick}>
      {children}
    </Text>
  );
};
