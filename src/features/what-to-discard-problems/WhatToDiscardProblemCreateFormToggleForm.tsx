import { Dispatch, SetStateAction, useContext, useState } from "react";
import PopButton from "../../components/PopButton";
import ToggleWrapper from "../../components/ToggleWrapper";
import WhatToDiscardProblemForm from "./WhatToDiscardProblemForm";
import { AuthStateContext } from "../../contexts/AuthStateContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";
import { Box } from "@chakra-ui/react";
import { WhatToDiscardProblems } from "../../pages/what-to-discard-problems/page";

export default function WhatToDiscardProblemToggleForm({
  whatToDiscardProblems,
  setWhatToDiscardProblems,
  setNextPage,
}: {
  whatToDiscardProblems: WhatToDiscardProblems;
  setWhatToDiscardProblems: Dispatch<SetStateAction<WhatToDiscardProblems>>;
  setNextPage: Dispatch<SetStateAction<number | null>>;
}) {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const { auth } = useContext(AuthStateContext);
  const { setModalName } = useContext(ModalContext);

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
          <WhatToDiscardProblemForm
            setIsCreateFormOpen={setIsCreateFormOpen}
            whatToDiscardProblems={whatToDiscardProblems}
            setWhatToDiscardProblems={setWhatToDiscardProblems}
            setNextPage={setNextPage}
          />
        </ToggleWrapper>
      </Box>
    </Box>
  );
}
