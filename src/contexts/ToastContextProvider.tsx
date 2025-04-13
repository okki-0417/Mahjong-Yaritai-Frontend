import { createContext, ReactNode, useState } from "react";
import { ToastType } from "../components/Toast";

type ToastContext = {
  toast: ToastType | null;
  setToast: (toast: ToastType | null) => void;
};

export const ToastContext = createContext<ToastContext>({
  toast: null,
  setToast: () => {},
});

export default function ToastContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toast, setToast] = useState<ToastType | null>(null);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}
