"use client";

import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { FaUser, FaUserTimes } from "react-icons/fa";
import { GiThink } from "react-icons/gi";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Circle,
  Container,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiClient } from "@/src/lib/api/client";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import ButtonNeutral from "@/src/components/Buttons/ButtonNeutral";
import Image from "next/image";
import z from "zod";
import { schemas } from "@/src/zodios/api";

export default function Header() {
  const [checked, setChecked] = useState(false);
  const [session, setSession] = useState<z.infer<typeof schemas.Session>>(null);

  const isLoggedIn = Boolean(session?.is_logged_in);
  const myUserId = isLoggedIn ? session.user_id : null;
  const pathName = usePathname();
  const router = useRouter();

  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const handleLogout = async () => {
    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      await apiClient.deleteSession([]);
      setSession(null);
      successToast({ title: "ログアウトしました" });
      router.push("/");
      setChecked(false);
    } catch (error) {
      errorToast({ error, title: "ログアウトに失敗しました" });
    }
  };

  useEffect(() => {
    const updateSession = async () => {
      const response = await apiClient.getSession();
      setSession(response.session);
    };

    updateSession();
  }, [pathName]);

  return (
    <Box as="header" position="fixed" w="full" zIndex="50">
      <Center as="nav" h="20" position="relative" className="bg-primary">
        <Container maxW="5xl">
          <HStack justifyContent={["center", "space-between"]}>
            <Link href="/">
              <HStack>
                <Circle overflow="hidden">
                  <Image src="/logo.webp" alt="麻雀好きが集まる場所" width={40} height={40} />
                </Circle>
                <Text fontWeight="bold" fontSize={["2xl", "3xl"]}>
                  麻雀ヤリタイ
                </Text>
              </HStack>
            </Link>

            <UnorderedList listStyleType="none">
              <HStack display={["none", "none", "flex"]}>
                <ListItem>
                  <Link href="/learning">
                    <HStack gap="1">
                      <ButtonNeutral>
                        <Text>ハジメタイ</Text>
                      </ButtonNeutral>
                    </HStack>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link href="/what-to-discard-problems">
                    <HStack gap="1">
                      <ButtonNeutral>
                        <HStack mx="0">
                          <Text>何切る問題</Text>
                        </HStack>
                      </ButtonNeutral>
                    </HStack>
                  </Link>
                </ListItem>

                {!isLoggedIn && (
                  <ListItem>
                    <Link href="/auth/request">
                      <HStack gap="1">
                        <ButtonNeutral>
                          <Text>ログイン / 新規登録</Text>
                        </ButtonNeutral>
                      </HStack>
                    </Link>
                  </ListItem>
                )}
              </HStack>
            </UnorderedList>

            <button
              className="absolute inset-y-0 my-auto right-8 size-8"
              style={{ zIndex: 60 }}
              onClick={() => setChecked(!checked)}>
              <Checkbox hidden defaultChecked={checked} />

              <VStack h="full">
                <Box
                  className={`w-full h-1 bg-white transition-all ${checked && "rotate-45 translate-y-3"}`}
                />
                <Box className={`w-full h-1 bg-white ${checked && "hidden"}`} />
                <Box className={`w-full h-1 bg-white transition-all ${checked && "-rotate-45"}`} />
              </VStack>
            </button>
          </HStack>
        </Container>
      </Center>

      {/* Background overlay */}
      {checked && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          zIndex="40"
          onClick={() => setChecked(false)}
        />
      )}

      <Box
        as="nav"
        position="fixed"
        top="0"
        right="0"
        w={["72", "xs"]}
        shadow="dark-lg"
        zIndex="50"
        className={`h-screen bg-primary-light transition-all ${!checked && "translate-x-full"}`}>
        <Container maxW="xs" mt="20" px="8">
          <UnorderedList listStyleType="none">
            <VStack alignItems="start" spacing={3}>
              {isLoggedIn ? (
                <ListItem>
                  <Link
                    href={`/users/${myUserId}`}
                    onClick={() => setChecked(false)}
                    className="w-full ">
                    <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                      <FaUser size={18} />
                      <Text fontSize="lg">プロフィール</Text>
                    </HStack>
                  </Link>
                </ListItem>
              ) : (
                <ListItem>
                  <Link href="/auth/request" onClick={() => setChecked(false)} className="w-full ">
                    <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                      <FaUser size={18} />
                      <Text fontSize="lg">ログイン / 新規登録</Text>
                    </HStack>
                  </Link>
                </ListItem>
              )}

              <ListItem>
                <Link
                  href="/what-to-discard-problems"
                  onClick={() => setChecked(false)}
                  className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <GiThink size={20} />
                    <Text fontSize="lg">何切る問題</Text>
                  </HStack>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/learning" onClick={() => setChecked(false)} className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <Image src="/beginner-icon.webp" alt="ハジメタイ" width={20} height={20} />
                    <Text fontSize="lg">ハジメタイ</Text>
                  </HStack>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/privacy" onClick={() => setChecked(false)} className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <Text fontSize="md">プライバシーポリシー</Text>
                  </HStack>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/terms" onClick={() => setChecked(false)} className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <Text fontSize="md">利用規約</Text>
                  </HStack>
                </Link>
              </ListItem>

              {isLoggedIn && (
                <>
                  <Box w="full" mt={4} pt={4} borderTop="1px" borderColor="gray.300">
                    <Button
                      onClick={handleLogout}
                      w="full"
                      variant="ghost"
                      color="red.500"
                      _hover={{ bg: "red.50" }}
                      py={3}
                      px={4}
                      justifyContent="flex-start">
                      <HStack>
                        <IoMdLogOut size={18} />
                        <Text fontSize="lg">ログアウト</Text>
                      </HStack>
                    </Button>

                    <Link href="/me/withdrawal" onClick={() => setChecked(false)}>
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
                </>
              )}
            </VStack>
          </UnorderedList>
        </Container>
      </Box>
    </Box>
  );
}
