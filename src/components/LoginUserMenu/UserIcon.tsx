import { schemas } from "@/src/zodios/api";
import { Image } from "@chakra-ui/react";
import { z } from "zod";

export default function UserIcon({ user }: { user: z.infer<typeof schemas.User> | null }) {
  if (!user) return null;

  return (
    <Image src={user.avatar_url || "/no-image.webp"} alt="" boxSize="12" borderRadius="full" />
  );
}
