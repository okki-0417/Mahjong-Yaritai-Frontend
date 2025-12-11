"use client";

import { Button, HStack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

type Props = {
  appendParticipantUser: (
    /* eslint-disable-next-line no-unused-vars */
    value: {
      userId: string;
      avatarUrl: string;
      name: string;
    },
  ) => void;
};

export default function AddParticipantUserButton({ appendParticipantUser }: Props) {
  const handleAddParticipantUser = () => {
    appendParticipantUser({ userId: "", name: "", avatarUrl: "" });
  };

  return (
    <HStack
      as={Button}
      css={{ writingMode: "vertical-rl" }}
      h="auto"
      gap="1px"
      borderRadius="0"
      borderRightRadius={["sm", "md"]}
      px="0"
      size="xs"
      bg="neutral.100"
      variant="ghost"
      borderLeft="1px solid"
      borderColor="secondary.50"
      onClick={handleAddParticipantUser}>
      <IoMdAdd size={18} />
      <Text as="span">ユーザーを追加</Text>
    </HStack>
  );
}
