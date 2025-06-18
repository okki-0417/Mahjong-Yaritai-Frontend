"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CommentList from "@/src/features/what-to-discard-problems/components/CommentList";

export type CommentType = {
  content: string;
  parent_comment_id?: string | undefined;
};

export default function CommentsModal({
  isOpen,
  onClose,
  problemId,
}: {
  isOpen: boolean;
  onClose: () => void;
  problemId: number;
}) {
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />

      <ModalContent bgColor="blue.400/40">
        <ModalHeader fontFamily="serif">コメント</ModalHeader>

        <ModalCloseButton className="text-primary" />

        <ModalBody className="text-primary" fontFamily="serif">
          <CommentList problemId={problemId} />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
