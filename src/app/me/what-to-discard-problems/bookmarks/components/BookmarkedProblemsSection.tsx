import {
  BookmarkedWhatToDiscardProblemsDocument,
  CurrentUserProfileDocument,
} from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function BookmarkedProblemsSection() {
  const client = getClient();
  const { data: sessionData } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");

  const { data: problemData, error } = await client.query({
    query: BookmarkedWhatToDiscardProblemsDocument,
  });

  if (error) {
    return (
      <div>
        <div>失敗</div>
        <div>Error: {error.message}</div>
      </div>
    );
  } else {
    return (
      <VStack spacing={6} align="stretch">
        <div>成功</div>
        {problemData.bookmarkedWhatToDiscardProblems.edges.map(edge => (
          <div key={edge.node.id}>{edge.node.user.name}</div>
        ))}
      </VStack>
    );
  }
}
