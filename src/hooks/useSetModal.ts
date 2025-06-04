import { ModalContext } from "@/src/app/context-providers/contexts/ModalContext";
import { useContext } from "react";

export const useSetModal = () => {
  const { setModalName } = useContext(ModalContext);

  return setModalName;
};
