import { GameSessionFormType } from "@/src/app/me/participated-mahjong-sessions/new/components/ParticipatedMahjongSessionForm";
import { useNumberInput } from "@/src/hooks/useNumberInput";
import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<GameSessionFormType>;
  rateError: FieldErrors<GameSessionFormType>["rate"];
};

export default function RateFormControl({ register, rateError }: Props) {
  const handleRateInput = useNumberInput({ min: 0, max: 99999 });

  return (
    <HStack
      as={FormControl}
      align="baseline"
      gap="1"
      isInvalid={Boolean(rateError)}
      w="fit-content">
      <FormLabel m="0" htmlFor="rate" fontSize={["sm", "md"]}>
        レート
      </FormLabel>

      <Input
        {...register("rate", { valueAsNumber: true })}
        type="number"
        size="sm"
        display="inline-block"
        fontSize={["md", "2xl"]}
        w="28"
        pr="1"
        onInput={handleRateInput}
      />
      <FormLabel m="0" htmlFor="rate" fontSize={["sm", "md"]}>
        pt / 1000点
      </FormLabel>
    </HStack>
  );
}
