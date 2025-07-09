"use client";

import UserModal from "@/src/components/Modals/UserModal";
import ChildCommentCard from "@/src/features/what-to-discard-problems/components/ChildCommentCard";
import DeleteCommentButton from "@/src/features/what-to-discard-problems/components/DeleteCommentButton";
import FetchRepliesButton from "@/src/features/what-to-discard-problems/components/FetchRepliesButton";
import ReplyContext from "@/src/features/what-to-discard-problems/context-providers/contexts/ReplyContext";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import useMyUserId from "@/src/hooks/useMyUserId";
import { schemas } from "@/src/zodios/api";
import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Img,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MdOutlineReply } from "react-icons/md";
import { z } from "zod";

export default function ParentCommentCard({
  comment,
}: {
  comment: z.infer<typeof schemas.Comment>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMyComment = comment.user.id == useMyUserId();

  const auth = useIsLoggedIn();

  const [replies, setReplies] = useState<z.infer<typeof schemas.Comment>[] | null>(null);

  const { setReplyToComment, setSetRepliesFromContext } = useContext(ReplyContext);

  return (
    <Box w="full" pb="4">
      <Flex alignItems="center" justifyContent="space-between">
        <Button bgColor="inherit" h="fit-content" p="0" pr="2" onClick={onOpen}>
          <HStack>
            <Circle size="8" overflow="hidden" border="1px">
              <Img
                src={comment.user.avatar_url || "/no-image.webp"}
                className="w-full h-full object-cover"
              />
            </Circle>
            <Text fontWeight="bold" color="#365158">
              {comment.user.name}
            </Text>
          </HStack>
        </Button>

        <Box>
          {auth && !isMyComment && (
            <Button
              size="sm"
              px="1"
              onClick={() => {
                setReplyToComment(comment);
                setSetRepliesFromContext(setReplies);
              }}
              bgColor="inherit">
              <MdOutlineReply size={18} color="#365158" />
            </Button>
          )}

          {isMyComment && <DeleteCommentButton comment={comment} />}
        </Box>
      </Flex>

      <Text fontFamily="sans-serif" fontSize="xs" color="#466163">
        {new Date(comment.created_at).toLocaleString()}
      </Text>

      <Box className="pl-1 mt-2">
        <Text>{comment.content}</Text>

        {/* <LikeButton /> */}
      </Box>

      {!replies && Boolean(comment.repliesCount) && (
        <FetchRepliesButton setReplies={setReplies} comment={comment} />
      )}

      {replies && (
        <VStack mt="4">
          {replies.map((reply, index) => {
            return (
              <HStack w="full" pl="4" h="24" key={index}>
                <Box w="1" h="full" bgColor="#466163" rounded="full" />
                <ChildCommentCard reply={reply} />
              </HStack>
            );
          })}
        </VStack>
      )}

      <UserModal user={comment.user} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
