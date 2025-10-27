import ProblemClientSection from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemClientSection";
import ProblemsContextProvider from "@/src/app/what-to-discard-problems/contexts/ProblemsContextProvider";
import ErrorPage from "@/src/components/errors/ErrorPage";
import { WhatToDiscardProblemsDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";

export default async function ProblemsSection() {
  const client = getClient();

  const { data: problemsData, error } = await client.query({
    query: WhatToDiscardProblemsDocument,
    variables: {
      first: 3,
    },
  });

  if (error) return <ErrorPage message={error.message} />;

  const initialProblems = problemsData.whatToDiscardProblems.edges.map(edge => edge.node);
  const pageInfo = problemsData.whatToDiscardProblems.pageInfo;

  return (
    <ProblemsContextProvider initialProblems={initialProblems} initialPageInfo={pageInfo}>
      <ProblemClientSection />
    </ProblemsContextProvider>
  );
}
