"use client";

import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { useCustomForm } from "@/src/hooks/useCustomForm";
import { useMutation } from "@apollo/client/react";
import {
  UpdateUserInput,
  UpdateUserMutationVariables,
  UpdateUserProfileDocument,
  User,
} from "@/src/generated/graphql";
import Image from "next/image";

type Props = {
  user: User;
};

type ProfileEditFormInputs = UpdateUserInput;

export default function ProfileEditForm({ user }: Props) {
  const toast = useToast();

  const [updateUser] = useMutation<UpdateUserInput, UpdateUserMutationVariables>(
    UpdateUserProfileDocument,
    {
      onCompleted: () => {
        toast({
          title: "プロフィールを更新しました",
          status: "success",
        });
      },
      onError: error => {
        toast({
          title: "プロフィールの更新に失敗しました",
          description: error.message,
          status: "error",
        });
      },
    },
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useCustomForm<ProfileEditFormInputs>({
    defaultValues: {
      name: user.name,
      profileText: user.profileText || "",
      avatar: null,
    },
  });

  const onSubmit: SubmitHandler<ProfileEditFormInputs> = async formInputs => {
    if (formInputs.avatar) {
      await updateUser({
        variables: {
          input: {
            name: formInputs.name,
            avatar: formInputs.avatar,
            profileText: formInputs.profileText,
          },
        },
      });
    } else {
      await updateUser({
        variables: {
          input: {
            name: formInputs.name,
            profileText: formInputs.profileText,
          },
        },
      });
    }
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const previousImageUrlRef = useRef<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length == 0) return null;

    if (previousImageUrlRef.current) {
      URL.revokeObjectURL(previousImageUrlRef.current);
    }

    const url = URL.createObjectURL(files[0]);
    previousImageUrlRef.current = url;

    setImageUrl(url);
    return files[0];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" gap="4">
        <VStack>
          <Circle size="200" overflow="hidden">
            <Image
              src={imageUrl || user?.avatarUrl || "/no-image.webp"}
              alt={user.name}
              width={200}
              height={200}
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

          <FormErrorMessage>{String(errors.avatar?.message)}</FormErrorMessage>
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
            isDisabled={isSubmitting}
          />
          <FormErrorMessage color="red.200">{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.profileText)}>
          <FormLabel color="white">自己紹介</FormLabel>
          <Textarea
            isInvalid={Boolean(errors.profileText)}
            placeholder="自己紹介を入力してください（500文字まで）"
            defaultValue={user.profileText || ""}
            resize="vertical"
            rows={5}
            {...register("profileText")}
            isDisabled={isSubmitting}
          />
          <FormErrorMessage color="red.200">{errors.profileText?.message}</FormErrorMessage>
        </FormControl>

        <Box w="full" textAlign="right">
          <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
            送信
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
