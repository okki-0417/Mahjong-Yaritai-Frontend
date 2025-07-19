"use client";

import { useContext, useState } from "react";
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
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import useMyUserId from "@/src/hooks/useMyUserId";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import ButtonNeutral from "@/src/components/Buttons/ButtonNeutral";

export default function Navigation() {
  const [checked, setChecked] = useState(false);
  const auth = useIsLoggedIn();
  const myUserId = useMyUserId();
  const router = useRouter();
  const { setAuth, setMyUserId } = useContext(AuthStateContext);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const handleLogout = async () => {
    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      await apiClient.deleteSession([]);
      setAuth(false);
      setMyUserId(null);
      successToast({ title: "ログアウトしました" });
      router.push("/");
      setChecked(false);
    } catch (error) {
      errorToast({ error, title: "ログアウトに失敗しました" });
    }
  };

  return (
    <>
      <Box as="header" position="fixed" w="full" zIndex="50">
        <Center as="nav" h="20" position="relative" className="bg-primary">
          <Container maxW="5xl">
            <HStack justifyContent={["center", "space-between"]}>
              <Link href="/">
                <HStack>
                  <Circle overflow="hidden">
                    <Image src="/logo.webp" alt="麻雀好きが集まる場所" boxSize="10" />
                  </Circle>
                  <Text fontWeight="bold" fontSize={["2xl", "3xl"]}>
                    麻雀ヤリタイ
                  </Text>
                </HStack>
              </Link>

              <HStack display={["none", "none", "flex"]}>
                <Link href="/what-to-discard-problems">
                  <HStack gap="1">
                    <ButtonNeutral>
                      <HStack mx="0">
                        <GiThink size={25} color="white" />
                        <Text>何切る問題</Text>
                      </HStack>
                    </ButtonNeutral>
                  </HStack>
                </Link>

                {!auth && (
                  <Link href="/auth/request">
                    <HStack gap="1">
                      <ButtonNeutral>
                        <Text>ログイン / 新規登録</Text>
                      </ButtonNeutral>
                    </HStack>
                  </Link>
                )}
              </HStack>

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
                  <Box
                    className={`w-full h-1 bg-white transition-all ${checked && "-rotate-45"}`}
                  />
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
          w="xs"
          shadow="dark-lg"
          zIndex="50"
          className={`h-screen bg-base transition-all ${!checked && "translate-x-full"}`}>
          <Container maxW="xs" mt="20" px="8">
            <VStack alignItems="start" spacing={3}>
              {!auth && (
                <Link href="/auth/request" onClick={() => setChecked(false)} className="w-full ">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <FaUser size={18} />
                    <Text fontSize="lg">ログイン / 新規登録</Text>
                  </HStack>
                </Link>
              )}

              {auth && (
                <Link
                  href={`/users/${myUserId}`}
                  onClick={() => setChecked(false)}
                  className="w-full ">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <FaUser size={18} />
                    <Text fontSize="lg">プロフィール</Text>
                  </HStack>
                </Link>
              )}

              <Link
                href="/what-to-discard-problems"
                onClick={() => setChecked(false)}
                className="w-full">
                <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                  <GiThink size={20} />
                  <Text fontSize="lg">何切る問題</Text>
                </HStack>
              </Link>

              {auth && (
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
          </Container>
        </Box>
      </Box>
    </>
  );
}
