"use client";

import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import RateFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/RateFormControl";
import ChipAmountFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/ChipAmountFormControl";
import CreatedDateFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/CreatedDateFormControl";
import ParticipantUserFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipantUserFormControl";
import AddParticipantUserButton from "@/src/app/me/participated-mahjong-sessions/new/components/AddParticipantUserButon";
import GameFormControl from "@/src/app/me/participated-mahjong-sessions/new/components/GameFormControl";
import AddGameButton from "@/src/app/me/participated-mahjong-sessions/new/components/AddGameButton";
import TotalPointsFormControls from "@/src/app/me/participated-mahjong-sessions/new/components/TotalPointsFormControls";
import AverageRakingFormControls from "@/src/app/me/participated-mahjong-sessions/new/components/AverageRakingFormControls";
import TotalProfitsFormControls from "@/src/app/me/participated-mahjong-sessions/new/components/TotalProfitsFormControls";

export type GameSessionFormType = {
  participantUsers: ParticipantUserType[];
  games: GameType[];
  rate: number;
  chipAmount: number;
  createdDate: string;
};

export type GameType = {
  results: {
    resultPoints: number | null;
  }[];
};

export type ParticipantUserType = {
  userId: string;
  avatarUrl: string;
  name: string;
};

export default function ParticipatedMahjongSessionForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GameSessionFormType>({
    defaultValues: {
      rate: 100,
      chipAmount: 0,
      createdDate: new Date().toISOString().split("T")[0],
      participantUsers: [
        { userId: null, name: "NONAME", avatarUrl: null },
        { userId: null, name: "NONAME", avatarUrl: null },
        { userId: null, name: "NONAME", avatarUrl: null },
        { userId: null, name: "NONAME", avatarUrl: null },
      ],
      games: [
        {
          results: [
            { resultPoints: null },
            { resultPoints: null },
            { resultPoints: null },
            { resultPoints: null },
          ],
        },
      ],
    },
    mode: "onChange",
  });
  const { fields: participantUserFields, append: appendParticipantUser } = useFieldArray({
    control,
    shouldUnregister: true,
    name: "participantUsers",
  });
  const { fields: gameFields, append: appendGame } = useFieldArray({
    control,
    shouldUnregister: true,
    name: "games",
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<GameSessionFormType> = formData => {
    /* eslint-disable-next-line  no-console */
    console.log(JSON.stringify(formData, null, 2));

    toast({
      title: "保存しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container px="0" maxW="container.md" mt="2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box px="1">
          <CreatedDateFormControl register={register} errors={errors} />

          <Stack flexDir={["column", "row"]} gap={["1", "5"]} mt="4" mb="2">
            <RateFormControl register={register} rateError={errors.rate} />
            <ChipAmountFormControl register={register} chipAmountError={errors.chipAmount} />
          </Stack>
        </Box>

        <HStack gap="0" align="stretch">
          <Table
            as="div"
            borderRadius=""
            borderLeftRadius={["sm", "md"]}
            bg="neutral.100"
            boxShadow="lg"
            overflow="hidden">
            <Thead as="div" position="relative">
              <Tr as={HStack} gap="0" align="stretch">
                <Th
                  as="div"
                  px="0"
                  w={["10", "16"]}
                  borderColor="secondary.50"
                  borderBottom=""
                  borderRightWidth="1.5px"
                />
                <SimpleGrid as="div" columns={participantUserFields.length} w="full">
                  {participantUserFields.map((participantUserField, index) => (
                    <ParticipantUserFormControl
                      key={participantUserField.id}
                      participantUserIndex={index}
                      participantUser={watch(`participantUsers.${index}`)}
                      register={register}
                    />
                  ))}
                </SimpleGrid>
              </Tr>
            </Thead>
            <Divider borderWidth="2px" borderColor="#060" />
            <Tbody
              as={VStack}
              align="stretch"
              spacing="0"
              position="relative"
              divider={<Divider borderColor="secondary.50" borderBottomWidth="1.5px" />}>
              {gameFields.map((gameField, gameIndex) => (
                <GameFormControl
                  key={gameField.id}
                  gameFieldId={gameField.id}
                  gameIndex={gameIndex}
                  participantUserFields={participantUserFields}
                  gameError={errors.games?.[gameIndex]}
                  register={register}
                  gameResultPoints={watch(`games.${gameIndex}.results`)}
                />
              ))}
              <AddGameButton
                appendGame={appendGame}
                participantUserFields={participantUserFields}
              />
            </Tbody>
            <Divider borderWidth="2px" borderColor="#060" />
            <Tfoot as="div">
              <Tr as={HStack} gap="0" align="stretch">
                <Th
                  as={Center}
                  p="0"
                  w={["10", "16"]}
                  borderColor="secondary.50"
                  borderBottom=""
                  borderRightWidth="1.5px"
                  color="primary.500"
                  fontSize={["xs", "sm"]}>
                  <Text>合計</Text>
                </Th>
                <TotalPointsFormControls
                  participantUserFields={participantUserFields}
                  participantUsers={watch("participantUsers")}
                  games={watch("games")}
                />
              </Tr>
              <Divider borderColor="secondary.50" />
              <Tr as={HStack} gap="0" align="stretch">
                <Th
                  as={Center}
                  px="0"
                  w={["10", "16"]}
                  py="0"
                  borderBottom=""
                  borderColor="secondary.50"
                  color="primary.500"
                  borderRightWidth="1.5px">
                  <Text fontSize={["xs", "sm"]}>
                    平均
                    <br />
                    順位
                  </Text>
                </Th>
                <AverageRakingFormControls
                  participantUsers={watch("participantUsers")}
                  games={watch("games")}
                  participantUserFields={participantUserFields}
                />
              </Tr>
              <Divider borderColor="secondary.50" />
              <Tr as={HStack} gap="0" align="stretch">
                <Th
                  as={Center}
                  px="0"
                  w={["10", "16"]}
                  py="4"
                  borderBottom=""
                  borderColor="secondary.50"
                  color="primary.500"
                  borderRightWidth="1.5px">
                  <Text fontSize={["xs", "sm"]}>収支</Text>
                </Th>
                <TotalProfitsFormControls
                  participantUserFields={participantUserFields}
                  participantUsers={watch("participantUsers")}
                  rate={watch("rate")}
                  games={watch("games")}
                />
              </Tr>
            </Tfoot>
          </Table>

          <AddParticipantUserButton appendParticipantUser={appendParticipantUser} />
        </HStack>

        <Box mt="4">
          <Button type="submit" colorScheme="pink">
            保存する
          </Button>
        </Box>
      </form>
    </Container>
  );
}
