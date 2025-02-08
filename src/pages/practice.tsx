import React, { createContext, useContext, useState } from "react";
import { Practice2 } from "./practice2";
import { CsrfTokenContext } from "../contexts/CsrfTokenContextProvider";

type ContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
} | null;

// Contextの作成
export const CountContext = createContext<ContextType>(null);

export const Practice = () => {
  // const [count, setCount] = useState<number>(0);

  const csrfToken = useContext(CsrfTokenContext);
  if(!csrfToken) return;

  return (
    <div>
      {csrfToken}
    </div>
  );
};

export default Practice;
