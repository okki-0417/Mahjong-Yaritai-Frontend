"use client";

import { ModalContext } from "@/src/app/context-providers/contexts/ModalContext";
import { ModalName } from "@/src/components/ModalProvider";
import { ReactNode, useState } from "react";

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
