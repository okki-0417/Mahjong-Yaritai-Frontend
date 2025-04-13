import { useEffect } from "react";
import { useSetToast } from "../hooks/useSetToast";

export type ToastType = {
  type: ToastTypeType;
  message: string;
};

export type ToastTypeType = "error" | "success";

export default function Toast({ toast }: { toast: ToastType | null }) {
  if (!toast) return;

  const setToast = useSetToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const bgColor = provideBgColor(toast.type);

  return (
    <div
      className={`${bgColor} fixed sm:bottom-6 sm:right-6 bottom-24 right-5 rounded min-w-56 h-16 px-4 text-white flex items-center z-50 drop-shadow`}
    >
      <div className="flex items-center text-lg text-center">
        {toast.message}
      </div>
    </div>
  );
}
const provideBgColor = (type: string) => {
  switch (type) {
    case "error":
      return "bg-red-500";

    case "success":
      return "bg-green-400";

    default:
      return "bg-slate-500";
  }
};
