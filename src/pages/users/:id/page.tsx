import { AttachmentIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Image,
  Input,
  Text,
  VisuallyHiddenInput,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../ApiConfig";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import useMyUserId from "../../../hooks/useMyUserId";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetToast } from "../../../hooks/useSetToast";

type FetchState = {
  state: "loading" | "fulfilled" | "rejected";
};

type UserType = {
  name: string;
  avatar_url: string;
};

type UserEditType = {
  name: string;
  avatar: File;
};

export default function UserShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchState, setFetchState] = useState<FetchState>({
    state: "loading",
  });
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [iconImageUrl, setIconImageUrl] = useState<string | null>(null);

  const setToast = useSetToast();

  const myUserId = useMyUserId();

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fetchState.state != "loading") return;

    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/users/${id}`, {
          signal: controller.signal,
        });
        setUser(response.data.user);
        setFetchState({ state: "fulfilled" });
      } catch (error) {
        setFetchState({ state: "rejected" });

        if (axios.isAxiosError(error)) {
          navigate("/404");
        }
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [fetchState]);

  const displayIconPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const url = URL.createObjectURL(files[0]);

    setIconImageUrl(url);
  };

  useEffect(() => {
    return () => {
      if (iconImageUrl) URL.revokeObjectURL(iconImageUrl);
    };
  }, [iconImageUrl]);

  const { register, handleSubmit } = useForm<UserEditType>();

  const onSubmit: SubmitHandler<UserEditType> = async (data) => {
    const formData = new FormData();

    const { name } = data;
    formData.append("user[name]", name);

    const file = ref.current?.files?.[0];
    if (file) formData.append("user[avatar]", file);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await apiClient.patch(`users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data.user);

      setToast({ type: "success", message: "プロフィールを更新しました。" });
      setIsEditMode(false);
    } catch (error) {
      setToast({ type: "error", message: "プロフィールの更新に失敗しました" });
    }
  };

  return (
    <Container mt="40" maxW="xl">
      <VStack gap="3" position="relative" alignItems="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap="4">
            {id && myUserId && Number(id) == myUserId && (
              <Button
                colorScheme={isEditMode ? "pink" : "whiteAlpha"}
                position="absolute"
                right="0"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <EditIcon />
              </Button>
            )}

            <Circle size="200" overflow="hidden">
              <Image
                src={iconImageUrl || user?.avatar_url || "/no-image.webp"}
                w="full"
                h="full"
                objectFit="cover"
                draggable="false"
                bgColor="white"
              />
            </Circle>

            {isEditMode && (
              <>
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg, image/webp image/svg, image/gif"
                  ref={ref}
                  onChange={(event) => displayIconPreview(event)}
                />

                <Button onClick={() => ref.current?.click()}>
                  <AttachmentIcon />
                </Button>
              </>
            )}

            <Flex alignItems="start">
              {isEditMode ? (
                <Input
                  type="text"
                  defaultValue={user?.name}
                  fontSize="3xl"
                  w="full"
                  h="fit-content"
                  {...register("name")}
                />
              ) : (
                <Text fontSize="3xl">{user?.name}</Text>
              )}
            </Flex>

            {isEditMode && (
              <Box w="full" textAlign="right">
                <Button type="submit" colorScheme="whiteAlpha">
                  送信
                </Button>
              </Box>
            )}
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}
