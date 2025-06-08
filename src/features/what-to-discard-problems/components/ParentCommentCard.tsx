import CommentCard from "@/src/components/CommentCard";
import ChildCommentCard from "@/src/features/what-to-discard-problems/components/ChildCommentCard";
import { WhatToDiscardProblemParentComment } from "@/src/features/what-to-discard-problems/components/CommentList";

export default function ParentCommentCard({
	comment,
	handleReplyClick,
}: {
	comment: WhatToDiscardProblemParentComment;
	handleReplyClick: (commentId: string) => void;
}) {
	return (
		<div>
			<CommentCard
				comment_id={Number(comment.id)}
				user_id={comment.user.id}
				user_name={comment.user.name}
				created_at={comment.created_at}
				content={comment.content}
				handleReplyClick={handleReplyClick}
			/>

			{comment.replies.map((reply, index) => {
				return (
					<ChildCommentCard
						key={index}
						parentCommentId={comment.id}
						user_id={reply.user.id}
						user_name={reply.user.name}
						created_at={reply.created_at}
						content={reply.content}
						handleReplyClick={handleReplyClick}
					/>
				);
			})}
		</div>
	);
}
