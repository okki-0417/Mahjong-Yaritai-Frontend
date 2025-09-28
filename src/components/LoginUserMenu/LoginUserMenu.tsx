"use client";

import LoginUserMenuCheckBox from "@/src/components/LoginUserMenu/LoginUserMenuCheckBox";
import { CgProfile } from "react-icons/cg";
import { MdBookmarkAdded } from "react-icons/md";
import UserIcon from "@/src/components/LoginUserMenu/UserIcon";
import {
  Box,
  Container,
  Divider,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Fragment } from "react";
import LogoutSection from "@/src/components/sideNavigation/LogoutButton";
import { FaUserTimes } from "react-icons/fa";
import { useSession } from "@/src/hooks/useSession";

export default function LoginUserMenu() {
  const { session } = useSession();
  const profile = session?.user;

  return (
    <Box>
      {profile && (
        <Fragment>
          <LoginUserMenuCheckBox />

          <label
            htmlFor="login-user-menu"
            className="absolute left-4 top-2 z-20 inline-block cursor-pointer rounded-full">
            <UserIcon user={profile} />
          </label>

          <label
            htmlFor="login-user-menu"
            className="top-0 left-0 w-screen h-screen peer-checked:fixed z-10 peer-checked:block hidden bg-black/50"
          />

          <Box
            as="nav"
            position="fixed"
            top="0"
            left="0"
            w={["72", "xs"]}
            shadow="dark-lg"
            zIndex="10"
            className="h-screen bg-primary-light transition-all -translate-x-full peer-checked:translate-x-0">
            <Container maxW="xs" mt="24" px="8">
              <UnorderedList listStyleType="none">
                <VStack alignItems="stretch" gap="0">
                  <ListItem>
                    <Link href={`/me/profile`} className="w-full">
                      <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                        <CgProfile size={20} />
                        <Text fontSize="lg">プロフィール</Text>
                      </HStack>
                    </Link>
                  </ListItem>

                  <ListItem>
                    <Link href="/me/what-to-discard-problems/bookmarks" className="w-full">
                      <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                        <MdBookmarkAdded size={20} />
                        <Text fontSize="lg">お気に入り</Text>
                      </HStack>
                    </Link>
                  </ListItem>

                  <Divider my="4" />

                  <ListItem>
                    <LogoutSection />
                  </ListItem>

                  <ListItem>
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
                  </ListItem>
                </VStack>
              </UnorderedList>
            </Container>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
