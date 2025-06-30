"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  Textarea,
  useToast,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import useErrorToast from "@/src/hooks/useErrorToast";
import ButtonAccent from "@/src/components/Buttons/ButtonAccent";
import ReplyContext from "@/src/features/what-to-discard-problems/context-providers/contexts/ReplyContext";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/config/apiConfig";

type CommentFormType = z.infer<typeof schemas.Comment>;

export default function CommentForm({
  setParentComments,
}: {
  problemId: number;
  setParentComments: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>[] | null>>;
}) {
  const [loading, setLoading] = useState(false);
  const auth = useIsLoggedIn();
  const errorToast = useErrorToast();
  const toast = useToast();

  const { replyToComment, setReplyToComment, setRepliesFromContext } = useContext(ReplyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    resetField,
  } = useForm<CommentFormType>();

  useEffect(() => {
    if (!replyToComment) return;

    setValue("parentCommentId", replyToComment.id);
    setFocus("content");
  }, [replyToComment]);

  const onSubmit: SubmitHandler<CommentFormType> = async formData => {
    if (!auth) return null;
    if (loading) return null;
    setLoading(true);

    try {
      const response = await apiClient.createComment({
        what_to_discard_problem_comment: {
          parent_comment_id: replyToComment ? String(replyToComment.id) : null,
          content: formData.content,
        },
      });

      const resComment = response.what_to_discard_problem_comment;

      toast({
        title: "コメントを投稿しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (resComment.parentCommentId) {
        setRepliesFromContext(prev => [...prev, resComment]);
      } else {
        setParentComments(prev => [...prev, resComment]);
      }

      resetField("content");
    } catch (error) {
      errorToast({
        error,
        title: "コメントを投稿できませんでした",
      });
    } finally {
      setLoading(false);
    }

    return null;
  };

  return (
    <Box>
      {auth ? (
        <Box mt={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {replyToComment && (
              <HStack justifyContent="space-between" mb="2">
                <Text>{replyToComment.user.name}のコメントに返信中...</Text>
                <Button
                  bgColor="inherit"
                  size="sm"
                  color="#365158"
                  h="fit-content"
                  onClick={() => setReplyToComment(null)}>
                  キャンセル
                </Button>
              </HStack>
            )}

            <FormControl isInvalid={Boolean(errors.content) || Boolean(errors.parentCommentId)}>
              <Box>
                <Textarea
                  placeholder="コメントする..."
                  {...register("content", { required: true })}
                />
                <FormErrorMessage color={"red.500"}>
                  {errors.content && errors.content.message}
                </FormErrorMessage>
              </Box>

              <VisuallyHiddenInput {...register("parentCommentId")} defaultValue={null} />
              <FormErrorMessage color={"red.500"}>
                {errors.parentCommentId && errors.parentCommentId.message}
              </FormErrorMessage>

              <Container mt={3} textAlign={"center"}>
                <ButtonAccent type="submit">送信</ButtonAccent>
              </Container>
            </FormControl>
          </form>
        </Box>
      ) : (
        <NotLoggedInCommentForm />
      )}
    </Box>
  );
}

const NotLoggedInCommentForm = () => {
  return (
    <Container pt={4}>
      <Text textAlign="center">コメントを投稿するにはログインしてください</Text>
      <Container textAlign="center" mt={4}>
        <Link href="/auth/login" className="btn btn-main">
          ログインする
        </Link>
      </Container>
    </Container>
  );
};
