"use client";

import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { Button, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";

export default function VoteResultOpenButton() {
  const { isVoteResultOpen, setIsVoteResultOpen } = useContext(IsVoteResultOpenContext);

  return (
    <Center mt={[3, 6]}>
      {!isVoteResultOpen && (
        <Button
          bgColor="inherit"
          color="white"
          _hover={{ bgColor: "green.400" }}
          onClick={() => setIsVoteResultOpen(!isVoteResultOpen)}>
          投票結果
          <FaAngleDown />
        </Button>
      )}
    </Center>
  );
}
