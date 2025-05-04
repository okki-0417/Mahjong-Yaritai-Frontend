import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import { WhatToDiscardProblemCommentSchemaType } from "../../schemas/WhatToDiscardProblemCommentSchema";
import { apiClient } from "../../ApiConfig";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useState } from "react";
import { useSetToast } from "../../hooks/useSetToast";
import { Link } from "react-router";
import { WhatToDiscardProblemParentComment } from "./WhatToDiscardProblemCommentList";
import { CommentType } from "./WhatToDiscardProblemCommentSection";

export default function WhatToDiscardProblemCommentForm({
  problemId,
  setWhatToDiscardProblemComments,
  CommentContentRef,
  setCommentsCount,
  form,
}: {
  problemId: number;
  setWhatToDiscardProblemComments: React.Dispatch<
    React.SetStateAction<WhatToDiscardProblemParentComment[]>
  >;
  CommentContentRef: any;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
  form: {
    register: UseFormRegister<CommentType>;
    handleSubmit: UseFormHandleSubmit<CommentType>;
    errors: FieldErrors<CommentType>;
    resetField: UseFormResetField<CommentType>;
  };
}) {
  const [loading, setLoading] = useState(false);
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const setToast = useSetToast();

  const onSubmit: SubmitHandler<WhatToDiscardProblemCommentSchemaType> = async (
    formData
  ) => {
    if (!auth) return setModal("NotLoggedIn");
    if (loading) return;
    setLoading(true);

    try {
      const response = await apiClient.post(
        `/what_to_discard_problems/${problemId}/comments`,
        { what_to_discard_problem_comment: formData }
      );

      const comments = response.data.what_to_discard_problem_comments;

      setToast({ type: "success", message: "コメントしました" });

      setWhatToDiscardProblemComments(comments.comments);
      setCommentsCount(comments.total_count);

      form.resetField("content");
    } catch (error) {
      setToast({ type: "error", message: "コメントの投稿に失敗しました" });
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
        <Link to="/auth/login" className="btn btn-main">
          ログインする
        </Link>
      </Container>
    </Container>
  );
};
