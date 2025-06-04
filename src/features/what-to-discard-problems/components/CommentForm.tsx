import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  useToast,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import Link from "next/link";
import { WhatToDiscardProblemParentComment } from "@/src/features/what-to-discard-problems/components/CommentList";
import { useState } from "react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import { useSetModal } from "@/src/hooks/useSetModal";
import { WhatToDiscardProblemCommentSchemaType } from "@/src/schemas/WhatToDiscardProblemCommentSchema";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import useErrorToast from "@/src/hooks/useErrorToast";

export default function CommentForm({
  problemId,
  setWhatToDiscardProblemComments,
  CommentContentRef,
  // setCommentsCount,
  form,
}: {
  problemId: number;
  setWhatToDiscardProblemComments: React.Dispatch<
    React.SetStateAction<WhatToDiscardProblemParentComment[]>
  >;
  CommentContentRef: React.MutableRefObject<HTMLTextAreaElement>;
  // setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
  form: {
    register: UseFormRegister<WhatToDiscardProblemCommentSchemaType>;
    handleSubmit: UseFormHandleSubmit<WhatToDiscardProblemCommentSchemaType>;
    errors: FieldErrors<WhatToDiscardProblemCommentSchemaType>;
    resetField: UseFormResetField<WhatToDiscardProblemCommentSchemaType>;
  };
}) {
  const [loading, setLoading] = useState(false);
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const errorToast = useErrorToast();
  const toast = useToast();

  const onSubmit: SubmitHandler<WhatToDiscardProblemCommentSchemaType> = async (
    formData,
  ) => {
    if (!auth) return setModal("NotLoggedIn");
    if (loading) return;
    setLoading(true);

    try {
      const response = await apiClient.post(
        `/what_to_discard_problems/${problemId}/comments`,
        { what_to_discard_problem_comment: formData },
      );

      const comments = response.data.what_to_discard_problem_comments;

      toast({
        title: "コメントを投稿しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setWhatToDiscardProblemComments(comments.comments);
      // setCommentsCount(comments.total_count);

      form.resetField("content");
    } catch (error) {
      errorToast({
        error,
        title: "コメントを投稿できませんでした",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {auth ? (
        <Box mt={2}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={
                !!form.errors.content || !!form.errors.parent_comment_id
              }
            >
              <Box>
                <Textarea
                  placeholder="コメントする..."
                  {...form.register("content")}
                  ref={(el) => {
                    form.register("content").ref(el);
                    CommentContentRef.current = el;
                  }}
                />
                <FormErrorMessage color={"red.500"}>
                  {form.errors.content && form.errors.content.message}
                </FormErrorMessage>
              </Box>

              <VisuallyHiddenInput {...form.register("parent_comment_id")} />
              <FormErrorMessage color={"red.500"}>
                {form.errors.parent_comment_id &&
                  form.errors.parent_comment_id.message}
              </FormErrorMessage>

              <Container mt={3} textAlign={"center"}>
                <Input type="submit" border={"1px"} w={"fit-content"} />
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
