import { Comment } from "@/api-client";
import { createContext } from "react";

type CommentContext = {
  replyToComment: Comment | null;
  setReplyToComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  setRepliesFromContext: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  setSetRepliesFromContext: React.Dispatch<
    React.SetStateAction<React.Dispatch<React.SetStateAction<Comment[] | null>>>
  >;
};

export const ReplyContext = createContext<CommentContext>({
  replyToComment: null,
  setReplyToComment: () => null,
  setRepliesFromContext: () => null,
  setSetRepliesFromContext: () => null,
});

export default ReplyContext;
