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
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { useCustomForm } from "@/src/hooks/useCustomForm";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { CreateUserDocument, CreateUserMutation } from "@/src/generated/graphql";

const createUserSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(20, "名前は20文字以内で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  avatar: z.instanceof(File).optional(),
});

export default function UserForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const previousImageUrlRef = useRef<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const [createUser] = useMutation<CreateUserMutation>(CreateUserDocument);

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
  } = useCustomForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createUserSchema>> = async formData => {
    try {
      const result = await createUser({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            avatar: formData.avatar || undefined,
          },
        },
      });

      if (result.data?.createUser?.errors && result.data.createUser.errors.length > 0) {
        throw new Error(result.data.createUser.errors.join(", "));
      }

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

        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel color="white">ハンドルネーム</FormLabel>
          <Input
            type="text"
            placeholder="ハンドルネーム"
            fontSize="2xl"
            w="full"
            h="fit-content"
            {...register("name")}
            isDisabled={isSubmitting}
          />
          <FormErrorMessage color="red.200">{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel color="white">メールアドレス</FormLabel>
          <Input
            type="email"
            placeholder="メールアドレス"
            fontSize="lg"
            w="full"
            h="fit-content"
            {...register("email")}
            isDisabled={isSubmitting}
          />
          <FormErrorMessage color="red.200">{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Box w="full" textAlign="right">
          <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
            ユーザー作成
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
