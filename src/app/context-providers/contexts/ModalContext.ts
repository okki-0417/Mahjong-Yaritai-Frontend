import { ModalName } from "@/src/components/ModalProvider";
import { createContext } from "react";

type ModalContext = {
  modalName: ModalName | null;
  setModalName: (modalVisible: ModalName | null) => void;
};

export const ModalContext = createContext<ModalContext>({
  modalName: null,
  setModalName: () => {},
});
