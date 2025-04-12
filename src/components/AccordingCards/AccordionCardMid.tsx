import { ReactNode } from "react";

export default function AccordionCardMid({
  opened,
  bgColor,
  handleClick,
  text,
  children,
}: {
  opened: boolean;
  bgColor: string;
  handleClick: () => void;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`${opened ? "max-h-[1000px]" : "max-h-18"} ${bgColor} rounded-lg transition-all p-2 overflow-hidden mt-2`}
    >
      <button
        type="button"
        className="h-14 rounded-lg w-full inline-block"
        onClick={handleClick}
      >
        <div className="text-center text-xl">{text}</div>
      </button>

      {children}
    </div>
  );
}
