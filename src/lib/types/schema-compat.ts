/**
 * Schema compatibility types - replaces deleted REST API schema types with GraphQL types
 */
import { z } from "zod";
import {
  Comment,
  WhatToDiscardProblem,
  WhatToDiscardProblemVoteResult,
  User,
} from "@/src/generated/graphql";

// Comment form schema compatible with existing form structure
export const createCommentBodySchema = z.object({
  what_to_discard_problem_comment: z.object({
    content: z.string().min(1, "コメントを入力してください"),
    parent_comment_id: z.number().nullable().optional(),
  }),
});

export type CreateCommentBodyType = z.infer<typeof createCommentBodySchema>;

// Export GraphQL types with schema-compatible names
export type CommentType = Comment;
export type WhatToDiscardProblemType = WhatToDiscardProblem;
export type WhatToDiscardProblemVoteResultType = WhatToDiscardProblemVoteResult;
export type UserType = User;

// Pagination types that may be needed
export type CursorPaginationType = {
  hasNextPage: boolean;
  endCursor?: string | null;
};

// Tile type if needed
export type TileType = {
  id: string;
  suit: string;
  ordinalNumberInSuit: number;
};

// Create problem body schema (if needed)
export const createWhatToDiscardProblemBodySchema = z.object({
  what_to_discard_problem: z.object({
    round: z.string().optional(),
    turn: z.string().optional(),
    wind: z.string().optional(),
    points: z.number().optional(),
    description: z.string().optional(),
    hand1_id: z.string(),
    hand2_id: z.string(),
    hand3_id: z.string(),
    hand4_id: z.string(),
    hand5_id: z.string(),
    hand6_id: z.string(),
    hand7_id: z.string(),
    hand8_id: z.string(),
    hand9_id: z.string(),
    hand10_id: z.string(),
    hand11_id: z.string(),
    hand12_id: z.string(),
    hand13_id: z.string(),
    tsumo_id: z.string(),
    dora_id: z.string(),
  }),
});

export type CreateWhatToDiscardProblemBodyType = z.infer<
  typeof createWhatToDiscardProblemBodySchema
>;
