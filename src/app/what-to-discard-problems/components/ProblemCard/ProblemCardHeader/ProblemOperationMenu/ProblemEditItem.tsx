"use client";

import ProblemUpdateFormModal from "@/src/app/what-to-discard-problems/components/ProblemUpdateFormModal";
import { WhatToDiscardProblem } from "@/src/generated/graphql";
import { MenuItem, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { FiEdit3 } from "react-icons/fi";

type Props = {
  problem: WhatToDiscardProblem;
};

export default function ProblemEditItem({ problem }: Props) {
  const {
    isOpen: isUpdateFormOpen,
    onOpen: onUpdateFormOpen,
    onClose: onUpdateFormClose,
  } = useDisclosure();

  return (
    <Fragment>
      <MenuItem icon={<FiEdit3 size={18} color="black" />} onClick={onUpdateFormOpen}>
        <span className="text-primary">編集する</span>
      </MenuItem>

      <ProblemUpdateFormModal
        isOpen={isUpdateFormOpen}
        onClose={onUpdateFormClose}
        problem={problem}
      />
    </Fragment>
  );
}
