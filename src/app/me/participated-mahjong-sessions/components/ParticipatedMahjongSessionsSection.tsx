import fetchCurrentSessionAction from "@/src/app/actions/fetchCurrentSessionAction";
import fetchParticipatedMahjongSessions from "@/src/app/me/participated-mahjong-sessions/actions/fetchParticipatedMahjongSessions";
import LoadAdditionalParticipatedMahjongSessions from "@/src/app/me/participated-mahjong-sessions/components/LoadAdditionalParticipatedMahjongSessions";
import MahjongSessionCard from "@/src/app/me/participated-mahjong-sessions/components/MahjongSessionCard";
import ErrorPage from "@/src/components/errors/ErrorPage";
import { UnorderedList } from "@chakra-ui/react";
import { captureException } from "@sentry/nextjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export default async function ParticipatedMahjongSessionsSection() {
  try {
    const session = await fetchCurrentSessionAction();
    if (session.isLoggedIn == false) {
      redirect("/auth/request");
    }

    const { mahjongSessions, pageInfo } = await fetchParticipatedMahjongSessions({
      pageInfo: null,
    });

    return (
      <div>
        <UnorderedList styleType="none" m={0} p={0} spacing={4}>
          {mahjongSessions.map(mahjongSession => (
            <MahjongSessionCard key={mahjongSession.id} mahjongSession={mahjongSession} />
          ))}
        </UnorderedList>

        <LoadAdditionalParticipatedMahjongSessions initialPageInfo={pageInfo} />
      </div>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    /* eslint-disable-next-line no-console */
    console.error("Error fetching participated mahjong sessions:", error);
    captureException(error);

    return <ErrorPage message={error.message} />;
  }
}
