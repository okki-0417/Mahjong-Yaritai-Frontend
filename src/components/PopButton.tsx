import { ReactNode, useState } from "react"

type PopButtonType = {
  value: string | ReactNode;
  defaultClassName?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"
}

export default function PopButton({value, defaultClassName = "", onClick = () => {}, type  = "button"}: PopButtonType) {
  const [animate, setAnimate] = useState<boolean>(false)

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
    >
    {value}
    </button>
  )
}
