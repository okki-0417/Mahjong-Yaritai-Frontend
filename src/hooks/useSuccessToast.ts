"use client";

import { useToast } from "@chakra-ui/react";

export default function useSuccessToast() {
  const toast = useToast();

  const basicToast = ({
    title,
    description = "",
    duration = 3000,
    isClosable = true,
  }: {
    title: string;
    description?: string;
    duration?: number;
    isClosable?: boolean;
  }) => {
    toast({
      title,
      status: "success",
      description,
      duration,
      isClosable,
    });
  };

  return basicToast;
}
