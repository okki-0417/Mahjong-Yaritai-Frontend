import { createContext, ReactNode } from "react";
import { Toast, useToast } from "../hooks/useToast";
import { ToastType } from "../components/toast";

type ToastContext = {
  toast: { type: ToastType; message: string } | null;
  setToast: (toast: Toast | null) => void;
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
  const { toast, setToast } = useToast();

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}
