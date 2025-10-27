import {
  BookmarkedWhatToDiscardProblemsDocument,
  CurrentUserProfileDocument,
} from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import ErrorPage from "@/src/components/errors/ErrorPage";
import ProblemCard from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemCard";

export default async function BookmarkedProblemsSection() {
  const client = getClient();
  const { data: sessionData, error: sessionError } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (sessionError) return <ErrorPage message={sessionError.message} />;
  if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");

  const { data: problemData, error: problemError } = await client.query({
    query: BookmarkedWhatToDiscardProblemsDocument,
  });

  if (problemError) return <ErrorPage message={problemError.message} />;
  const problems = problemData.bookmarkedWhatToDiscardProblems.edges.map(edge => edge.node);

  return (
    <VStack spacing={6} align="stretch">
      {problems.map(edge => (
        <ProblemCard key={edge.id} problem={edge} />
      ))}
    </VStack>
  );
}
