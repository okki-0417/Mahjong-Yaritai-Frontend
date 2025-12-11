import {
  GameSessionFormType,
  GameType,
} from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { Button, HStack, Text } from "@chakra-ui/react";
import { FieldArrayWithId } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

type Props = {
  /* eslint-disable-next-line no-unused-vars */
  appendGame: (value: GameType) => void;
  participantUserFields: FieldArrayWithId<GameSessionFormType, "participantUsers", "id">[];
};

export default function AddGameButton({ appendGame, participantUserFields }: Props) {
  const handleAddGame = () => {
    appendGame({
      results: participantUserFields.map(() => ({ resultPoints: null })),
    });
  };

  return (
    <HStack as={Button} variant="ghost" onClick={handleAddGame} size="xs" align="center" gap="1px">
      <IoMdAdd size={18} />
      <Text as="span">ゲームを追加</Text>
    </HStack>
  );
}
