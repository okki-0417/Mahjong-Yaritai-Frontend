import { Link } from "react-router";
import { WhatToDiscardProblemParentComment } from "./WhatToDiscardProblemCommentList";
import WhatToDiscardProblemReplyCard from "./WhatToDiscardProblemReplyCard";
import LikeButton from "../../../features/what-to-discard-problems/WhatToDiscardProblemLikeButton";

export default function WhatToDiscardProblemParentCommentCard({comment}: {comment: WhatToDiscardProblemParentComment}) {
  return (
    <div>
      <div className="py-3 px-2 font-semibold text-gray-700 border-b border-gray-300">
        <Link
          to={`/users/${comment.user.id}`}
        >
          <div className="flex items-center lg:gap-2 gap-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="https://placehold.jp/150x150.png" className="w-full h-full object-cover" />
            </div>
            <p>{comment.user.name}</p>
          </div>
        </Link>

        <div className="font-sans font-normal text-sm px-1 mt-1">
          {new Date(comment.created_at).toLocaleString()}
        </div>

        <div className="pl-1 mt-2">
          <p>{comment.content}</p>

          <LikeButton />
        </div>
      </div>

      {comment.replies.map((reply, index) => {
        return (
          <WhatToDiscardProblemReplyCard reply={reply} key={index} />
        )
      })}
    </div>
  )
}
