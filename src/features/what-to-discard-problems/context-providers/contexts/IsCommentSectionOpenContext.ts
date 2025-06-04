import { createContext } from "react";

type IsCommentSectionOpenContext = {
  isCommentSectionOpen: boolean;
  setIsCommentSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsCommentSectionOpenContext =
  createContext<IsCommentSectionOpenContext>({
    isCommentSectionOpen: false,
    setIsCommentSectionOpen: () => {},
  });
