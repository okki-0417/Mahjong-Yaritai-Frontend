import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { z } from "zod";
import { customDefaultErrorMap } from "@/src/zodios/zodErrorMap";

export function useCustomForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>,
) {
  // useFormを呼び出す前にエラーマップを設定
  z.setErrorMap(customDefaultErrorMap);

  return useForm<TFieldValues>(props);
}
