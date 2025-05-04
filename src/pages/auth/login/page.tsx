import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../../../ApiConfig";
import { AuthStateContext } from "../../../contexts/AuthStateContextProvider";
import { useSetToast } from "../../../hooks/useSetToast";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

export type Session = {
  id: number;
  email: string;
};

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { auth, setAuth, setMyUserId } = useContext(AuthStateContext);
  const [passVisible, setPassVisible] = useState<boolean>(false);

  const setToast = useSetToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (formData: LoginForm) => {
    try {
      const response = await apiClient.post("/session", { session: formData });

      setAuth(true);
      setMyUserId(response.data.user.id);
      navigate("/what-to-discard-problems");
    } catch (error) {
      setToast({ type: "error", message: "ログインに失敗しました" });
    }
  };

  return (
    <>
      {auth === false && (
        <Container maxH="xl" mt={40}>
          <h1 className="lg:text-4xl text-2xl font-semibold mb-3">ログイン</h1>
          <hr />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel htmlFor="name">Email</FormLabel>

              <Input type="email" autoComplete="email" {...register("email")} />

              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={8} isInvalid={!!errors.password} isRequired>
              <FormLabel htmlFor="name">パスワード</FormLabel>

              <Input
                type={passVisible ? "text" : "password"}
                autoComplete="password"
                {...register("password")}
              />

              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>

              <Flex justifyContent="end" mt={2}>
                <Button
                  type="button"
                  colorScheme="whiteAlpha"
                  onClick={() => setPassVisible(!passVisible)}
                >
                  パスワードを{passVisible && "非"}表示
                </Button>
              </Flex>

              <Box mt={2}>
                <input
                  type="submit"
                  value="ログインする"
                  className="btn btn-main"
                />
              </Box>
            </FormControl>
          </form>

          <Box mt={6}>
            <Link
              to="/users/new"
              className="text-blue-300 hover:text-blue-200 hover:underline flex items-center"
            >
              新規会員登録はこちら
              <FaAngleRight />
            </Link>
          </Box>
        </Container>
      )}
    </>
  );
}
