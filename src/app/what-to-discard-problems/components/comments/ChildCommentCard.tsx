"use client";

import UserModal from "@/src/components/Modals/UserModal";
import DeleteCommentButton from "@/src/app/what-to-discard-problems/components/comments/DeleteCommentButton";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import { Comment } from "@/src/generated/graphql";
import { Box, Button, Circle, Flex, HStack, Img, Text, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";

export default function ChildCommentCard({ reply }: { reply: Comment }) {
  const { session } = useContext(SessionContext);
  const isMyComment = reply.user.id == String(session?.userId);

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
                  src={reply.user.avatarUrl || "/no-image.webp"}
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
          {new Date(reply.createdAt).toLocaleString()}
        </Text>

        <Text>{reply.content}</Text>
      </Box>

      <UserModal
        user={reply.user}
        isOpen={isOpen}
        onClose={onClose}
        isFollowing={false}
        currentUserId={session?.userId ? Number(session.userId) : null}
      />
    </>
  );
}
