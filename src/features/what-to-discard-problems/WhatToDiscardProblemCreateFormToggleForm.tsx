"use client";

import { useState } from "react";
import PopButton from "../../components/PopButton";
import ToggleWrapper from "../../components/ToggleWrapper";
import WhatToDiscardProblemForm from "./WhatToDiscardProblemForm";
import { Box } from "@chakra-ui/react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";

export default function WhatToDiscardProblemToggleForm() {
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
          <WhatToDiscardProblemForm setIsCreateFormOpen={setIsCreateFormOpen} />
        </ToggleWrapper>
      </Box>
    </Box>
  );
}
