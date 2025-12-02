import fetchCurrentSessionAction from "@/src/app/actions/fetchCurrentSessionAction";
import fetchParticipatedMahjongSession from "@/src/app/me/participated-mahjong-sessions/actions/fetchParticipatedMahjongSession";
import ErrorPage from "@/src/components/errors/ErrorPage";
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { captureException } from "@sentry/nextjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

export default async function ParticipatedMahjongSessionSection({ id }: Props) {
  try {
    const session = await fetchCurrentSessionAction();
    if (session.isLoggedIn == false) {
      redirect("/auth/request");
    }

    const { mahjongSession } = await fetchParticipatedMahjongSession({ id });

    return (
      <Box>
        <Box px="2">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/me">マイページ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/me/participated-mahjong-sessions">麻雀戦績</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>
                {new Date(mahjongSession.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        <Container mt="16" px="1">
          <Table mt="1" size={["sm", "md"]}>
            <Thead>
              <Tr display="flex" className="divide-x">
                <Th px="0" w={["41px", "16"]} display="inline-block" />

                {mahjongSession.mahjongParticipants.map(participant => (
                  <VStack
                    as={Th}
                    key={participant.id}
                    scope="col"
                    className="flex-1"
                    gap={["1", "2"]}
                    _even={{ bg: "neutral.200" }}>
                    <Avatar src={participant.user.avatarUrl} size={["sm", "md"]} />
                    <Text as="span" noOfLines={1} fontSize={["sm", "md"]} color="primary.500">
                      {participant.name}
                    </Text>
                  </VStack>
                ))}
              </Tr>
            </Thead>

            <VStack
              as={Tbody}
              gap="0"
              align="stretch"
              w="full"
              borderTop="2px"
              borderColor="green.500">
              {mahjongSession.mahjongGames.map((mahjongGame, index) => (
                <Tr key={mahjongGame.id} display="flex" className="divide-x" alignItems="stretch">
                  <Td textAlign="center" scope="row" px="0" w={["13", "16"]}>
                    <Text as="span" fontWeight="bold">
                      {index + 1}
                    </Text>
                  </Td>

                  {mahjongSession.mahjongParticipants.map(participant => {
                    const participantResult = mahjongGame.mahjongResults.find(result => {
                      return result.mahjongParticipantId == participant.id;
                    });

                    return (
                      <Td
                        key={participant.id}
                        textAlign="center"
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p="0"
                        position="relative"
                        _even={{ bg: "neutral.200" }}>
                        {participantResult ? (
                          <Text
                            as="span"
                            fontSize={["lg", "2xl"]}
                            fontWeight="bold"
                            color={
                              participantResult.resultPoints > 0
                                ? "blue.600"
                                : participantResult.resultPoints < 0
                                  ? "red.500"
                                  : "primary.500"
                            }>
                            {participantResult.resultPoints}
                          </Text>
                        ) : (
                          <Text as="span">観戦</Text>
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}

              <Tr display="flex" className="divide-x">
                <Td textAlign="center" scope="row" px="0" w={["13", "16"]}>
                  <Text as="span" fontWeight="bold">
                    {mahjongSession.mahjongGames.length + 1}
                  </Text>
                </Td>

                {mahjongSession.mahjongParticipants.map(participant => (
                  <Td
                    key={participant.id}
                    textAlign="center"
                    flex="1"
                    _even={{ bg: "neutral.200" }}>
                    <Text as="span" />
                  </Td>
                ))}
              </Tr>
            </VStack>

            <Tfoot borderTop="4px" borderColor="green.500">
              <Tr display="flex" className="divide-x" borderTop="1px">
                <Td textAlign="center" scope="row" w={["13", "16"]}>
                  <Text as="span" fontWeight="bold" fontSize={["2xs", "xs"]}>
                    計
                  </Text>
                </Td>

                {mahjongSession.mahjongParticipants.map(participant => (
                  <Td
                    key={participant.id}
                    textAlign="center"
                    flex="1"
                    _even={{ bg: "neutral.200" }}>
                    <Text
                      as="span"
                      fontSize={["lg", "xl"]}
                      fontWeight="bold"
                      color={
                        participant.totalPoints > 0
                          ? "blue.600"
                          : participant.totalPoints < 0
                            ? "red.500"
                            : "primary.500"
                      }>
                      {participant.totalPoints}
                    </Text>

                    <Text as="span" fontSize="2xs" ml="1">
                      pt
                    </Text>
                  </Td>
                ))}
              </Tr>

              <Tr display="flex" className="divide-x">
                <Td textAlign="center" scope="row" w={["13", "16"]}>
                  <Text fontSize={["2xs", "xs"]} lineHeight="1" as="span" fontWeight="bold">
                    平均
                    <br />
                    順位
                  </Text>
                </Td>

                {mahjongSession.mahjongParticipants.map(participant => (
                  <Td
                    key={participant.id}
                    textAlign="center"
                    flex="1"
                    _even={{ bg: "neutral.200" }}>
                    <Text fontSize={["lg", "xl"]} display="inline-block" as="span">
                      {participant.averageRanking}
                    </Text>
                    <Text as="span" fontSize="2xs" ml="1">
                      位
                    </Text>
                  </Td>
                ))}
              </Tr>

              <Tr display="flex" className="divide-x">
                <Td textAlign="center" scope="row" px="0" w={["13", "16"]}>
                  <Text fontSize="2xs" as="span" fontWeight="bold">
                    収支
                  </Text>
                </Td>

                {mahjongSession.mahjongParticipants.map(participant => (
                  <Td
                    key={participant.id}
                    textAlign="center"
                    flex="1"
                    px="0"
                    _even={{ bg: "neutral.200" }}>
                    <Text
                      as="span"
                      fontSize={["lg", "xl"]}
                      fontWeight="bold"
                      color={
                        participant.totalProfits > 0
                          ? "blue.600"
                          : participant.totalProfits < 0
                            ? "red.500"
                            : "primary.500"
                      }>
                      {participant.totalProfits}
                    </Text>
                    <Text as="span" fontSize="2xs" ml="1" display="inline-block">
                      pt
                    </Text>
                  </Td>
                ))}
              </Tr>
            </Tfoot>
          </Table>
        </Container>
      </Box>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    /* eslint-disable-next-line no-console */
    console.error("Error fetching participated mahjong sessions:", error);
    captureException(error);

    return <ErrorPage message={error.message} />;
  }
}
