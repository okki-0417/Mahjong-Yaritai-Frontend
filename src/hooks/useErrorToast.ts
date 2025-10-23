"use client";

import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ErrorLike } from "@apollo/client";

type ErrorToastType = ErrorLike | AxiosError | Error;

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
    let errorDescription = description;

    // Apollo Clientのエラー処理
    if (!errorDescription && error && "graphQLErrors" in error) {
      const apolloError = error as ErrorLike & { graphQLErrors?: any[]; networkError?: any };
      if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
        errorDescription = apolloError.graphQLErrors.map(err => err.message).join(", ");
      } else if (apolloError.networkError) {
        errorDescription = apolloError.networkError.message;
      }
    }

    // Axiosのエラー処理
    if (!errorDescription && error instanceof AxiosError && error.response?.data) {
      try {
        const responseData = error.response.data as any;
        if (responseData.errors && Array.isArray(responseData.errors)) {
          const errors = responseData.errors;
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
