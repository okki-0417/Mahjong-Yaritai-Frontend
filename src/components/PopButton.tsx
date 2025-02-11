import { ReactNode, useState } from "react"

export default function PopButton({value, defaultClassName = "", onClick = () => {}}: {value: string | ReactNode, defaultClassName?: string, onClick?: () => any}) {
  const [animate, setAnimate] = useState<boolean>(false)

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${defaultClassName} ${animate ? "pop" : ""}`}
    >
    {value}
    </button>
  )
}
