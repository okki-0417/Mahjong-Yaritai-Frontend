import ButtonNeutral from "@/src/components/Buttons/ButtonNeutral";
import LogoutButton from "@/src/components/LogoutButton";
import { Box, Center, Container, Divider, HStack, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box as="footer" mt="100" display={["none", "block"]} className="bg-primary text-neutral">
      <Container as="nav" maxW="5xl" pt={20} pb={16}>
        <UnorderedList styleType="none">
          <HStack spacing="12">
            <Link href="/">
              <ListItem>
                <ButtonNeutral>ホーム</ButtonNeutral>
              </ListItem>
            </Link>
            <Center h={8}>
              <Divider orientation="vertical" borderColor="white" />
            </Center>
            <Link href="/what-to-discard-problems">
              <ListItem>
                <ButtonNeutral>何切る問題</ButtonNeutral>
              </ListItem>
            </Link>
            <Center h={10}>
              <Divider orientation="vertical" borderColor="white" />
            </Center>

            <LogoutButton />
          </HStack>
        </UnorderedList>
      </Container>
      <Center py={2} bg="gray.900">
        &copy; 2025 All Rights Reserved
      </Center>
    </Box>
  );
}
