import { Button, Flex } from "@chakra-ui/react";
import { FaAngleUp } from "react-icons/fa";

export default function CloseAccordionButton({
  onClick,
  arrowColor = "inherit",
}: {
  onClick: () => any;
  arrowColor?: string;
}) {
  return (
    <Flex justify="center" mt={3}>
      <Button
        bgColor="inherit"
        onClick={() => {
          onClick();
        }}
      >
        <FaAngleUp color={arrowColor} />
      </Button>
    </Flex>
  );
}
