import { z } from "zod";

const isEmptyValue = (data: any): boolean => {
  return data === null || data === undefined || data === "";
};

export const customDefaultErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (isEmptyValue(ctx.data)) {
    // Check if the field is nullable by looking at the issue
    if (issue.code === z.ZodIssueCode.invalid_type && issue.received === "null") {
      // If null is received and it's an invalid_type error, it means null is not allowed
      return { message: "必須項目です" };
    } else if (issue.code !== z.ZodIssueCode.invalid_type) {
      // For other error codes with empty values, show required message
      return { message: "必須項目です" };
    }
    // For invalid_type with empty values that aren't null, continue to switch statement
  }

  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      switch (issue.expected) {
        case "string":
          return { message: "文字列を入力してください" };
        case "number":
          if (ctx.data < 0) return;
          return { message: "数値を入力してください" };
        case "boolean":
          return { message: "真偽値を入力してください" };
        case "array":
          return { message: "配列を入力してください" };
        case "object":
          return { message: "オブジェクトを入力してください" };
        default:
          return { message: "無効な型です" };
      }

    case z.ZodIssueCode.too_small:
      switch (issue.type) {
        case "string":
          return { message: `${issue.minimum}文字以上で入力してください` };
        case "number":
          return { message: `${issue.minimum}以上の値を入力してください` };
        case "array":
          return { message: `${issue.minimum}個以上の項目を選択してください` };
        default:
          return { message: "値が小さすぎます" };
      }

    case z.ZodIssueCode.too_big:
      switch (issue.type) {
        case "string":
          return { message: `${issue.maximum}文字以下で入力してください` };
        case "number":
          return {
            message: `${new Intl.NumberFormat("en-US").format(issue.maximum)}以下の値を入力してください`,
          };
        case "array":
          return { message: `${issue.maximum}個以下の項目を選択してください` };
        default:
          return { message: "値が大きすぎます" };
      }

    case z.ZodIssueCode.invalid_string:
      switch (issue.validation) {
        case "email":
          return { message: "正しいメールアドレスを入力してください" };
        case "url":
          return { message: "正しいURLを入力してください" };
        case "uuid":
          return { message: "正しいUUID形式で入力してください" };
        case "regex":
          return { message: "正しい形式で入力してください" };
        default:
          return { message: "無効な文字列形式です" };
      }

    case z.ZodIssueCode.invalid_literal:
      return { message: `値は "${issue.expected}" である必要があります` };

    case z.ZodIssueCode.unrecognized_keys:
      return { message: "不正なキーが含まれています" };

    case z.ZodIssueCode.invalid_union:
      return { message: "いずれかの条件を満たす必要があります" };

    case z.ZodIssueCode.invalid_enum_value:
      return { message: `無効な値です。有効な値: ${issue.options?.join(", ")}` };

    case z.ZodIssueCode.invalid_arguments:
      return { message: "無効な引数です" };

    case z.ZodIssueCode.invalid_return_type:
      return { message: "無効な戻り値の型です" };

    case z.ZodIssueCode.invalid_date:
      return { message: "正しい日付を入力してください" };

    case z.ZodIssueCode.custom:
      return { message: issue.message || "入力内容に誤りがあります" };

    case z.ZodIssueCode.not_multiple_of:
      return { message: `${issue.multipleOf}の倍数である必要があります` };

    case z.ZodIssueCode.not_finite:
      return { message: "有限数である必要があります" };

    default:
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(customDefaultErrorMap);
