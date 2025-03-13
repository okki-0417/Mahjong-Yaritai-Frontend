import { useEffect, useState } from "react";
import { ToastType } from "../components/Toast";

export type Toast = {
  type: ToastType;
  message: string;
};

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return { toast, setToast };
};
