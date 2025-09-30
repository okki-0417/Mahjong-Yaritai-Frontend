"use client";

import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  Textarea,
  VisuallyHiddenInput,
  VStack,
} from "@chakra-ui/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import Link from "next/link";
import useErrorToast from "@/src/hooks/useErrorToast";
import { z } from "zod";
import { useMutation } from "@apollo/client/react";
import { CreateCommentDocument, Comment } from "@/src/generated/graphql";

// Custom form schema for comment creation
const createCommentBodySchema = z.object({
  what_to_discard_problem_comment: z.object({
    content: z.string().min(1, "コメントを入力してください"),
    parent_comment_id: z.number().nullable().optional(),
  }),
});

type CreateCommentBodyType = z.infer<typeof createCommentBodySchema>;
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { useContext } from "react";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";

export default function CommentForm({
  problemId,
  register,
  handleSubmit,
  errors,
  resetField,
  isSubmitting,
  insertCommentToThread,
  replyingToComment,
  setReplyingToComment,
}: {
  problemId: number;
  register: UseFormRegister<CreateCommentBodyType>;
  handleSubmit: UseFormHandleSubmit<CreateCommentBodyType>;
  errors: FieldErrors<CreateCommentBodyType>;
  resetField: UseFormResetField<CreateCommentBodyType>;
  isSubmitting: boolean;
  /* eslint no-unused-vars: 0 */
  insertCommentToThread: (comment: Comment) => void;
  replyingToComment: Comment | null;
  setReplyingToComment: React.Dispatch<React.SetStateAction<Comment | null>>;
}) {
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const [createComment] = useMutation(CreateCommentDocument);

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.isLoggedIn);

  const onSubmit: SubmitHandler<CreateCommentBodyType> = async formData => {
    try {
      const { data } = await createComment({
        variables: {
          whatToDiscardProblemId: String(problemId),
          content: formData.what_to_discard_problem_comment.content,
          parentCommentId: formData.what_to_discard_problem_comment.parent_comment_id
            ? String(formData.what_to_discard_problem_comment.parent_comment_id)
            : null,
        },
      });

      if (data?.createComment?.comment) {
        // Add missing fields to match Comment type
        const completeComment: Comment = {
          ...data.createComment.comment,
          replies: [],
          updatedAt: data.createComment.comment.createdAt,
          user: {
            ...data.createComment.comment.user,
            createdAt: data.createComment.comment.createdAt,
            updatedAt: data.createComment.comment.createdAt,
            followersCount: 0,
            followingCount: 0,
            isFollowing: false,
          },
        };
        insertCommentToThread(completeComment);

        resetField("what_to_discard_problem_comment.content");
        resetField("what_to_discard_problem_comment.parent_comment_id");

        successToast({ title: "コメントを投稿しました" });
      }
    } catch (error) {
      errorToast({ error, title: "コメントを投稿できませんでした" });
    }
  };

  return (
    <Box w="full" fontFamily="serif" className="text-primary">
      {!isLoggedIn && (
        <Container>
          <Text textAlign="center">コメントを投稿するにはログインしてください</Text>
          <Container textAlign="center" mt={2}>
            <Link href="/auth/request">
              <Button colorScheme="pink">ログイン / 新規登録する</Button>
            </Link>
          </Container>
        </Container>
      )}

      {isLoggedIn && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="stretch" gap="1">
            {replyingToComment && (
              <HStack justifyContent="space-between">
                <Text>{replyingToComment.user.name}のコメントに返信中...</Text>
                <Button
                  bgColor="inherit"
                  size="xs"
                  fontSize="sm"
                  color="#365158"
                  onClick={() => setReplyingToComment(null)}>
                  キャンセル
                </Button>
              </HStack>
            )}

            <FormControl>
              <VisuallyHiddenInput
                {...register("what_to_discard_problem_comment.parent_comment_id")}
                defaultValue={null}
              />
              <FormErrorMessage>
                {errors.what_to_discard_problem_comment?.parent_comment_id?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={Boolean(errors.what_to_discard_problem_comment?.content)}>
              <Textarea
                className="text-primary"
                placeholder="コメントする..."
                {...register("what_to_discard_problem_comment.content")}
              />
              <FormErrorMessage>
                {errors.what_to_discard_problem_comment?.content?.message}
              </FormErrorMessage>
            </FormControl>

            <Center>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                送信
              </Button>
            </Center>
          </VStack>
        </form>
      )}
    </Box>
  );
}
