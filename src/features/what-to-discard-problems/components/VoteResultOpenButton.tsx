"use client";

import ButtonAccent from "@/src/components/Buttons/ButtonAccent";
import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { Center, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";

export default function VoteResultOpenButton() {
  const { isVoteResultOpen, setIsVoteResultOpen } = useContext(IsVoteResultOpenContext);

  return (
    <Center>
      <ButtonAccent onClick={() => setIsVoteResultOpen(!isVoteResultOpen)}>
        <HStack gap="1">
          <Text fontSize={["md", "lg"]}>投票結果</Text>
          <FaAngleDown
            size="18"
            className={`transition-all  ${isVoteResultOpen && "rotate-180"}`}
          />
        </HStack>
      </ButtonAccent>
    </Center>
  );
}
