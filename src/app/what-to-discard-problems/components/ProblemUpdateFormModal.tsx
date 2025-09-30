import ProblemUpdateForm from "@/src/app/what-to-discard-problems/components/forms/ProblemUpdateForm";
import { WhatToDiscardProblem } from "@/src/generated/graphql";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ProblemUpdateFormModal({
  isOpen,
  onClose,
  problem,
  setProblems,
}: {
  isOpen: boolean;
  onClose: () => void;
  problem: WhatToDiscardProblem;
  setProblems: React.Dispatch<React.SetStateAction<WhatToDiscardProblem[]>>;
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
        <ModalHeader>何切る問題を編集</ModalHeader>
        <ModalCloseButton onClick={handleFormClose} />
        <ModalBody>
          <ProblemUpdateForm onClose={onClose} setProblems={setProblems} problem={problem} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
