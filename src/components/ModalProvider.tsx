import NotLoggedInModal from "./NotLoggedInModal";

export default function ModalProvider({
  modalName,
}: {
  modalName: string | null;
}) {
  switch (modalName) {
    case "NotLoggedIn":
      return <NotLoggedInModal />;
    case null:
      return null;
    default:
      throw new Error("モーダルの呼び出し中にエラーが起きました。");
  }
}
