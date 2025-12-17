"use client";

import fetchMutualFollowersAction, {
  FetchMutualFollowersActionResponse,
} from "@/src/app/me/participated-mahjong-sessions/new/actions/fetchMutualFollowersAction";
import LoadMoreMutualFollowers from "@/src/app/me/participated-mahjong-sessions/new/components/LoadMoreMutualFollowers";
import ParticipantUserCard from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipantUserCard";
import Fallback from "@/src/components/fallbacks/Fallback";
import { UnorderedList, useToast, VStack } from "@chakra-ui/react";
import { captureException } from "@sentry/nextjs";
import { useEffect, useState, useTransition } from "react";

type Props = {
  participantUserIndex: number;
  onClose: () => void;
};

export default function ParticipantUserSelection({ participantUserIndex, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const [mutualFollowers, setMutualFollowers] = useState<
    FetchMutualFollowersActionResponse["mutualFollowersData"]
  >([]);
  const [pageInfo, setPageInfo] = useState<
    FetchMutualFollowersActionResponse["pageInfoData"] | null
  >(null);

  const toast = useToast();

  useEffect(() => {
    const fetchMutualFollowers = () => {
      startTransition(async () => {
        try {
          const { mutualFollowersData, pageInfoData } = await fetchMutualFollowersAction({
            pageInfo: null,
          });
          setMutualFollowers(mutualFollowersData);
          setPageInfo(pageInfoData);
        } catch (error) {
          toast({
            title: "相互フォロワーの取得に失敗しました",
            status: "error",
            description: error instanceof Error ? error.message : "不明なエラーが発生しました",
          });
          captureException(error);
        }
      });
    };

    fetchMutualFollowers();
  }, [toast]);

  return (
    <UnorderedList listStyleType="none" marginInlineStart="0">
      {isPending ? (
        <Fallback />
      ) : (
        <VStack align="stretch" gap="1">
          {mutualFollowers.map(user => (
            <ParticipantUserCard
              key={user.id}
              user={user}
              participantUserIndex={participantUserIndex}
              onClose={onClose}
            />
          ))}
          {pageInfo && pageInfo.hasNextPage && (
            <LoadMoreMutualFollowers
              pageInfo={pageInfo}
              setMutualFollowers={setMutualFollowers}
              setPageInfo={setPageInfo}
            />
          )}
        </VStack>
      )}
    </UnorderedList>
  );
}
