import { schemas } from "@/src/zodios/api";
import { Avatar } from "@chakra-ui/react";
import { z } from "zod";

export default function UserIcon({ user }: { user: z.infer<typeof schemas.User> | null }) {
  if (!user) return null;

  return <Avatar name={user.name} src={user.avatar_url} />;
}
