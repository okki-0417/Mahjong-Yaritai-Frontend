import { z } from "zod";

export const whatToDiscardProblemCommentSchema = z.object({
  parent_comment_id: z.number().optional(),
  content: z.string().min(1, { message: "最低1文字入力してください" }).max(500),
});

export type WhatToDiscardProblemCommentSchemaType = z.infer<
  typeof whatToDiscardProblemCommentSchema
>;
