import NotLoggedInModal from "./NotLoggedInModal";

export type ModalName = "NotLoggedIn";

export default function ModalProvider({
  modalName,
}: {
  modalName: ModalName | null;
}) {
  if (!modalName) return;

  switch (modalName) {
    case "NotLoggedIn":
      return <NotLoggedInModal />;
    default:
      throw new Error("定義されてないないモーダルを呼び出しています。");
  }
}
