import { ReactNode } from "react";

export default function AccordionCardBig({
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
      className={`${opened ? "max-h-[1000px]" : "max-h-28"} ${bgColor} rounded-lg transition-all p-2 overflow-hidden`}>
      <button type="button" className="h-24 rounded-lg w-full inline-block" onClick={handleClick}>
        <div className="text-center text-3xl">{text}</div>
      </button>

      {children}
    </div>
  );
}
