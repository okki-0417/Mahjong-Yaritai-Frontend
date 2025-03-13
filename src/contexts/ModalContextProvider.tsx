import { createContext, ReactNode, useState } from "react";

type ModalContext = {
  modalName: string | null;
  setModalName: (modalVisible: string | null) => void;
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
  const [modalName, setModalName] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ modalName, setModalName }}>
      {children}
    </ModalContext.Provider>
  );
}
