import React, { createContext, useState } from "react";
import { Practice2 } from "./practice2";

type ContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
} | null;

// Contextの作成
export const CountContext = createContext<ContextType>(null);

export const Practice = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <CountContext.Provider value={{ count, setCount }}>
        <Practice2 />
      </CountContext.Provider>
    </div>
  );
};

export default Practice;
