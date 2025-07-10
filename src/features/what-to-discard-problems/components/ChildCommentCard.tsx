import UserModal from "@/src/components/Modals/UserModal";
import useMyUserId from "@/src/hooks/useMyUserId";
import { schemas } from "@/src/zodios/api";
import { Box, Button, Circle, Flex, HStack, Img, Text, useDisclosure } from "@chakra-ui/react";
import { IoMdTrash } from "react-icons/io";
import { z } from "zod";

export default function ChildCommentCard({ reply }: { reply: z.infer<typeof schemas.Comment> }) {
  const isMyComment = reply.user.id == useMyUserId();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w="full" h="24">
        <Flex alignItems="center" justifyContent="space-between">
          <Button
            bgColor="inherit"
            _hover={{ bgColor: "gray.400" }}
            h="fit-content"
            p="0"
            pr="2"
            onClick={onOpen}>
            <HStack>
              <Circle size="8" overflow="hidden" border="1px">
                <Img
                  src={reply.user.avatar_url || "/no-image.webp"}
                  className="w-full h-full object-cover"
                />
              </Circle>
              <Text fontWeight="bold" className="text-neutral">
                {reply.user.name}
              </Text>
            </HStack>
          </Button>

          <Box>
            {isMyComment && (
              <Button size="sm" px="1" bgColor="inherit" _hover={{ bgColor: "gray.400" }}>
                <IoMdTrash size={20} className="text-neutral" />
              </Button>
            )}
          </Box>
        </Flex>

        <Text fontFamily="sans-serif" fontSize="xs" className="text-neutral">
          {new Date(reply.created_at).toLocaleString()}
        </Text>

        <Text>{reply.content}</Text>
      </Box>

      <UserModal user={reply.user} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
