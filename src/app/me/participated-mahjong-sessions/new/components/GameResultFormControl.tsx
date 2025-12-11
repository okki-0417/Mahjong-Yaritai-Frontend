"use client";

import { GameSessionFormType } from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { useNumberInput } from "@/src/hooks/useNumberInput";
import {
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Td,
} from "@chakra-ui/react";
import { FieldErrors } from "react-hook-form";

type Props = {
  gameResultError: FieldErrors<GameSessionFormType>["games"][number]["results"][number];
  resultPoints: number;
  register: any;
  gameIndex: number;
  participantIndex: number;
};

export default function GameResultFormControl({
  gameResultError,
  resultPoints,
  register,
  gameIndex,
  participantIndex,
}: Props) {
  const handleResultPointsInput = useNumberInput({ min: -999, max: 999 });

  return (
    <Td
      as={HStack}
      borderBottom=""
      _odd={{ bg: "neutral.200", _hover: { bg: "neutral.300" } }}
      _even={{ bg: "neutral.300", _hover: { bg: "neutral.400" } }}
      p="0"
      alignItems="stretch"
      justifyContent="stretch">
      <FormControl isInvalid={Boolean(gameResultError)}>
        <HStack as={Editable} defaultValue={resultPoints} h="full" w="full">
          <HStack
            as={EditablePreview}
            cursor="pointer"
            fontWeight="bold"
            fontSize={["xl", "2xl"]}
            textAlign="center"
            w="full"
            h="full"
            p="0"
            justify="center"
            color={resultPoints > 0 ? "blue.500" : resultPoints < 0 ? "red.500" : "inherit"}
          />
          <Input
            as={EditableInput}
            type="number"
            fontWeight="bold"
            fontSize={["xl", "2xl"]}
            px={[0, 2]}
            textAlign="center"
            {...register(`games.${gameIndex}.results.${participantIndex}.resultPoints` as const, {
              valueAsNumber: true,
            })}
            onInput={handleResultPointsInput}
          />
        </HStack>
        <FormErrorMessage>{gameResultError?.message}</FormErrorMessage>
      </FormControl>
    </Td>
  );
}
