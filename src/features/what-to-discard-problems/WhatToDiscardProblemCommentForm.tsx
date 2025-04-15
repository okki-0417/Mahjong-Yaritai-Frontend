import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  whatToDiscardProblemCommentSchema,
  WhatToDiscardProblemCommentSchemaType,
} from "../../schemas/WhatToDiscardProblemCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "../../ApiConfig";
import axios from "axios";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useState } from "react";
import { useSetToast } from "../../hooks/useSetToast";

export default function WhatToDiscardProblemCommentForm({
  problemId,
}: {
  problemId: number;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WhatToDiscardProblemCommentSchemaType>({
    resolver: zodResolver(whatToDiscardProblemCommentSchema),
  });

  const [loading, setLoading] = useState(false);
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const setToast = useSetToast();

  const onSubmit: SubmitHandler<WhatToDiscardProblemCommentSchemaType> = (
    formData
  ) => {
    if (!auth) return setModal("NotLoggedIn");
    if (loading) return;
    setLoading(true);

    try {
      apiClient.post(`/what_to_discard_problems/${problemId}/comments`, {
        what_to_discard_problem_comment: formData,
      });

      setToast({ type: "success", message: "コメントしました" });
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
      }
    }

    setLoading(true);
  };

  return (
    <Box mt={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.content || !!errors.parent_comment_id}>
          <Box>
            <Textarea placeholder="コメントする..." {...register("content")} />
            <FormErrorMessage color={"red.500"}>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </Box>

          <Input type="number" hidden />

          <Container mt={3} textAlign={"center"}>
            <Input type="submit" border={"1px"} w={"fit-content"} />
          </Container>
        </FormControl>
      </form>
    </Box>
  );
}
