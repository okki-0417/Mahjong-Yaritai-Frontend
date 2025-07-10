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
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import useErrorToast from "@/src/hooks/useErrorToast";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import useSuccessToast from "@/src/hooks/useSuccessToast";

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
  const isLoggedIn = useIsLoggedIn();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const onSubmit: SubmitHandler<z.infer<typeof schemas.createComment_Body>> = async formData => {
    try {
      const response = await apiClient.createComment(formData, {
        params: {
          what_to_discard_problem_id: String(problemId),
        },
      });

      insertCommentToThread(response.what_to_discard_problem_comment);

      resetField("what_to_discard_problem_comment.content");
      resetField("what_to_discard_problem_comment.parent_comment_id");

      successToast({ title: "コメントを投稿しました" });
    } catch (error) {
      errorToast({ error, title: "コメントを投稿できませんでした" });
    }
  };

  return (
    <Box w="full" fontFamily="serif" className="text-primary">
      {!isLoggedIn && (
        <Container>
          <Text textAlign="center">コメントを投稿するにはログインしてください</Text>
          <Container textAlign="center">
            <Link href="/isLoggedIn/login" className="btn btn-main">
              ログインする
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
                className="text-neutral"
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
