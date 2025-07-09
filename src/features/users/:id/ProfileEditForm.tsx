"use client";

import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SetStateAction, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useErrorToast from "@/src/hooks/useErrorToast";
import { isAxiosError } from "axios";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProfileEditForm({
  setIsEditMode,
  user,
  setUser,
}: {
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
  user: z.infer<typeof schemas.User>;
  setUser: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.User>>>;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const previousImageUrlRef = useRef<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) return null;

    if (previousImageUrlRef.current) {
      URL.revokeObjectURL(previousImageUrlRef.current);
    }

    const url = URL.createObjectURL(files[0]);
    previousImageUrlRef.current = url;

    setImageUrl(url);

    return files[0];
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<z.infer<typeof schemas.updateUser_Body>>();

  const onSubmit: SubmitHandler<z.infer<typeof schemas.updateUser_Body>> = async formInputs => {
    try {
      const response = await apiClient.updateUser(formInputs, {
        params: {
          id: String(user?.id),
        },
      });

      setUser(response.user);
      setIsEditMode(false);
      successToast({ title: "プロフィールを更新しました" });
    } catch (error) {
      if (isAxiosError(error)) {
        errorToast({
          error,
          title: "プロフィールを更新できませんでした",
        });
      } else {
        console.error(error);
      }
      errorToast({ title: "ネットワークエラー" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="4">
        <Circle size="200" overflow="hidden">
          <Image
            src={imageUrl || user?.avatar_url || "/no-image.webp"}
            w="full"
            h="full"
            objectFit="cover"
            draggable="false"
            bgColor="white"
          />
        </Circle>
        <FormControl>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange, ref } }) => (
              <Input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                ref={element => {
                  ref(element);
                  imageInputRef.current = element;
                }}
                onChange={event => {
                  const file = handleFileChange(event);
                  onChange(file);
                }}
                display="none"
              />
            )}
          />

          <Center>
            <Button onClick={() => imageInputRef.current?.click()}>
              <AttachmentIcon />
            </Button>
          </Center>

          <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.name)}>
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
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <Box w="full" textAlign="right">
          <Button type="submit" colorScheme="whiteAlpha" isLoading={isSubmitting}>
            送信
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
