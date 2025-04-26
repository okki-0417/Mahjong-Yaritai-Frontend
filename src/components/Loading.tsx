import { Flex } from "@chakra-ui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <Flex justify="center">
      <div className="animate-spin w-fit">
        <AiOutlineLoading3Quarters size={30} />
      </div>
    </Flex>
  );
}
