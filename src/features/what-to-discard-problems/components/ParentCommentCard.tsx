"use client";

import { Comment, Configuration, WhatToDiscardProblemCommentReplyApi } from "@/api-client";
import { API_BASE_URL } from "@/config/apiConfig";
import UserModal from "@/src/components/Modals/UserModal";
import ReplyContext from "@/src/features/what-to-discard-problems/context-providers/contexts/ReplyContext";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import useMyUserId from "@/src/hooks/useMyUserId";
import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  HStack,
  Img,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineReply } from "react-icons/md";

const apiClient = new WhatToDiscardProblemCommentReplyApi(
  new Configuration({
    basePath: API_BASE_URL,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  }),
);

export default function ParentCommentCard({ comment }: { comment: Comment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMyComment = comment.user.id == useMyUserId();
  const [canFetchReplies, setCanFetchReplies] = useState(false);

  const auth = useIsLoggedIn();

  const [replies, setReplies] = useState<Comment[] | null>(null);

  const { setReplyToComment, setSetRepliesFromContext } = useContext(ReplyContext);

  useEffect(() => {
    if (!canFetchReplies) return;
    setCanFetchReplies(false);

    const fetchReplies = async () => {
      try {
        const response = await apiClient.getReplies({
          whatToDiscardProblemId: String(comment.commentableId),
          commentId: String(comment.id),
        });

        setReplies(response.whatToDiscardProblemCommentReplies);
      } catch (error) {
        console.error("返信fetch:", error);
      }
    };

    fetchReplies();
  }, [canFetchReplies]);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Button bgColor="inherit" h="fit-content" p="0" pr="2" onClick={onOpen}>
          <HStack>
            <Circle size="8" overflow="hidden" border="1px">
              <Img
                src={comment.user.avatarUrl || "/no-image.webp"}
                className="w-full h-full object-cover"
              />
            </Circle>
            <Text fontWeight="bold" color="#365158">
              {comment.user.name}
            </Text>
          </HStack>
        </Button>

        <Box>
          {auth && (
            <Button
              size="sm"
              px="1"
              onClick={() => {
                setReplyToComment(comment);
                setSetRepliesFromContext(setReplies);
              }}
              bgColor="inherit">
              <MdOutlineReply size={18} color="#365158" />
            </Button>
          )}

          {isMyComment && (
            <Button size="sm" px="1" bgColor="inherit">
              <IoMdTrash size={20} color="#365158" />
            </Button>
          )}
        </Box>
      </Flex>

      <Text fontFamily="sans-serif" fontSize="xs" color="#466163">
        {new Date(comment.createdAt).toLocaleString()}
      </Text>

      <Box className="pl-1 mt-2">
        <Text>{comment.content}</Text>

        {/* <LikeButton /> */}
      </Box>

      <Divider mt="8" />

      {comment.repliesCount ? (
        <Flex justifyContent="end">
          <Button
            colorScheme=""
            h="fit-content"
            py="2"
            color="#365158"
            fontSize="sm"
            _hover={{ bgColor: "gray.200" }}>
            返信を見る
          </Button>
        </Flex>
      ) : null}

      {replies?.map(reply => {
        return <Box>{JSON.stringify(reply)}</Box>;
      })}

      <UserModal userId={comment.user.id} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
