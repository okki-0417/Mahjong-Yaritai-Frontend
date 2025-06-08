import CommentCard from "@/src/components/CommentCard";

export default function ChildCommentCard({
	parentCommentId,
	user_id,
	user_name,
	created_at,
	content,
	handleReplyClick,
}: {
	parentCommentId: number;
	user_id: number;
	user_name: string;
	created_at: string;
	content: string;
	/* eslint no-unused-vars: 0 */
	handleReplyClick: (ParentCommentId: string) => void;
}) {
	return (
		<div className="pl-4">
			<div className="flex lg:gap-4 gap-1">
				<div className="w-1 min-h-full bg-gray-400 rounded-full my-2"></div>
				<CommentCard
					comment_id={parentCommentId}
					user_id={user_id}
					user_name={user_name}
					created_at={created_at}
					content={content}
					handleReplyClick={handleReplyClick}
				/>
			</div>
		</div>
	);
}
