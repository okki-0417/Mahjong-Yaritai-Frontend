"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import { useSetModal } from "@/src/hooks/useSetModal";
import PopButton from "@/src/components/PopButton";
import ToggleWrapper from "@/src/components/ToggleWrapper";
import ProblemForm from "@/src/features/what-to-discard-problems/components/ProblemForm";

export default function ProblemFormToggleButton() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const auth = useIsLoggedIn();
  const setModalName = useSetModal();

  return (
    <Box>
      <Box mt={6}>
        <PopButton
          value="＋"
          defaultClassName="btn-circle btn-main"
          onClick={() => {
            if (!auth) {
              setModalName("NotLoggedIn");
              return;
            }
            setIsCreateFormOpen(!isCreateFormOpen);
          }}
        />
      </Box>

      <Box>
        <ToggleWrapper flag={!!isCreateFormOpen}>
          <ProblemForm setIsCreateFormOpen={setIsCreateFormOpen} />
        </ToggleWrapper>
      </Box>
    </Box>
  );
}
