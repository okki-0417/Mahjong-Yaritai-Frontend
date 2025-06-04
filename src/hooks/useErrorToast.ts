"use client";

import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

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
    toast({
      title,
      status: "error",
      description: description || `${error?.message}`,
      duration,
      isClosable,
    });
  };

  return errorToast;
}
