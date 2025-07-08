"use client";

import { useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import PopButton from "@/src/components/PopButton";
import ToggleWrapper from "@/src/components/ToggleWrapper";
import ProblemForm from "@/src/features/what-to-discard-problems/components/ProblemForm";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";

export default function ProblemFormToggleButton() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const isLoggedIn = useIsLoggedIn();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box mt={6}>
        <PopButton
          value="＋"
          defaultClassName="btn-circle btn-main"
          onClick={() => {
            if (!isLoggedIn) return onOpen();
            return setIsCreateFormOpen(!isCreateFormOpen);
          }}
        />
      </Box>

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />

      <Box>
        <ToggleWrapper flag={Boolean(isCreateFormOpen)}>
          <ProblemForm setIsCreateFormOpen={setIsCreateFormOpen} />
        </ToggleWrapper>
      </Box>
    </Box>
  );
}
