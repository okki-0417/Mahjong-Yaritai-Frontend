"use client";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import CommentForm from "@/src/features/what-to-discard-problems/components/CommentForm";
import ParentCommentCard from "@/src/features/what-to-discard-problems/components/ParentCommentCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/* eslint no-unused-vars: 0 */
export type InsertCommentToThread = (comment: z.infer<typeof schemas.Comment>) => void;

export default function CommentsModal({
  isOpen,
  onClose,
  problemId,
  parentComments,
  setParentComments,
}: {
  isOpen: boolean;
  onClose: () => void;
  problemId: number;
  parentComments: z.infer<typeof schemas.Comment>[];
  setParentComments: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>[]>>;
}) {
  const [insertCommentToThread, setInsertCommentToThread] = useState<InsertCommentToThread>(
    () => (comment: z.infer<typeof schemas.Comment>) => {
      setParentComments(prev => (prev ? [...prev, comment] : [comment]));
    },
  );
  const [replyingToComment, setReplyingToComment] = useState<z.infer<
    typeof schemas.Comment
  > | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setFocus,
    resetField,
  } = useForm<z.infer<typeof schemas.createComment_Body>>({
    resolver: zodResolver(schemas.createComment_Body),
  });

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
            {parentComments == null && (
              <Box textAlign="center" py={8}>
                <Spinner size="lg" />
                <Text mt={4} fontSize="lg">
                  読み込み中...
                </Text>
              </Box>
            )}

            {parentComments != null && parentComments.length > 0 && (
              <VStack divider={<StackDivider />} gap="0">
                {parentComments.map((parentComment, index) => {
                  return (
                    <ParentCommentCard
                      key={index}
                      parentComment={parentComment}
                      setValue={setValue}
                      setFocus={setFocus}
                      setInsertCommentToThread={setInsertCommentToThread}
                      setReplyingToComment={setReplyingToComment}
                    />
                  );
                })}
              </VStack>
            )}

            {parentComments != null && parentComments.length === 0 && (
              <Text textAlign="center" fontSize="lg" fontWeight="bold">
                コメントはまだありません
              </Text>
            )}
          </Box>
        </ModalBody>

        <ModalFooter className="bg-neutral">
          <CommentForm
            problemId={problemId}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            resetField={resetField}
            isSubmitting={isSubmitting}
            insertCommentToThread={insertCommentToThread}
            replyingToComment={replyingToComment}
            setReplyingToComment={setReplyingToComment}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
