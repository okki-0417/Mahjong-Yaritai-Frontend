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
}: {
  isOpen: boolean;
  onClose: () => void;
  problem: WhatToDiscardProblem;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />

      <ModalContent fontFamily="serif">
        <ModalHeader>何切る問題を編集</ModalHeader>

        <ModalCloseButton onClick={onClose} />

        <ModalBody>
          <ProblemUpdateForm onClose={onClose} problem={problem} />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
