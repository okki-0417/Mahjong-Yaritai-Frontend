"use client";

import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import CommentForm from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemCard/ProblemCommentSection/CommentsModal/CommentForm";
import { Comment } from "@/src/generated/graphql";
import ParentCommentCard from "@/src/components/ParentCommentCard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  parentComments: Comment[];
  problemId: string;
  /* eslint-disable-next-line no-unused-vars */
  onReply: (comment: Comment) => void;
  replyingToComment: Comment | null;
  onReplyCancel: () => void;
  onCommentCreate: () => void;
};

export default function CommentsModal({
  isOpen,
  onClose,
  parentComments,
  problemId,
  onReply,
  replyingToComment,
  onReplyCancel,
  onCommentCreate,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
      <ModalOverlay />

      <ModalContent overflow="hidden">
        <ModalHeader fontFamily="serif" className="bg-neutral text-primary">
          コメント
        </ModalHeader>

        <ModalCloseButton className="text-primary" />

        <ModalBody className="text-primary bg-neutral" fontFamily="serif">
          <Box minH={30}>
            {parentComments.length > 0 ? (
              <VStack divider={<StackDivider />} gap="0">
                {parentComments.map((parentComment, index) => {
                  return (
                    <ParentCommentCard
                      key={index}
                      comment={parentComment}
                      onReply={onReply}
                      commentableType="WhatToDiscardProblem"
                      commentableId={problemId}
                    />
                  );
                })}
              </VStack>
            ) : (
              <Text textAlign="center" fontSize="lg" fontWeight="bold">
                コメントはまだありません
              </Text>
            )}
          </Box>
        </ModalBody>

        <ModalFooter className="bg-neutral">
          <VStack w="full" gap="1">
            <Divider />
            <CommentForm
              problemId={problemId}
              replyingToComment={replyingToComment}
              onReplyCancel={onReplyCancel}
              onCommentCreate={onCommentCreate}
            />
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
