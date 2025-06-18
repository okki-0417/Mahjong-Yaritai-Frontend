import { ReactNode, useState } from "react";

export type ButtonType = "button" | "submit" | "reset";

type PopButtonType = {
  value?: string | ReactNode;
  defaultClassName?: string;
  className?: string;
  onClick?: () => void;
  type?: ButtonType;
  disabled?: boolean;
  children?: ReactNode;
};

export default function PopButton({
  value,
  defaultClassName = "",
  className,
  onClick = () => null,
  type = "button",
  disabled,
  children,
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
      className={`cursor-pointer drop-shadow-accent ${defaultClassName} ${className} ${animate ? "pop" : ""} hover:scale-[102%] transition-all`}
      disabled={disabled}>
      {value}
      {children}
    </button>
  );
}
