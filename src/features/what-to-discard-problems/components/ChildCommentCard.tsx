import UserModal from "@/src/components/Modals/UserModal";
import DeleteCommentButton from "@/src/features/what-to-discard-problems/components/DeleteCommentButton";
import useMyUserId from "@/src/hooks/useMyUserId";
import { schemas } from "@/src/zodios/api";
import { Box, Button, Circle, Flex, HStack, Img, Text, useDisclosure } from "@chakra-ui/react";
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
              <Text fontWeight="bold" className="text-primary">
                {reply.user.name}
              </Text>
            </HStack>
          </Button>

          <Box>{isMyComment && <DeleteCommentButton comment={reply} />}</Box>
        </Flex>

        <Text fontFamily="sans-serif" fontSize="xs" className="text-primary">
          {new Date(reply.created_at).toLocaleString()}
        </Text>

        <Text>{reply.content}</Text>
      </Box>

      <UserModal user={reply.user} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
