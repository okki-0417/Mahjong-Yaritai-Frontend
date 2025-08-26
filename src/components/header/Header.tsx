import {
  Box,
  Center,
  Circle,
  Container,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import ButtonNeutral from "@/src/components/Buttons/ButtonNeutral";
import Image from "next/image";
import LoginSection from "@/src/components/header/LoginSection";
import { Fragment } from "react";
import SideNavigation from "@/src/components/sideNavigation/SideNavigation";
import LogoImg from "@/public/logo.webp";

export default function Header() {
  return (
    <Fragment>
      <Box as="header" w="full" zIndex="50">
        <Center as="nav" h="16" position="relative" className="bg-primary">
          <Container maxW="5xl">
            <HStack justifyContent={["center", "space-between"]}>
              <Link href="/">
                <HStack>
                  <Circle overflow="hidden">
                    <Image
                      src={LogoImg}
                      alt="麻雀好きが集まる場所"
                      width={40}
                      height={40}
                      className="aspect-square"
                    />
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

                  <LoginSection />
                </HStack>
              </UnorderedList>
            </HStack>
          </Container>
        </Center>

        <SideNavigation />
      </Box>
    </Fragment>
  );
}
