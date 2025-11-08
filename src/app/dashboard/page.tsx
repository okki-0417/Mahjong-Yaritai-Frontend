import ErrorPage from "@/src/components/errors/ErrorPage";
import { CurrentSessionDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import DashboardSection from "@/src/app/dashboard/components/DashboardSection";
import { Suspense } from "react";
import { Container } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const client = getClient();

  try {
    const { data } = await client.query({ query: CurrentSessionDocument });

    if (data.currentSession?.isLoggedIn == false) {
      redirect("/auth/request");
    }

    return (
      <Container maxW="container.md" py={8}>
        <Suspense>
          <DashboardSection user={data.currentSession.user} />
        </Suspense>
      </Container>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    /* eslint-disable-next-line no-console */
    console.error("Dashboard error:", error);
    return <ErrorPage message={error.message} />;
  }
}
