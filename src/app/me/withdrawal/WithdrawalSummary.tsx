import ClientWithdrawalSummary from "@/src/app/me/withdrawal/ClientWithdrawalSummary";
import { getClient } from "@/src/lib/apollo/server";
import { WithdrawalSummaryDocument } from "@/src/generated/graphql";

export default async function WithdrawalSummary() {
  const client = getClient();

  await (client as any).query({
    query: WithdrawalSummaryDocument,
  });

  // Note: The current GraphQL schema doesn't provide counts, using placeholder values
  const summary = {
    what_to_discard_problems_count: 0,
    comments_count: 0,
    likes_count: 0,
    votes_count: 0,
  };

  return <ClientWithdrawalSummary summary={summary} />;
}
