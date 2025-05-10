import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "../../ApiConfig";
import { useNavigate } from "react-router";
import {
  Container,
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useEffect } from "react";
import MainButton from "../../components/MainButton";

type AuthorizationForm = {
  token: string;
};

export default function Authorization() {
  const auth = useIsLoggedIn();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (auth) navigate("/dashboard");
  }, [auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationForm>();

  const onSubmit: SubmitHandler<AuthorizationForm> = async (formData) => {
    try {
      await apiClient.post("/authorization", { authorization: formData });

      navigate("/users/new");
    } catch (error) {
      toast({
        title: "認証に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="xl" mt={40}>
      <Text fontSize="2xl">認証メールを送信しました。</Text>

      <Text mt={2}>メール内の認証コードを入力してください</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.token} isRequired>
          <FormErrorMessage className="mt-4">
            {errors.token?.message}
          </FormErrorMessage>

          <NumberInput mt={4}>
            <NumberInputField {...register("token")} />
          </NumberInput>
        </FormControl>

        <MainButton className="mt-4">認証を完了する</MainButton>
      </form>
    </Container>
  );
}
