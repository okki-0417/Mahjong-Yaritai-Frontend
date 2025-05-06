import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Input,
  useToast,
  VisuallyHiddenInput,
  VStack,
} from "@chakra-ui/react";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { apiClient } from "../../../ApiConfig";
import { UserType } from "../../../pages/users/:id/page";

type UserEditType = {
  name: string;
  avatar: File;
};

export default function ProfileEditForm({
  user,
  setUser,
  setIsEditMode,
}: {
  user: UserType | null;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { id } = useParams();
  const toast = useToast();

  const [iconImageUrl, setIconImageUrl] = useState<string | null>(null);

  const displayIconPreview = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files?.length) return;

      const url = URL.createObjectURL(files[0]);

      setIconImageUrl(url);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (iconImageUrl) URL.revokeObjectURL(iconImageUrl);
    };
  }, [iconImageUrl]);

  const { register, handleSubmit } = useForm<UserEditType>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<UserEditType> = async (data) => {
    const formData = new FormData();

    const { name } = data;
    formData.append("user[name]", name);

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("user[avatar]", file);

    try {
      const response = await apiClient.patch(`users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data.user);

      toast({
        title: "プロフィールを更新しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditMode(false);
    } catch (error) {
      toast({
        title: "プロフィールを更新できませんでした",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="4">
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

        <>
          <VisuallyHiddenInput
            type="file"
            accept="image/png, image/jpeg, image/webp image/svg, image/gif"
            ref={fileInputRef}
            onChange={(event) => displayIconPreview(event)}
          />

          <Button onClick={() => fileInputRef.current?.click()}>
            <AttachmentIcon />
          </Button>
        </>

        <Flex alignItems="start">
          <Input
            type="text"
            defaultValue={user?.name}
            fontSize="3xl"
            w="full"
            h="fit-content"
            {...register("name")}
          />
        </Flex>

        <Box w="full" textAlign="right">
          <Button type="submit" colorScheme="whiteAlpha">
            送信
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
