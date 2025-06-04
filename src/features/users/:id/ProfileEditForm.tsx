import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Input,
  VisuallyHiddenInput,
  VStack,
} from "@chakra-ui/react";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useErrorToast from "@/src/hooks/useErrorToast";
import { isAxiosError } from "axios";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import { UserContext } from "@/src/features/users/:id/context-providers/contexts/UserContext";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { User } from "@/src/types/ApiData";

type UserEditType = {
  name: string;
};

export default function ProfileEditForm({
  setIsEditMode,
}: {
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { user, setUser } = useContext(UserContext);
  const [iconImageUrl, setIconImageUrl] = useState<string | null>(null);
  const iconImageInputRef = useRef<HTMLInputElement>(null);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleIconInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const url = URL.createObjectURL(files[0]);
    setIconImageUrl(url);
  };

  useEffect(() => {
    if (!iconImageUrl) return;

    const currentImageUrl = iconImageUrl;
    return () => URL.revokeObjectURL(currentImageUrl);
  }, [iconImageUrl]);

  const { register, handleSubmit } = useForm<UserEditType>();

  const onSubmit: SubmitHandler<UserEditType> = async (data) => {
    const formData = new FormData();

    const { name } = data;
    formData.append("user[name]", name);

    const file = iconImageInputRef.current?.files?.[0];
    if (file) formData.append("user[avatar]", file);

    try {
      const response = await apiClient.patch(`users/${user?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data: User = response.data.user;

      setUser(data);
      setIsEditMode(false);
      successToast({ title: "プロフィールを更新しました" });
    } catch (error) {
      if (isAxiosError(error)) {
        errorToast({
          error,
          title: "プロフィールを更新できませんでした",
        });
      }
      errorToast({ title: "ネットワークエラー" });
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

        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/jpeg, image/webp image/svg, image/gif"
          ref={iconImageInputRef}
          onChange={(event) => handleIconInput(event)}
        />

        <Button onClick={() => iconImageInputRef.current?.click()}>
          <AttachmentIcon />
        </Button>

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
