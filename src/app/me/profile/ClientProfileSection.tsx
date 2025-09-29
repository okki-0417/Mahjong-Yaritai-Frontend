"use client";

import UserProfile from "@/src/components/UserProfile";
import ProfileEditFormGraphQL from "@/src/app/me/profile/ProfileEditFormGraphQL";
import { schemas } from "@/src/zodios/api";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { z } from "zod";

export default function ClientProfileSection({
  initialProfile,
  currentUserId,
}: {
  initialProfile: z.infer<typeof schemas.User>;
  currentUserId?: number | null;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  return (
    <Fragment>
      <Box textAlign="right">
        <Button
          colorScheme={isEditMode ? "pink" : "whiteAlpha"}
          onClick={() => setIsEditMode(!isEditMode)}>
          <EditIcon />
        </Button>
      </Box>

      {isEditMode ? (
        <ProfileEditFormGraphQL setIsEditMode={setIsEditMode} user={profile} setUser={setProfile} />
      ) : (
        <UserProfile user={profile} currentUserId={currentUserId} />
      )}
    </Fragment>
  );
}
