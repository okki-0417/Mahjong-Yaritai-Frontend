import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContextProvider";

export const useSetToast = () => {
  const { setToast } = useContext(ToastContext);

  return setToast;
};
