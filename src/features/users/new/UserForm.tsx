"use client";

import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { useContext, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const previousImageUrlRef = useRef<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const { setAuth } = useContext(AuthStateContext);

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
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schemas.createUser_Body>>({
    resolver: zodResolver(schemas.createUser_Body),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schemas.createUser_Body>> = async formData => {
    try {
      await apiClient.createUser(formData);

      setAuth(true);
      successToast({ title: "ユーザーを作成しました" });
      router.push("/dashboard");
    } catch (error) {
      errorToast({ error, title: "ユーザーの作成に失敗しました" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" gap="4">
        <VStack>
          <Circle size="200" overflow="hidden">
            <Image
              src={imageUrl || "/no-image.webp"}
              w="full"
              h="full"
              objectFit="cover"
              draggable="false"
              bgColor="white"
            />
          </Circle>
          <Button onClick={() => imageInputRef.current?.click()}>
            <AttachmentIcon />
          </Button>
        </VStack>

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

          <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors.name)}>
          <FormLabel color="white">ハンドルネーム</FormLabel>
          <Input type="text" fontSize="2xl" w="full" h="fit-content" {...register("name")} />
          <FormErrorMessage color="red.200">{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.profile_text)}>
          <FormLabel color="white">自己紹介</FormLabel>
          <Textarea
            placeholder="自己紹介を入力してください（500文字まで）"
            maxLength={500}
            resize="vertical"
            minH="120px"
            {...register("profile_text")}
          />
          <FormErrorMessage color="red.200">{errors.profile_text?.message}</FormErrorMessage>
        </FormControl>

        <Box w="full" textAlign="right">
          <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
            登録
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
