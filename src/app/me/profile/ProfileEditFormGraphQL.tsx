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
import { SetStateAction, useRef, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { useCustomForm } from "@/src/hooks/useCustomForm";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { updateUserWithFile } from "@/src/lib/graphqlFileUpload";

// GraphQL用のスキーマ定義
const updateUserGraphQLSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(20, "名前は20文字以内で入力してください"),
  profile_text: z.string().max(500, "プロフィールは500文字以内で入力してください").optional(),
  avatar: z.instanceof(File).optional(),
});

export default function ProfileEditFormGraphQL({
  setIsEditMode,
  user,
  setUser,
}: {
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
  user: {
    id?: string | number;
    name?: string;
    profile_text?: string | null;
    avatar_url?: string | null;
    is_following?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  setUser: React.Dispatch<SetStateAction<any>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // eslint-disable-next-line no-process-env
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: `${apiUrl}/graphql`,
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useCustomForm<z.infer<typeof updateUserGraphQLSchema>>({
    resolver: zodResolver(updateUserGraphQLSchema),
    defaultValues: { name: user.name || "", profile_text: user.profile_text || "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateUserGraphQLSchema>> = async formInputs => {
    try {
      const input = {
        name: formInputs.name,
        profileText: formInputs.profile_text || undefined,
        avatar: selectedFile || undefined,
      };

      const result = await updateUserWithFile(apolloClient, input);

      if (result.data?.updateUser?.errors?.length > 0) {
        errorToast({
          title: "プロフィール更新に失敗しました",
          description: result.data.updateUser.errors.join(", "),
        });
        return;
      }

      if (result.data?.updateUser?.user) {
        const updatedUser = result.data.updateUser.user;
        setUser({
          ...user,
          id: updatedUser.id ? Number(updatedUser.id) : user.id,
          name: updatedUser.name,
          profile_text: updatedUser.profileText,
          avatar_url: updatedUser.avatarUrl,
        });
        setIsEditMode(false);
        successToast({ title: "プロフィールを更新しました" });
      } else {
        throw new Error("ユーザー情報の取得に失敗しました");
      }
    } catch {
      // Error is handled via errorToast
      errorToast({
        title: "プロフィール更新に失敗しました",
        description: "通信エラーが発生しました。もう一度お試しください。",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = e => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const currentAvatarUrl = previewUrl || user.avatar_url;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
        <FormControl isInvalid={Boolean(errors.name)} isRequired>
          <FormLabel htmlFor="name">名前</FormLabel>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          <Input type="text" placeholder="名前" {...register("name")} />
        </FormControl>

        <FormControl isInvalid={Boolean(errors.profile_text)}>
          <FormLabel htmlFor="profile_text">プロフィール</FormLabel>
          <FormErrorMessage>{errors.profile_text?.message}</FormErrorMessage>
          <Textarea placeholder="プロフィール文章" {...register("profile_text")} />
        </FormControl>

        <FormControl isInvalid={Boolean(errors.avatar)}>
          <FormLabel>アバター</FormLabel>
          <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>

          <Box position="relative" display="inline-block">
            {currentAvatarUrl ? (
              <Image
                src={currentAvatarUrl}
                alt="Profile"
                borderRadius="full"
                boxSize="100px"
                objectFit="cover"
                cursor="pointer"
                onClick={() => fileInputRef.current?.click()}
              />
            ) : (
              <Circle
                size="100px"
                bg="gray.200"
                cursor="pointer"
                onClick={() => fileInputRef.current?.click()}>
                <AttachmentIcon />
              </Circle>
            )}

            <Controller
              name="avatar"
              control={control}
              render={() => (
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  display="none"
                />
              )}
            />
          </Box>
        </FormControl>

        <Button type="submit" isLoading={isSubmitting} colorScheme="pink" size="lg">
          更新する (GraphQL)
        </Button>
        <Button onClick={() => setIsEditMode(false)} size="lg">
          キャンセル
        </Button>
      </VStack>
    </form>
  );
}
