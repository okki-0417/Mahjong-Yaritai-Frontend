import { createContext } from "react";

type CommentsCountContext = {
  commentsCount: number;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CommentsCountContext = createContext<CommentsCountContext>({
  commentsCount: 0,
  setCommentsCount: () => {},
});
