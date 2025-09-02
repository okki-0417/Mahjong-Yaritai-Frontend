import ProblemCreateForm from "@/src/features/what-to-discard-problems/components/forms/ProblemCreateForm";
import { schemas } from "@/src/zodios/api";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { z } from "zod";

export default function ProblemCreateFormModal({
  isOpen,
  onClose,
  setProblems,
}: {
  isOpen: boolean;
  onClose: () => void;
  setProblems: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.createWhatToDiscardProblem_Body>[]>
  >;
}) {
  const handleFormClose = () => {
    const isConfirmed = window.confirm("フォームを閉じますか？入力内容は保存されません。");

    if (isConfirmed) onClose();
  };

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent fontFamily="serif">
        <ModalHeader>何切る問題を作成</ModalHeader>
        <ModalCloseButton onClick={handleFormClose} />
        <ModalBody>
          <ProblemCreateForm onClose={onClose} setProblems={setProblems} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
