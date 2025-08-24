"use client";

import LogoutSection from "@/src/components/sideNavigation/LogoutButton";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FaUserTimes } from "react-icons/fa";
import z from "zod";

export default function LogoutAndWithdraw() {
  const [session, setSession] = useState<z.infer<typeof schemas.Session>>(null);
  const pathName = usePathname();

  const isLoggedIn = Boolean(session?.is_logged_in);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await apiClient.getSession();
        return setSession(response.session);
      } catch (error) {
        return error;
      }
    };

    fetchSession();
  }, [pathName]);

  return (
    <Fragment>
      {isLoggedIn && (
        <Fragment>
          <LogoutSection />

          <Box w="full" mt={4} pt={4} borderTop="1px" borderColor="gray.300">
            <Link href="/me/withdrawal">
              <Box
                w="full"
                py={3}
                px={4}
                borderRadius="md"
                color="red.500"
                _hover={{ bg: "red.50" }}
                transition="background-color 0.2s">
                <HStack>
                  <FaUserTimes size={18} />
                  <Text fontSize="lg">退会</Text>
                </HStack>
              </Box>
            </Link>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
}
