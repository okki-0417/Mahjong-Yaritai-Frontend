import LogoutButton from "@/src/components/LogoutButton";
import { Box, Center, Container, Divider, HStack, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box mt="100" bg="gray.800">
      <Box as="footer" color="gray.200" display={["none", "block"]}>
        <Container as="nav" maxW="5xl" py={20}>
          <UnorderedList styleType="none">
            <HStack spacing="12">
              <Link href="/">
                <ListItem>ホーム</ListItem>
              </Link>
              <Center h={8}>
                <Divider orientation="vertical" borderColor="white" />
              </Center>
              <Link href="/what-to-discard-problems">
                <ListItem>何切る問題</ListItem>
              </Link>
              <Center h={10}>
                <Divider orientation="vertical" borderColor="white" />
              </Center>

              <LogoutButton />
            </HStack>
          </UnorderedList>
        </Container>
        <Center py={2} bg="gray.900">
          &copy; 2025 All Rights Rereded
        </Center>
      </Box>
    </Box>
  );
}
