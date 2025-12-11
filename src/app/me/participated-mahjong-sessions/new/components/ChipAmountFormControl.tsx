import { GameSessionFormType } from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { useNumberInput } from "@/src/hooks/useNumberInput";
import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<GameSessionFormType>;
  chipAmountError: FieldErrors<GameSessionFormType>["chipAmount"];
};

export default function ChipAmountFormControl({ register, chipAmountError }: Props) {
  const handleChipAmountInput = useNumberInput({ min: 0, max: 99999 });

  return (
    <HStack as={FormControl} gap="1" w="fit-content" isInvalid={Boolean(chipAmountError)}>
      <FormLabel m="0" htmlFor="chipAmount" fontSize={["sm", "md"]}>
        チップ
      </FormLabel>

      <Input
        {...register("chipAmount", { valueAsNumber: true })}
        display="inline-block"
        size="sm"
        fontSize={["md", "2xl"]}
        type="number"
        w="28"
        pr="1"
        onInput={handleChipAmountInput}
      />
      <FormLabel m="0" htmlFor="chipAmount" fontSize={["sm", "md"]}>
        pt / 1枚
      </FormLabel>
    </HStack>
  );
}
