import HamburgerCheckBox from "@/src/components/sideNavigation/HamburgerCheckBox";
import LogoutAndWithdraw from "@/src/components/sideNavigation/LogoutAndWithdraw";
import { Box, Container, HStack, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { GiThink } from "react-icons/gi";

export default function SideNavigation() {
  return (
    <Fragment>
      <HamburgerCheckBox />

      <label htmlFor="hamburger" className="absolute block top-6 right-6 size-8 z-20" />
      <label
        htmlFor="hamburger"
        className="absolute top-6 right-6 block w-8 h-1 bg-white transition-all peer-checked:rotate-45 peer-checked:translate-y-3 z-20"
      />
      <label
        htmlFor="hamburger"
        className="absolute top-9 right-6 block w-8 h-1 bg-white peer-checked:hidden"
      />
      <label
        htmlFor="hamburger"
        className="absolute top-12 right-6 block w-8 h-1 bg-white transition-all peer-checked:-rotate-45 peer-checked:-translate-y-3 z-20"
      />
      <label
        htmlFor="hamburger"
        className="top-0 left-0 w-screen h-screen peer-checked:fixed z-10 peer-checked:block hidden bg-black/50"
      />

      <Box
        as="nav"
        position="fixed"
        top="0"
        right="0"
        w={["72", "xs"]}
        shadow="dark-lg"
        zIndex="10"
        className="h-screen bg-primary-light transition-all translate-x-full peer-checked:translate-x-0">
        <Container maxW="xs" mt="24" px="8">
          <UnorderedList listStyleType="none">
            <VStack alignItems="stretch" spacing={3}>
              <ListItem>
                <Link href="/what-to-discard-problems" className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <GiThink size={20} />
                    <Text fontSize="lg">何切る問題</Text>
                  </HStack>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/learning" className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <Image src="/beginner-icon.webp" alt="ハジメタイ" width={20} height={20} />
                    <Text fontSize="lg">ハジメタイ</Text>
                  </HStack>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/privacy" className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <Text fontSize="md">プライバシーポリシー</Text>
                  </HStack>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/terms" className="w-full">
                  <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
                    <Text fontSize="md">利用規約</Text>
                  </HStack>
                </Link>
              </ListItem>

              <LogoutAndWithdraw />
            </VStack>
          </UnorderedList>
        </Container>
      </Box>
    </Fragment>
  );
}
