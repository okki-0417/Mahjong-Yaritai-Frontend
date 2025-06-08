"use client";

import { ModalContext } from "@/src/app/context-providers/contexts/ModalContext";
import NotLoggedInModal from "@/src/components/NotLoggedInModal";
import { useContext } from "react";

export type ModalName = "NotLoggedIn";

export default function ModalProvider() {
	const { modalName } = useContext(ModalContext);

	if (!modalName) return null;

	switch (modalName) {
		case "NotLoggedIn":
			return <NotLoggedInModal />;
		default:
			throw new Error("定義されてないないモーダルを呼び出しています。");
	}
}
