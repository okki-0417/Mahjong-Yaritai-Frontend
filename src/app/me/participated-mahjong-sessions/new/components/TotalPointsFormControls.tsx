"use client";

import {
  GameSessionFormType,
  GameType,
  ParticipantUserType,
} from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import TotalPointsFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/TotalPointsFormControl";
import { SimpleGrid } from "@chakra-ui/react";
import { FieldArrayWithId } from "react-hook-form";

type Props = {
  participantUserFields: FieldArrayWithId<GameSessionFormType, "participantUsers", "id">[];
  participantUsers: ParticipantUserType[];
  games: GameType[];
};

export default function TotalPointsFormControls({
  participantUserFields,
  participantUsers,
  games,
}: Props) {
  const totalPointsByParticipant = participantUsers.map((_, participantIndex) => {
    return games.reduce((acc, game) => {
      return acc + (game.results[participantIndex]?.resultPoints || 0);
    }, 0);
  });

  return (
    <SimpleGrid as="div" columns={participantUsers.length} w="full">
      {totalPointsByParticipant.map((totalPoints, participantIndex) => (
        <TotalPointsFormControl
          key={participantUserFields[participantIndex].id}
          participantUserFieldId={participantUserFields[participantIndex].id}
          totalPoints={totalPoints}
        />
      ))}
    </SimpleGrid>
  );
}
