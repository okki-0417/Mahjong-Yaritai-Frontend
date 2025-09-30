"use client";

import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";

type ErrorToastType = AxiosError;

export default function useErrorToast() {
  const toast = useToast();

  const errorToast = ({
    error,
    title,
    description,
    duration = 3000,
    isClosable = true,
  }: {
    error?: ErrorToastType;
    title: string;
    description?: string;
    duration?: number;
    isClosable?: boolean;
  }) => {
    // APIからのエラーレスポンスをパース
    let errorDescription = description;

    // eslint-disable-next-line no-console
    console.log(error);

    if (!errorDescription && error?.response?.data) {
      try {
        // response.data.errorsからエラーメッセージを抽出
        const responseData = error.response.data as any;
        if (responseData.errors && Array.isArray(responseData.errors)) {
          const errors = responseData.errors as z.infer<typeof schemas.Errors>;
          errorDescription = errors.map(err => err.message).join(", ");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (parseError) {
        // パースに失敗した場合は元のエラーメッセージを使用
        errorDescription = error?.message;
      }
    }

    if (!errorDescription) {
      errorDescription = error?.message;
    }

    toast({
      title,
      status: "error",
      description: errorDescription,
      duration,
      isClosable,
    });
  };

  return errorToast;
}
