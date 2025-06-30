import { schemas } from "@/src/zodios/api";
import { createContext } from "react";
import { z } from "zod";

type CommentContext = {
  replyToComment: z.infer<typeof schemas.Comment> | null;
  setReplyToComment: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment> | null>>;
  setRepliesFromContext: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.Comment>[] | null>
  >;
  setSetRepliesFromContext: React.Dispatch<
    React.SetStateAction<
      React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>[] | null>>
    >
  >;
};

export const ReplyContext = createContext<CommentContext>({
  replyToComment: null,
  setReplyToComment: () => null,
  setRepliesFromContext: () => null,
  setSetRepliesFromContext: () => null,
});

export default ReplyContext;
