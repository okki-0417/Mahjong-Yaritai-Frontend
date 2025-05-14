import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../../../ApiConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import AlreadyLoggedIn from "../../../components/AlreadyLoggedIn";
import { AuthStateContext } from "../../../contexts/AuthStateContextProvider";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

type UserFormType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function UserCreate() {
  const navigate = useNavigate();
  const toast = useToast();

  const { auth, setAuth } = useContext(AuthStateContext);

  const [passVisible, setPassVisible] = useState(false);
  const [passConfVisible, setPassConfVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>();

  const onSubmit: SubmitHandler<UserFormType> = async (
    formData: UserFormType,
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await apiClient.post("/users", { user: formData });

      setAuth(true);
      navigate("/what-to-discard-problems");
      // navigate("/dashboard");
    } catch (error) {
      toast({
        title: "ユーザーの作成に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {auth == false ? (
        <Container mt={40} size="xl">
          <Text fontSize="4xl">新規ユーザー登録</Text>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">ハンドルネーム</FormLabel>
              <Input
                type="text"
                {...register("name", { required: "必須です" })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} isRequired mt={5}>
              <FormLabel htmlFor="name">パスワード</FormLabel>
              <Input
                type={passVisible ? "text" : "password"}
                {...register("password", { required: "必須です" })}
              />

              <Flex mt={2} justifyContent="end">
                <Button
                  type="button"
                  size="sm"
                  colorScheme="whiteAlpha"
                  onClick={() => setPassVisible(!passVisible)}
                >
                  パスワードを{passVisible && "非"}表示
                </Button>
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.password_confirmation} isRequired>
              <FormLabel htmlFor="name">パスワード（確認）</FormLabel>
              <Input
                type={passConfVisible ? "text" : "password"}
                {...register("password_confirmation", {
                  required: "必須です",
                })}
              />
              <FormErrorMessage>
                {errors.password_confirmation?.message}
              </FormErrorMessage>
              <Flex mt={2} justifyContent="end">
                <Button
                  type="button"
                  size="sm"
                  colorScheme="whiteAlpha"
                  onClick={() => setPassConfVisible(!passConfVisible)}
                >
                  パスワードを{passConfVisible && "非"}表示
                </Button>
              </Flex>
            </FormControl>

            <Box mt={4}>
              <input
                type="submit"
                value="ユーザー登録する"
                className="btn btn-main"
              />
            </Box>
          </form>
        </Container>
      ) : (
        <AlreadyLoggedIn />
      )}
    </>
  );
}
