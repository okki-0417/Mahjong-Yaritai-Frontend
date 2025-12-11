import { GameSessionFormType } from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { FormControl, Input } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<GameSessionFormType>;
  errors: FieldErrors<GameSessionFormType>;
};

export default function CreatedDateFormControl({ register, errors }: Props) {
  return (
    <FormControl isInvalid={Boolean(errors.createdDate)}>
      <Input
        fontSize={["2xl", "3xl"]}
        value={new Date().toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {...register("createdDate")}
      />
    </FormControl>
  );
}
