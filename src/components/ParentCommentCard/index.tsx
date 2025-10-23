"use client";

import FetchRepliesButton from "@/src/components/ParentCommentCard/FetchRepliesButton";
import { Comment } from "@/src/generated/graphql";
import { Box, Button, Circle, HStack, Img, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineReply } from "react-icons/md";
import useGetSession from "@/src/hooks/useGetSession";
import UserModal from "@/src/components/Modals/UserModal";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import ChildCommentCard from "@/src/components/ChildCommentCard";

type Props = {
  comment: Comment;
  /* eslint-disable-next-line no-unused-vars */
  onReply: (comment: Comment) => void;
  commentableType: string;
  commentableId: string;
};

export default function ParentCommentCard({
  comment,
  onReply,
  commentableType,
  commentableId,
}: Props) {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const { session } = useGetSession();
  const isLoggedIn = session?.isLoggedIn;

  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose,
  } = useDisclosure();

  const {
    isOpen: isNotLoggedInModalOpen,
    onOpen: onNotLoggedInModalOpen,
    onClose: onNotLoggedInModalClose,
  } = useDisclosure();

  const handleReplyClick = () => {
    if (!isLoggedIn) {
      onNotLoggedInModalOpen();
      return;
    }
    onReply(comment);
  };

  const onRepliesFetched = (fetchedReplies: Comment[]) => {
    setReplies(fetchedReplies);
    setIsRepliesVisible(true);
  };

  return (
    <>
      <Box w="full" py="2">
        <HStack alignItems="center" justifyContent="space-between">
          <Button colorScheme="" onClick={onUserModalOpen} p="0">
            <HStack>
              <Circle size="8" overflow="hidden" border="1px" borderColor="gray.300">
                <Img
                  src={comment.user.avatarUrl || "/no-image.webp"}
                  className="w-full h-full object-cover"
                />
              </Circle>
              <Text fontWeight="bold" className="text-primary">
                {comment.user.name}
              </Text>
            </HStack>
          </Button>

          <Button size="sm" px="1" onClick={handleReplyClick} bgColor="inherit">
            <MdOutlineReply size={18} className="text-primary" />
          </Button>
        </HStack>

        <Text mt="1">{comment.content}</Text>

        <HStack justifyContent="end" mt="1">
          <Text fontFamily="sans-serif" fontSize="xs" className="text-secondary">
            {new Date(comment.createdAt).toLocaleString()}
          </Text>
        </HStack>
      </Box>

      <Box w="full">
        {replies.length == 0 || !isRepliesVisible ? (
          <HStack justifyContent="end" alignItems="center" gap="1" cursor="pointer" mt="1">
            <FetchRepliesButton
              parentComment={comment}
              commentableType={commentableType}
              commentableId={commentableId}
              onRepliesFetched={onRepliesFetched}
            />
          </HStack>
        ) : (
          <Box mt="4">
            {isRepliesVisible && (
              <VStack>
                {replies.map((reply: Comment, index: number) => (
                  <ChildCommentCard
                    key={index}
                    reply={reply}
                    commentableType={commentableType}
                    commentableId={commentableId}
                    onReply={onReply}
                  />
                ))}

                <HStack justifyContent="end" w="full">
                  <Button size="sm" fontSize="xs" onClick={() => setIsRepliesVisible(false)}>
                    返信を非表示
                  </Button>
                </HStack>
              </VStack>
            )}
          </Box>
        )}
      </Box>

      <NotLoggedInModal isOpen={isNotLoggedInModalOpen} onClose={onNotLoggedInModalClose} />
      <UserModal user={comment.user} isOpen={isUserModalOpen} onClose={onUserModalClose} />
    </>
  );
}
