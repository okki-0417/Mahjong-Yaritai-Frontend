"use client";

import ParticipantUserModal from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipantUserModal";
import {
  GameSessionFormType,
  ParticipantUserType,
} from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { Avatar, Input, Th, useDisclosure, VisuallyHiddenInput, VStack } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  participantUserIndex: number;
  register: UseFormRegister<GameSessionFormType>;
  participantUser: ParticipantUserType;
};

export default function ParticipantUserFormControl({
  participantUserIndex,
  register,
  participantUser,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleParticipantUserClick = () => {
    if (!participantUser.userId) return;

    onOpen();
  };

  return (
    <>
      <Th
        as="div"
        onClick={handleParticipantUserClick}
        textAlign="center"
        m="0"
        px="1"
        py="2"
        w="full"
        cursor="pointer"
        _hover={{ bg: "neutral.300" }}
        _even={{ bg: "neutral.300", _hover: { bg: "neutral.400" } }}>
        <VStack spacing="2" w="full">
          <VisuallyHiddenInput
            {...register(`participantUsers.${participantUserIndex}.userId` as const)}
          />
          <VisuallyHiddenInput
            {...register(`participantUsers.${participantUserIndex}.avatarUrl` as const)}
          />
          <Avatar size={["sm", "md"]} name={participantUser.name} src={participantUser.avatarUrl} />
          <Input
            readOnly
            fontSize={["sm", "md"]}
            fontWeight="bold"
            variant="unstyled"
            textAlign="center"
            noOfLines={1}
            color="primary.500"
            overflow="hidden"
            whiteSpace="nowrap"
            w="full"
            textTransform="none"
            textOverflow="ellipsis"
            {...register(`participantUsers.${participantUserIndex}.name` as const)}
          />
        </VStack>
      </Th>

      <ParticipantUserModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
