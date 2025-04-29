import { Link } from "react-router";
import useLogout from "../hooks/useLogout";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  HStack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

export default function Footer() {
  const logout = useLogout();

  const auth = useIsLoggedIn();

  return (
    <Box
      as="footer"
      mt={100}
      bgColor="gray.800"
      color="gray.200"
      display={["none", "block"]}
    >
      <Container as="nav" maxW="5xl" py={20}>
        <UnorderedList styleType="none">
          <HStack spacing="12">
            <Link to="/">
              <ListItem>ホーム</ListItem>
            </Link>

            <Center h={8}>
              <Divider orientation="vertical" borderColor="white" />
            </Center>

            <Link to="/what-to-discard-problems">
              <ListItem>何切る問題</ListItem>
            </Link>

            {auth && (
              <>
                <Center h={10}>
                  <Divider orientation="vertical" borderColor="white" />
                </Center>

                <Button onClick={logout} colorScheme="" color="gray.200">
                  ログアウト
                </Button>
              </>
            )}
          </HStack>
        </UnorderedList>
      </Container>

      <Center py={2} bgColor="gray.900">
        &copy; 2025 All Rights Reserved
      </Center>
    </Box>
  );
}
