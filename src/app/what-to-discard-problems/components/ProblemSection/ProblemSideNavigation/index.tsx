"use client";

import CreateProblemButton from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemSideNavigation/CreateProblemButton";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa";

export default function ProblemsSideNavigation() {
  return (
    <Card>
      <CardHeader pb="0">
        <Heading fontFamily="serif" size="md">
          何切る問題
        </Heading>
      </CardHeader>

      <CardBody pl="0" pt="2">
        <UnorderedList listStyleType="none">
          <VStack spacing="0" align="stretch" divider={<Divider />}>
            <ListItem>
              <CreateProblemButton />
            </ListItem>

            <ListItem>
              <Link href="/me/what-to-discard-problems/bookmarks">
                <Button variant="ghost" w="full" justifyContent="start">
                  <HStack className="text-primary">
                    <FaRegBookmark size={20} />
                    <Text>ブックマークした問題</Text>
                  </HStack>
                </Button>
              </Link>
            </ListItem>
          </VStack>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}
