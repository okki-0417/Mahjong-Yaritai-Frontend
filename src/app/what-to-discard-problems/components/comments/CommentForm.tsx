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
import { schemas } from "@/src/zodios/api";
import { useMutation } from "@apollo/client/react";
import { CreateCommentDocument } from "@/src/generated/graphql";
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
  register: UseFormRegister<z.infer<typeof schemas.createComment_Body>>;
  handleSubmit: UseFormHandleSubmit<z.infer<typeof schemas.createComment_Body>>;
  errors: FieldErrors<z.infer<typeof schemas.createComment_Body>>;
  resetField: UseFormResetField<z.infer<typeof schemas.createComment_Body>>;
  isSubmitting: boolean;
  /* eslint no-unused-vars: 0 */
  insertCommentToThread: (comment: z.infer<typeof schemas.Comment>) => void;
  replyingToComment: z.infer<typeof schemas.Comment>;
  setReplyingToComment: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>>>;
}) {
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const [createComment] = useMutation(CreateCommentDocument);

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const onSubmit: SubmitHandler<z.infer<typeof schemas.createComment_Body>> = async formData => {
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
        const graphqlComment = data.createComment.comment;
        const restComment: z.infer<typeof schemas.Comment> = {
          id: Number(graphqlComment.id),
          content: graphqlComment.content,
          user_id: Number(graphqlComment.userId),
          parent_comment_id: graphqlComment.parentCommentId
            ? Number(graphqlComment.parentCommentId)
            : null,
          replies_count: graphqlComment.repliesCount,
          created_at: graphqlComment.createdAt,
          user: {
            id: Number(graphqlComment.user.id),
            name: graphqlComment.user.name,
            avatar_url: graphqlComment.user.avatarUrl || null,
          },
        };

        insertCommentToThread(restComment);

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
                {errors.what_to_discard_problem_comment?.parentCommentId?.message}
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
