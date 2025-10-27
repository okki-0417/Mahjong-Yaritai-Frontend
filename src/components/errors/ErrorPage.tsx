import { Alert, AlertDescription, AlertIcon, AlertTitle, Container } from "@chakra-ui/react";

type Props = {
  message: string;
};

export default function ErrorPage({ message }: Props) {
  return (
    <Container mt="20" maxW="2xl" mb="20">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px">
        <AlertIcon boxSize="40px" mr={0} />

        <AlertTitle mt={4} mb={1} fontSize="lg">
          エラーが発生しました
        </AlertTitle>

        <AlertDescription mt="2" ml="8">
          {message}
        </AlertDescription>
      </Alert>
    </Container>
  );
}
