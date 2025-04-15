import { WhatToDiscardProblemParentComment } from "./WhatToDiscardProblemCommentList";
import CommentCard from "../../components/CommentCard";
import WhatToDiscardProblemChildCommentCard from "./WhatToDiscardProblemChildCommentCard";

export default function WhatToDiscardProblemParentCommentCard({
  comment,
  onReply,
}: {
  comment: WhatToDiscardProblemParentComment;
  onReply: (commentId: string) => void;
}) {
  return (
    <div>
      <CommentCard
        comment_id={Number(comment.id)}
        user_id={comment.user.id}
        user_name={comment.user.name}
        created_at={comment.created_at}
        content={comment.content}
        onReply={onReply}
      />

      {comment.replies.map((reply, index) => {
        return (
          <WhatToDiscardProblemChildCommentCard
            key={index}
            parentCommentId={comment.id}
            user_id={reply.user.id}
            user_name={reply.user.name}
            created_at={reply.created_at}
            content={reply.content}
            onReply={onReply}
          />
        );
      })}
    </div>
  );
}
