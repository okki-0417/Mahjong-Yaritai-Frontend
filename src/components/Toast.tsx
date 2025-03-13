import { useState } from "react";

export type ToastType = "error" | "success";

export default function Toast({
  toast,
}: {
  toast: { type: ToastType; message: string } | null;
}) {
  if (!toast) return;

  const [bgColor, setBgColor] = useState<string>("");

  switch (toast.type) {
    case "error":
      setBgColor("bg-red-500");
      break;

    case "success":
      setBgColor("bg-green-400");
      break;

    default:
      setBgColor("");
      break;
  }

  return (
    <div
      className={`${toast ? "opacity-100" : "opacity-0"} duration-500 transition-all`}
    >
      <div
        className={`${bgColor} fixed sm:bottom-6 sm:right-6 bottom-24 right-5 rounded min-w-56 h-16 px-4 text-white flex items-center z-50 drop-shadow text-lg`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
