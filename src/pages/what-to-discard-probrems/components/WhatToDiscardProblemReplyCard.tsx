import { Link } from "react-router";
import LikeButton from "../../../features/what-to-discard-problems/WhatToDiscardProblemLikeButton";

export type WhatToDiscardProblemParentCommentReply = {
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
  }
};

export default function WhatToDiscardProblemReplyCard({reply}: {reply: WhatToDiscardProblemParentCommentReply}) {
  return (
    <div className="pl-4">
      <div className="flex lg:gap-4 gap-2 h-fit border-b border-gray-300">
        <div className="w-1 min-h-full bg-gray-400 rounded-full my-2"></div>
        <div className="py-3 px-2 w-full font-semibold text-gray-700">
          <Link
            to={`/users/${reply.user.id}`}
          >
            <div className="flex items-center lg:gap-2 gap-1">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src="https://placehold.jp/150x150.png" className="w-full h-full object-cover" />
              </div>
              <p>{reply.user.name}</p>
            </div>
          </Link>

          <div className="font-sans font-normal text-sm px-1 mt-1">
            {new Date(reply.created_at).toLocaleString()}
          </div>

          <div className="pl-1 mt-2">
            <p>{reply.content}</p>
            <LikeButton />
          </div>
        </div>
      </div>
    </div>
  )
}
