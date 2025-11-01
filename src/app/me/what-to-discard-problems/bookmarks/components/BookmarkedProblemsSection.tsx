import {
  BookmarkedWhatToDiscardProblemsDocument,
  CurrentUserProfileDocument,
} from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import ErrorPage from "@/src/components/errors/ErrorPage";
import ProblemCard from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemCard";

export default async function BookmarkedProblemsSection() {
  const client = getClient();

  try {
    const { data: sessionData } = await client.query({
      query: CurrentUserProfileDocument,
    });

    if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");

    const { data: problemData } = await client.query({
      query: BookmarkedWhatToDiscardProblemsDocument,
    });

    const problems = problemData.bookmarkedWhatToDiscardProblems.edges.map(edge => edge.node);

    if (problems.length == 0) {
      return <div>まだブックマークした問題はありません。</div>;
    } else {
      return (
        <VStack spacing={6}>
          {problems.map(edge => (
            <ProblemCard key={edge.id} problem={edge} />
          ))}
        </VStack>
      );
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    /* eslint-disable-next-line no-console */
    console.error("BookmarkedProblemsSection error:", error);
    return <ErrorPage message={error.message} />;
  }
}
