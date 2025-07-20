import ClientWithdrawalSummary from "@/src/features/me/withdrawal/ClientWithdrawalSummary";
import createApiPageClient from "@/src/lib/api/server";

export default async function WithdrawalSummary() {
  const apiPageClient = await createApiPageClient();

  const response = await apiPageClient.getWithdrawalSummary();
  const summary = response.withdrawal_summary;

  return <ClientWithdrawalSummary summary={summary} />;
}
