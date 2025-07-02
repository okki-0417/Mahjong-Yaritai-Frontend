import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

export default function LinkText({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Box
      color="blue.200"
      _hover={{ color: "blue.100", textDecoration: "underline" }}
      w="fit-content">
      <Link href={href}>{children}</Link>
    </Box>
  );
}
