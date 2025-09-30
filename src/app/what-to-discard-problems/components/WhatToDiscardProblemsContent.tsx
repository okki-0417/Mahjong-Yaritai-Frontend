"use client";

import { GraphQLSessionProvider } from "@/src/app/what-to-discard-problems/context-providers/GraphQLSessionProvider";
import ProblemsSectionWithGraphQL from "@/src/app/what-to-discard-problems/components/ProblemsSectionWithGraphQL";
import WhatToDiscardProblemsSideNavigation from "@/src/app/what-to-discard-problems/components/WhatToDiscardProblemsSideNavigation";

export default function WhatToDiscardProblemsContent() {
  return (
    <GraphQLSessionProvider>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-3 items-start justify-items-end">
        <div className="w-full lg:col-span-1">
          <div className="sticky left-20 top-20 w-full ">
            <WhatToDiscardProblemsSideNavigation />
          </div>
        </div>

        <div className="max-w-4xl mx-auto lg:col-span-2">
          <ProblemsSectionWithGraphQL />
        </div>

        <div className="lg:col-span-1">
          <div className="hidden lg:flex justify-start">
            {/* 将来的に他の関連コンテンツを配置予定 */}
          </div>
        </div>
      </div>
    </GraphQLSessionProvider>
  );
}
