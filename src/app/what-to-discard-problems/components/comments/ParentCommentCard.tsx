"use client";

import UserModal from "@/src/components/Modals/UserModal";
import ChildCommentCard from "@/src/app/what-to-discard-problems/components/comments/ChildCommentCard";
import { InsertCommentToThread } from "@/src/app/what-to-discard-problems/components/comments/CommentsModal";
import DeleteCommentButton from "@/src/app/what-to-discard-problems/components/comments/DeleteCommentButton";
import FetchRepliesButton from "@/src/app/what-to-discard-problems/components/comments/FetchRepliesButton";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import { Comment } from "@/src/generated/graphql";
import { CreateCommentBodyType } from "@/src/lib/types/schema-compat";
import { Box, Button, Circle, HStack, Img, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import { MdOutlineReply } from "react-icons/md";

export default function ParentCommentCard({
  parentComment,
  setValue,
  setFocus,
  setInsertCommentToThread,
  setReplyingToComment,
  problemId,
}: {
  parentComment: Comment;
  setValue: UseFormSetValue<CreateCommentBodyType>;
  setFocus: UseFormSetFocus<CreateCommentBodyType>;
  setInsertCommentToThread: React.Dispatch<React.SetStateAction<InsertCommentToThread>>;
  setReplyingToComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  problemId: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.isLoggedIn);
  const myUserId = session?.userId;

  const [replies, setReplies] = useState<Comment[]>([]);

  const handleReply = () => {
    setFocus("what_to_discard_problem_comment.content");
    setValue("what_to_discard_problem_comment.parent_comment_id", Number(parentComment.id));
    setReplyingToComment(parentComment);
    setInsertCommentToThread(() => (reply: Comment) => {
      setReplies(prev => [...prev, reply]);
    });
  };

  return (
    <>
      <Box w="full" py="2">
        <Box>
          <HStack alignItems="center" justifyContent="space-between">
            <Button
              bgColor="inherit"
              _hover={{ bgColor: "gray.400" }}
              p="0"
              pr="1"
              h="fit-content"
              onClick={onOpen}>
              <HStack>
                <Circle size="8" overflow="hidden" border="1px">
                  <Img
                    src={parentComment.user.avatarUrl || "/no-image.webp"}
                    className="w-full h-full object-cover"
                  />
                </Circle>
                <Text fontWeight="bold" className="text-primary">
                  {parentComment.user.name}
                </Text>
              </HStack>
            </Button>

            {parentComment.user.id == myUserId && <DeleteCommentButton comment={parentComment} />}
            {parentComment.user.id != myUserId && isLoggedIn && (
              <Button size="sm" px="1" onClick={handleReply} bgColor="inherit">
                <MdOutlineReply size={18} className="text-primary" />
              </Button>
            )}
          </HStack>

          <Text fontFamily="sans-serif" fontSize="xs" className="text-primary">
            {new Date(parentComment.createdAt).toLocaleString()}
          </Text>
        </Box>

        <Text mt="2">{parentComment.content}</Text>

        {Boolean(parentComment.repliesCount) && Boolean(!replies.length) && (
          <FetchRepliesButton
            setReplies={setReplies}
            comment={parentComment}
            problemId={problemId}
          />
        )}

        {Boolean(replies.length) && (
          <VStack mt="4">
            {replies.map((reply: Comment, index: number) => {
              return (
                <HStack w="full" pl="4" h="24" key={index} gap="4">
                  <Box w="1" h="full" className="bg-secondary" rounded="full" />
                  <ChildCommentCard reply={reply} />
                </HStack>
              );
            })}
          </VStack>
        )}
      </Box>

      <UserModal
        user={parentComment.user}
        isOpen={isOpen}
        onClose={onClose}
        isFollowing={false}
        currentUserId={myUserId ? Number(myUserId) : null}
      />
    </>
  );
}
