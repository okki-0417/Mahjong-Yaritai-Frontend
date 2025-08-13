import { Button, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function SocialLoginButton({
  handler,
  label,
  iconURL,
}: {
  handler: () => any;
  label: string;
  iconURL: string;
}) {
  return (
    <VStack maxW="xs" mt="2" align="center">
      <Button onClick={handler} rounded="full" bgColor="white" fontWeight="normal" py="1">
        <HStack>
          <Circle size="8">
            <Image src={iconURL} alt="" width="160" height="160" />
          </Circle>
          <Text w="full" textAlign="center" className="text-primary">
            {label}
          </Text>
        </HStack>
      </Button>
    </VStack>
  );
}
