import { User } from "@/src/generated/graphql";
import { Image } from "@chakra-ui/react";

type Props = {
  user: User | null;
};

export default function UserIcon({ user }: Props) {
  if (!user) return null;

  return <Image src={user.avatarUrl || "/no-image.webp"} alt="" boxSize="12" borderRadius="full" />;
}
