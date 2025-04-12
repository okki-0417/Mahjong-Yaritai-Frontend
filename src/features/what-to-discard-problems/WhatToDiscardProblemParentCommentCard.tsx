import { WhatToDiscardProblemParentComment } from "./WhatToDiscardProblemCommentList";
import CommentCard from "../../components/CommentCard";

export default function WhatToDiscardProblemParentCommentCard({
  comment,
}: {
  comment: WhatToDiscardProblemParentComment;
}) {
  return (
    <div>
      <CommentCard
        user_id={comment.user.id}
        user_name={comment.user.name}
        created_at={comment.created_at}
        content={comment.content}
      />

      {comment.replies.map((reply, index) => {
        return (
          <div className="pl-4" key={index}>
            <div className="flex lg:gap-4 gap-1">
              <div className="w-1 min-h-full bg-gray-400 rounded-full my-2"></div>
              <CommentCard
                user_id={reply.user.id}
                user_name={reply.user.name}
                created_at={reply.created_at}
                content={reply.content}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
