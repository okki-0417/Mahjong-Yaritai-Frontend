import {
  GameSessionFormType,
  GameType,
  ParticipantUserType,
} from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { SimpleGrid, Td, Text, VStack } from "@chakra-ui/react";
import { FieldArrayWithId } from "react-hook-form";

type Props = {
  participantUsers: ParticipantUserType[];
  games: GameType[];
  rate: number;
  participantUserFields: FieldArrayWithId<GameSessionFormType, "participantUsers", "id">[];
};

export default function TotalProfitsFormControls({
  participantUsers,
  games,
  rate,
  participantUserFields,
}: Props) {
  const totalProfitsByParticipant = participantUsers.map((_, participantIndex) => {
    return games.reduce((acc, game) => {
      const profit = (game.results[participantIndex]?.resultPoints || 0) * rate;

      return acc + profit;
    }, 0);
  });

  return (
    <SimpleGrid as="div" columns={participantUserFields.length} w="full">
      {totalProfitsByParticipant.map((totalProfit, index) => (
        <Td
          as={VStack}
          key={participantUserFields[index].id}
          px="1"
          py="4"
          borderBottom=""
          _even={{ bg: "neutral.300" }}>
          <Text
            fontSize={["sm", "2xl"]}
            fontWeight="bold"
            color={totalProfit > 0 ? "blue.500" : totalProfit < 0 ? "red.500" : "inherit"}>
            {totalProfit}
          </Text>
        </Td>
      ))}
    </SimpleGrid>
  );
}
