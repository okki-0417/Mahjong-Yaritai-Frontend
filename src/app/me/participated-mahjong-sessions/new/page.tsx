import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { TableHead } from "@mui/material";
import Link from "next/link";

export default function NewGameRecordPage() {
  return (
    <Container maxW="container.lg" py="4">
      <Breadcrumbx>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/game-records">
            戦績の記録
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>新しい戦績の記録</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbx>

      <Container maxW="container.md" mx="auto" mt="8">
        <Table colorScheme="blue">
          <TableHead>
            <Tr>
              <Th w="40px">
                <Text as="span" color="neutral.50">
                  得点
                  <br />
                  局数
                </Text>
              </Th>
              <Th>
                <VStack>
                  <Avatar />
                  <Text as="span" color="neutral.50">
                    プレイヤー1
                  </Text>
                </VStack>
              </Th>
              <Th>
                <VStack>
                  <Avatar />
                  <Text as="span" color="neutral.50">
                    プレイヤー2
                  </Text>
                </VStack>
              </Th>
              <Th>
                <VStack>
                  <Avatar />
                  <Text as="span" color="neutral.50">
                    プレイヤー3
                  </Text>
                </VStack>
              </Th>
              <Th>
                <VStack>
                  <Avatar />
                  <Text as="span" color="neutral.50">
                    プレイヤー4
                  </Text>
                </VStack>
              </Th>
            </Tr>
          </TableHead>

          <Tbody>
            <Tr>
              <Td w="40px">1</Td>

              <Td p="1">
                <VStack>
                  <Editable defaultValue="100">
                    <EditablePreview />
                    <EditableInput maxW="80px" />
                  </Editable>
                </VStack>
              </Td>

              <Td p="1">
                <VStack>
                  <Editable defaultValue="100">
                    <EditablePreview />
                    <EditableInput maxW="80px" />
                  </Editable>
                </VStack>
              </Td>

              <Td p="1">
                <VStack>
                  <Editable defaultValue="100">
                    <EditablePreview />
                    <EditableInput maxW="80px" />
                  </Editable>
                </VStack>
              </Td>

              <Td p="1">
                <VStack>
                  <Editable defaultValue="100">
                    <EditablePreview />
                    <EditableInput maxW="80px" />
                  </Editable>
                </VStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Container>
    </Container>
  );
}
