"use client";

import { useContext } from "react";
import NotLoggedInModal from "./NotLoggedInModal";
import { ModalContext } from "../app/contexts/ModalContextProvider";

export type ModalName = "NotLoggedIn";

export default function ModalProvider() {
  const { modalName } = useContext(ModalContext);

  if (!modalName) return;

  switch (modalName) {
    case "NotLoggedIn":
      return <NotLoggedInModal />;
    default:
      throw new Error("定義されてないないモーダルを呼び出しています。");
  }
}
