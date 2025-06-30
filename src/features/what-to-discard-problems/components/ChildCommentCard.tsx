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
    <Box w="full" h="24">
      <Flex alignItems="center" justifyContent="space-between">
        <Button bgColor="inherit" h="fit-content" p="0" pr="2" onClick={onOpen}>
          <HStack>
            <Circle size="8" overflow="hidden" border="1px">
              <Img
                src={reply.user.avatar_url || "/no-image.webp"}
                className="w-full h-full object-cover"
              />
            </Circle>
            <Text fontWeight="bold" color="#365158">
              {reply.user.name}
            </Text>
          </HStack>
        </Button>

        <Box>
          {isMyComment && (
            <Button size="sm" px="1" bgColor="inherit">
              <IoMdTrash size={20} color="#365158" />
            </Button>
          )}
        </Box>
      </Flex>

      <Text fontFamily="sans-serif" fontSize="xs" color="#466163">
        {new Date(reply.created_at).toLocaleString()}
      </Text>

      <Box className="pl-1 mt-2">
        <Text>{reply.content}</Text>

        {/* <LikeButton /> */}
      </Box>

      <UserModal userId={reply.user.id} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
