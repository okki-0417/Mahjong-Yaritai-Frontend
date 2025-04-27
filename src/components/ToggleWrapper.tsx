import { ReactNode } from "react";

type ToggleWrapperType = {
  flag: boolean;
  children: ReactNode;
};

export default function ToggleWrapper({ flag, children }: ToggleWrapperType) {
  return (
    <div
      className={`${flag ? "max-h-[9999px]" : "max-h-0"} overflow-hidden duration-200`}
    >
      {children}
    </div>
  );
}
