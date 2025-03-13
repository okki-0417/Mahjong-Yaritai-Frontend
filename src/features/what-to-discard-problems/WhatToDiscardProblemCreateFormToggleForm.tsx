import { useContext, useEffect, useState } from "react";
import PopButton from "../../components/PopButton";
import ToggleWrapper from "../../components/ToggleWrapper";
import WhatToDiscardProblemForm from "./WhatToDiscardProblemForm";
import { AuthStateContext } from "../../contexts/AuthStateContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";

export default function WhatToDiscardProblemToggleForm() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean | null>(
    null
  );

  const { auth } = useContext(AuthStateContext);
  const { setModalName } = useContext(ModalContext);

  useEffect(() => {
    if (
      isCreateFormOpen === null &&
      localStorage.getItem("isCreateFormOpen") === "open"
    ) {
      setIsCreateFormOpen(true);
    }

    isCreateFormOpen
      ? localStorage.setItem("isCreateFormOpen", "open")
      : localStorage.removeItem("isCreateFormOpen");
  }, [isCreateFormOpen]);

  return (
    <div>
      <div className="mt-6">
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
      </div>
      <div>
        <ToggleWrapper flag={!!isCreateFormOpen}>
          <WhatToDiscardProblemForm setIsCreateFormOpen={setIsCreateFormOpen} />
        </ToggleWrapper>
      </div>
    </div>
  );
}
