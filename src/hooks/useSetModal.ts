import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";

export const useSetModal = () => {
  const { setModalName } = useContext(ModalContext);

  return setModalName;
};
