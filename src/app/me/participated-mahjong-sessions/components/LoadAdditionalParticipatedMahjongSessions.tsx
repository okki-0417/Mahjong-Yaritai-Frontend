"use client";

import fetchParticipatedMahjongSessions from "@/src/app/me/participated-mahjong-sessions/actions/fetchParticipatedMahjongSessions";
import MahjongSessionCard from "@/src/app/me/participated-mahjong-sessions/components/MahjongSessionCard";
import type { ParticipatedMahjongSessionsQuery } from "@/src/generated/graphql";
import { PageInfo } from "@/src/generated/graphql";
import { Box, UnorderedList, useToast } from "@chakra-ui/react";
import { captureException } from "@sentry/nextjs";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";

type Props = {
  initialPageInfo: PageInfo | null;
};

type Session = ParticipatedMahjongSessionsQuery["participatedMahjongSessions"]["edges"][0]["node"];

export default function LoadAdditionalParticipatedMahjongSessions({ initialPageInfo }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(initialPageInfo);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const toast = useToast();

  const handleEntry = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      if (isPending) return;
      if (!pageInfo?.hasNextPage) return;

      startTransition(async () => {
        try {
          const { mahjongSessions: nextMahjongSessions, pageInfo: newPageInfo } =
            await fetchParticipatedMahjongSessions({ pageInfo });

          if (nextMahjongSessions) {
            setSessions(prevMahjongSessions => [...prevMahjongSessions, ...nextMahjongSessions]);
            setPageInfo(newPageInfo);
          }
        } catch (error) {
          captureException(error);

          toast({
            title: "麻雀セッションを取得できませんでした",
            description: "時間をおいて再度お試しください。",
            status: "error",
          });
        }
      });
    },
    [pageInfo, setSessions, setPageInfo, toast, isPending],
  );

  const observer = useMemo(() => new IntersectionObserver(handleEntry), [handleEntry]);

  useEffect(() => {
    if (!targetRef.current) return null;

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [observer]);

  return (
    <>
      <UnorderedList styleType="none" mx="0" mt="4" mb="8" p="0" spacing="4">
        {sessions.map(session => (
          <MahjongSessionCard key={session.id} mahjongSession={session} />
        ))}
      </UnorderedList>

      <Box ref={targetRef} textAlign="center">
        {pageInfo?.hasNextPage ? "読み込み中..." : "全ての麻雀セッションを読み込みました ✅"}
      </Box>
    </>
  );
}
