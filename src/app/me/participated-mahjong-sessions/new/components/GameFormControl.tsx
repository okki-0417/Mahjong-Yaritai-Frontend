"use client";

import GameResultFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/GameResultFormControl";
import {
  GameSessionFormType,
  GameType,
} from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { HStack, SimpleGrid, Text, Th, Tr, VStack } from "@chakra-ui/react";
import { FieldArrayWithId, FieldErrors } from "react-hook-form";

type Props = {
  gameResultPoints: GameType["results"];
  gameFieldId: string;
  gameIndex: number;
  participantUserFields: FieldArrayWithId<GameSessionFormType, "participantUsers", "id">[];
  gameError?: FieldErrors<GameSessionFormType>["games"][number];
  register: any;
};

export default function GameFormControl({
  gameFieldId,
  gameResultPoints,
  gameIndex,
  participantUserFields,
  gameError,
  register,
}: Props) {
  return (
    <Tr as={HStack} gap="0" key={gameFieldId} align="stretch" borderBottom="0">
      <Th
        as={VStack}
        px="0"
        py="4"
        w={["10", "16"]}
        fontSize={["md", "xl"]}
        borderBottom=""
        color="primary.500"
        borderColor="secondary.50"
        borderRightWidth="1.5px">
        <Text>{gameIndex + 1}</Text>
      </Th>

      <SimpleGrid as="div" columns={participantUserFields.length} w="full" alignItems="stretch">
        {participantUserFields.map((participantUserField, participantIndex) => (
          <GameResultFormControl
            key={participantUserField.id}
            gameResultError={gameError?.results?.[participantIndex]}
            resultPoints={gameResultPoints[participantIndex]?.resultPoints}
            register={register}
            gameIndex={gameIndex}
            participantIndex={participantIndex}
          />
        ))}
      </SimpleGrid>
    </Tr>
  );
}
