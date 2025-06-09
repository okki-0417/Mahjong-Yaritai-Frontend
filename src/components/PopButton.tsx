import { ReactNode, useState } from "react";

type PopButtonType = {
  value: string | ReactNode;
  defaultClassName?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function PopButton({
  value,
  defaultClassName = "",
  onClick = () => null,
  type = "button",
  disabled,
}: PopButtonType) {
  const [animate, setAnimate] = useState<boolean>(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    onClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${defaultClassName} ${animate ? "pop" : ""} hover:scale-105`}
      disabled={disabled}>
      {value}
    </button>
  );
}
