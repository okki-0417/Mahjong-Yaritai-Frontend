import { useContext } from "react";
import { CountContext } from "./practice";

export const Practice2 = () => {
  // 親コンポーネントで設定した値を受け取る
  const context = useContext(CountContext);

  if (!context) throw new Error("Context is null");

  const { count, setCount } = context;

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => handleClick()}>推してね！</button>
    </div>
  );
};
