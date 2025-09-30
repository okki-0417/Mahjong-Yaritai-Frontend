import useErrorToast from "@/src/hooks/useErrorToast";
import { Comment } from "@/src/generated/graphql";
import { Button, Flex } from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client/react";
import { CommentRepliesDocument } from "@/src/generated/graphql";

export default function FetchRepliesButton({
  setReplies,
  comment,
  problemId,
}: {
  setReplies: React.Dispatch<React.SetStateAction<Comment[]>>;
  comment: Comment;
  problemId: string;
}) {
  const errorToast = useErrorToast();

  const [fetchReplies, { loading }] = useLazyQuery(CommentRepliesDocument);

  const handleFetchReplies = async () => {
    if (loading) return;

    try {
      const { data } = await fetchReplies({
        variables: {
          problemId: problemId,
          commentId: String(comment.id),
        },
      });

      if (data?.whatToDiscardProblem?.comments) {
        // Add missing fields to match Comment type
        const completeComments: Comment[] = data.whatToDiscardProblem.comments.map(
          graphqlComment => ({
            ...graphqlComment,
            replies: [],
            updatedAt: graphqlComment.createdAt,
            userId: graphqlComment.user.id,
            user: {
              ...graphqlComment.user,
              createdAt: graphqlComment.createdAt,
              updatedAt: graphqlComment.createdAt,
              followersCount: 0,
              followingCount: 0,
              isFollowing: false,
            },
          }),
        );
        setReplies(completeComments);
      }
    } catch (error) {
      errorToast({ error, title: "返信の取得に失敗しました" });
    }
  };

  return (
    <Flex justifyContent="end">
      <Button
        h="fit-content"
        py="2"
        className="text-primary"
        size="xs"
        onClick={handleFetchReplies}
        isLoading={loading}>
        返信を見る
      </Button>
    </Flex>
  );
}
