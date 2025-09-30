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
import { useMutation } from "@apollo/client/react";
import {
  UpdateUserProfileDocument,
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from "@/src/generated/graphql";

// GraphQL用のスキーマ定義
const updateUserGraphQLSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(20, "名前は20文字以内で入力してください"),
  profileText: z
    .string()
    .max(500, "プロフィールは500文字以内で入力してください")
    .nullable()
    .optional(),
  avatar: z.instanceof(File).optional(),
});

type UserType = {
  id?: string | number;
  name?: string;
  profileText?: string | null;
  avatarUrl?: string | null;
  email?: string | null;
};

export default function ProfileEditForm({
  setIsEditMode,
  user,
  setUser,
}: {
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const previousImageUrlRef = useRef<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [updateUser, { loading: isUpdating }] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UpdateUserProfileDocument);

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
  } = useCustomForm<z.infer<typeof updateUserGraphQLSchema>>({
    resolver: zodResolver(updateUserGraphQLSchema),
    defaultValues: { name: user.name || "", profileText: user.profileText || "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateUserGraphQLSchema>> = async formInputs => {
    try {
      const result = await updateUser({
        variables: {
          input: {
            name: formInputs.name,
            profileText: formInputs.profileText,
          },
        },
      });

      if (result.data?.updateUser?.errors && result.data.updateUser.errors.length > 0) {
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
          id: updatedUser.id,
          name: updatedUser.name,
          profileText: updatedUser.profileText,
          avatarUrl: updatedUser.avatarUrl,
        });
        setIsEditMode(false);
        successToast({ title: "プロフィールを更新しました" });
      }
    } catch (error) {
      errorToast({
        error,
        title: "プロフィールを更新できませんでした",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" gap="4">
        <VStack>
          <Circle size="200" overflow="hidden">
            <Image
              src={imageUrl || user?.avatarUrl || "/no-image.webp"}
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
            placeholder={user.name}
            fontSize="2xl"
            w="full"
            h="fit-content"
            {...register("name")}
            isDisabled={isSubmitting || isUpdating}
          />
          <FormErrorMessage color="red.200">{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.profileText)}>
          <FormLabel color="white">自己紹介</FormLabel>
          <Textarea
            placeholder="自己紹介を入力してください（500文字まで）"
            defaultValue={user?.profileText || ""}
            maxLength={500}
            resize="vertical"
            minH="120px"
            {...register("profileText")}
            isDisabled={isSubmitting || isUpdating}
          />
          <FormErrorMessage color="red.200">{errors.profileText?.message}</FormErrorMessage>
        </FormControl>

        <Box w="full" textAlign="right">
          <Button type="submit" colorScheme="pink" isLoading={isSubmitting || isUpdating}>
            送信
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
