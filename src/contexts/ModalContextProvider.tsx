"use client";

import { createContext, ReactNode, useState } from "react";
import { ModalName } from "../components/ModalProvider";

type ModalContext = {
  modalName: ModalName | null;
  setModalName: (modalVisible: ModalName | null) => void;
};

export const ModalContext = createContext<ModalContext>({
  modalName: null,
  setModalName: () => {},
});

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [modalName, setModalName] = useState<ModalName | null>(null);

  return (
    <ModalContext.Provider value={{ modalName, setModalName }}>
      {children}
    </ModalContext.Provider>
  );
}
