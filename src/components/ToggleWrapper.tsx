import { ReactNode } from "react";

type ToggleWrapperType = {
  flag: boolean;
  heightPx?: number | number[];
  durationMs?: number;
  children: ReactNode;
};

export default function ToggleWrapper({
  flag,
  heightPx = 500,
  durationMs = 200,
  children,
}: ToggleWrapperType) {
  const duration = `duration-[${durationMs}ms]`;

  let heightPC = "";
  let heightSP = "";

  if (Array.isArray(heightPx)) {
    if (heightPx.length >= 3) throw new Error("高さはPCとSP用の2つまでにしてください。");

    heightSP = `max-h-[${heightPx[0]}px]`;
    heightPC = `lg:max-h-[${heightPx[1]}px]`;
  } else {
    heightSP = `max-h-[${heightPx}px]`;
  }

  return (
    <div
      className={`${flag ? `${heightPC} ${heightSP} ` : "max-h-0"} transition-all ease-in-out ${duration} overflow-hidden`}>
      {children}
    </div>
  );
}
