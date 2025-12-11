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
  participantUserFields: FieldArrayWithId<GameSessionFormType, "participantUsers", "id">[];
};

export default function AverageRakingFormControls({
  participantUsers,
  games,
  participantUserFields,
}: Props) {
  const averageRankingByParticipant = participantUsers.map((_, participantIndex) => {
    let validGameCount = 0;

    const totalRanking = games.reduce((acc, game) => {
      // 各参加者の結果と元のインデックスを保持
      const resultsWithOriginalIndex = game.results.map((result, index) => ({
        originalIndex: index,
        resultPoints: result.resultPoints,
      }));

      // valueAsNumber: true により、未入力フィールドはNaNになる
      // NaNの結果を除外して、入力済みのゲームのみを対象とする
      const filteredResults = resultsWithOriginalIndex.filter(
        result => !isNaN(result.resultPoints),
      );

      if (filteredResults.length === 0) {
        return acc;
      }

      const sortedGameResultsByResultPoints = filteredResults.sort(
        (a, b) => b.resultPoints - a.resultPoints,
      );

      // participantUsersの並び順と各ゲームの結果の並び順は同じなので、
      // participantUserのindexと各ゲームの結果のindexは対応しており、
      // participantIndexを使って各ゲームの結果から自分の順位を特定できる
      const participantResultIndex = sortedGameResultsByResultPoints.findIndex(
        sortedResult => sortedResult.originalIndex === participantIndex,
      );

      const currentResultPoints =
        sortedGameResultsByResultPoints[participantResultIndex]?.resultPoints;

      if (currentResultPoints == null) {
        return acc;
      }

      // 自分より上位（高得点）で、自分と異なる得点の人数を数える
      // 同点の場合は同じ順位とするため、自分と同じ得点の人はカウントしないため
      const greaterPointsParticipantsCount = sortedGameResultsByResultPoints.filter(
        result => result.resultPoints > currentResultPoints,
      ).length;

      const ranking = greaterPointsParticipantsCount + 1;

      validGameCount++;

      return acc + ranking;
    }, 0);

    if (validGameCount === 0) return 0;

    const rawAverageRanking = totalRanking / validGameCount;
    const multiplied = rawAverageRanking * 100;
    return Math.round(multiplied) / 100;
  });

  return (
    <SimpleGrid as="div" columns={participantUserFields.length} w="full">
      {participantUserFields.map(participant => (
        <Td
          as={VStack}
          key={participant.id}
          textAlign="center"
          px="1"
          py="4"
          fontSize={["lg", "xl"]}
          borderBottom=""
          _even={{ bg: "neutral.300" }}>
          <Text fontSize={["xl", "2xl"]}>
            {averageRankingByParticipant[participantUserFields.indexOf(participant)] || "-"}
          </Text>
        </Td>
      ))}
    </SimpleGrid>
  );
}
