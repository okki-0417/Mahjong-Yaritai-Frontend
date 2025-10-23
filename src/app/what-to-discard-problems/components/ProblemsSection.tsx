import ProblemCard from "@/src/app/what-to-discard-problems/components/ProblemCard";
import WhatToDiscardProblemsSideNavigation from "@/src/app/what-to-discard-problems/components/WhatToDiscardProblemsSideNavigation";
import { CurrentSessionDocument, WhatToDiscardProblemsDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";

export default async function ProblemsSection() {
  const client = getClient();

  const { data: sessionData } = await client.query({
    query: CurrentSessionDocument,
  });

  const { data: problemsData } = await client.query({
    query: WhatToDiscardProblemsDocument,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-3 items-start justify-items-end">
      <div className="w-full lg:col-span-1">
        <div className="sticky left-20 top-20 w-full ">
          <WhatToDiscardProblemsSideNavigation isLoggedIn={sessionData.currentSession.isLoggedIn} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto lg:col-span-2 flex flex-col gap-6">
        {problemsData.whatToDiscardProblems.edges.map((edge, index) => (
          <ProblemCard
            key={index}
            initialProblem={edge.node}
            isLoggedIn={sessionData.currentSession.isLoggedIn}
          />
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="hidden lg:flex justify-start">
          {/* 将来的に他の関連コンテンツを配置予定 */}
        </div>
      </div>
    </div>
  );
}
