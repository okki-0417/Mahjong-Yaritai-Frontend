import { Button, Container, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiClient } from "../../../lib/apiClients/ApiClients";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ProfileEditForm from "../../../features/users/:id/ProfileEditForm";
import useMyUserId from "../../../hooks/useMyUserId";
import { EditIcon } from "@chakra-ui/icons";
import Profile from "../../../features/users/:id/Profile";

type FetchState = {
  state: "loading" | "fulfilled" | "rejected";
};

export type UserType = {
  name: string;
  avatar_url: string;
};

export default function UserShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const myUserId = useMyUserId();

  const [fetchState, setFetchState] = useState<FetchState>({
    state: "loading",
  });
  const [user, setUser] = useState<UserType | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditable, setIsEditable] = useState(Number(id) == myUserId);

  useEffect(() => {
    setIsEditable(Number(id) == myUserId);
  }, [myUserId]);

  useEffect(() => {
    if (fetchState.state != "loading") return;

    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/users/${id}`, {
          signal: controller.signal,
        });
        setUser(response.data.user);
        setFetchState({ state: "fulfilled" });
      } catch (error) {
        setFetchState({ state: "rejected" });

        if (axios.isAxiosError(error)) {
          navigate("/404");
        }
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [fetchState]);

  return (
    <Container mt="40" maxW="xl">
      <VStack gap="3" position="relative" alignItems="center">
        {isEditable && (
          <Button
            colorScheme={isEditMode ? "pink" : "whiteAlpha"}
            position="absolute"
            right="0"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <EditIcon />
          </Button>
        )}

        {isEditMode && isEditable ? (
          <ProfileEditForm
            user={user}
            setUser={setUser}
            setIsEditMode={setIsEditMode}
          />
        ) : (
          <Profile user={user} />
        )}
      </VStack>
    </Container>
  );
}
