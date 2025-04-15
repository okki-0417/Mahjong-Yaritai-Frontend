import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { WhatToDiscardProblemCommentSchemaType } from "../../schemas/WhatToDiscardProblemCommentSchema";
import { apiClient } from "../../ApiConfig";
import axios from "axios";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useState } from "react";
import { useSetToast } from "../../hooks/useSetToast";

export default function WhatToDiscardProblemCommentForm({
  problemId,
  CommentContentRef,
  form,
}: {
  problemId: number;
  CommentContentRef: any;
  form: {
    register: UseFormRegister<{
      content: string;
      parent_comment_id?: string | undefined;
    }>;
    handleSubmit: UseFormHandleSubmit<{
      content: string;
      parent_comment_id?: string | undefined;
    }>;
    errors: FieldErrors<{
      content: string;
      parent_comment_id?: string | undefined;
    }>;
    watch: UseFormWatch<{
      content: string;
      parent_comment_id?: string | undefined;
    }>;
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

    console.log(JSON.stringify(formData));

    try {
      await apiClient.post(`/what_to_discard_problems/${problemId}/comments`, {
        what_to_discard_problem_comment: formData,
      });

      setToast({ type: "success", message: "コメントしました" });
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.message);
      }
      setToast({ type: "error", message: "コメントの投稿に失敗しました" });
    }

    setLoading(true);
  };

  return (
    <Box mt={2}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!form.errors.content || !!form.errors.parent_comment_id}
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
  );
}
