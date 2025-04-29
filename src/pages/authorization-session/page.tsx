import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "../../ApiConfig";
import { Link, useNavigate } from "react-router";
import { useSetToast } from "../../hooks/useSetToast";
import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import MainButton from "../../components/MainButton";
import { useEffect } from "react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

type AuthorizationSessionForm = {
  email: string;
};

export default function AuthorizationSession() {
  const auth = useIsLoggedIn();
  const navigate = useNavigate();
  const setToast = useSetToast();

  useEffect(() => {
    if (auth) navigate("/dashboard");
  }, [auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationSessionForm>();

  const onSubmit: SubmitHandler<AuthorizationSessionForm> = async (
    formData: AuthorizationSessionForm
  ) => {
    try {
      await apiClient.post("/authorization_session", {
        authorization_session: formData,
      });

      navigate("/authorization");
    } catch (error) {
      setToast({
        type: "error",
        message: "このメールアドレスは使用できません",
      });
    }
  };

  return (
    <Container mt={40} maxW="2xl">
      <h1 className="lg:text-4xl text-2xl font-semibold mb-3">ユーザー登録</h1>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>

          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

          <Input
            type="email"
            placeholder="test@mahjong-yaritai.com"
            autoComplete="email"
            {...register("email")}
          />
        </FormControl>

        <MainButton className="mt-4">確認メールを送信する</MainButton>
      </form>

      <Box mt={4}>
        <Link
          to="/auth/login"
          className="text-blue-300 hover:text-blue-200 hover:underline flex items-center w-fit"
        >
          ログインはこちら
          <FaAngleRight size={16} />
        </Link>
      </Box>
    </Container>
  );
}
