import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Session = z
  .object({ is_logged_in: z.boolean(), user_id: z.number().int().nullable() })
  .passthrough();
const createLineCallback_Body = z.object({ code: z.string(), state: z.string() }).passthrough();
const createAuthRequest_Body = z
  .object({ auth_request: z.object({ email: z.string() }).passthrough() })
  .passthrough();
const createAuthVerification_Body = z
  .object({ auth_verification: z.object({ token: z.string() }).passthrough() })
  .passthrough();
const User = z
  .object({
    id: z.number().int(),
    name: z.string(),
    profile_text: z.string().nullish(),
    avatar_url: z.string().nullish(),
    is_following: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const Errors = z.array(z.object({ message: z.string() }).passthrough());
const LearningCategory = z
  .object({
    id: z.number().int(),
    name: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const LearningQuestion = z
  .object({
    id: z.number().int(),
    statement: z.string(),
    answer: z.string(),
    category: LearningCategory,
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const updateUser_Body = z
  .object({
    name: z.string().min(1).max(20),
    profile_text: z.string().max(500).optional(),
    avatar: z.instanceof(File).optional(),
  })
  .passthrough();
const WithdrawalSummary = z
  .object({ what_to_discard_problems_count: z.number().int() })
  .passthrough();
const CursorPagination = z
  .object({ next: z.number().int().nullish(), has_next: z.boolean(), limit: z.number().int() })
  .passthrough();
const Meta = z.object({ cursor: CursorPagination }).passthrough();
const createUser_Body = z
  .object({
    name: z.string().min(1).max(20),
    profile_text: z.string().max(500).optional(),
    avatar: z.instanceof(File),
  })
  .passthrough();
const Comment = z
  .object({
    id: z.number().int(),
    user: User,
    parent_comment_id: z.number().int().nullish(),
    replies_count: z.number().int(),
    commentable_type: z.string(),
    commentable_id: z.number().int(),
    content: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const createComment_Body = z
  .object({
    what_to_discard_problem_comment: z
      .object({ parent_comment_id: z.string().nullable(), content: z.string().max(255) })
      .passthrough(),
  })
  .passthrough();
const Like = z
  .object({
    id: z.number().int(),
    user_id: z.number().int().optional(),
    likable_type: z.string(),
    likable_id: z.number().int(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const Tile = z
  .object({
    id: z.number().int(),
    suit: z.string(),
    ordinal_number_in_suit: z.number().int(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const WhatToDiscardProblemVote = z
  .object({
    id: z.number().int(),
    user_id: z.number().int(),
    what_to_discard_problem_id: z.number().int(),
    tile: Tile,
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const createWhatToDiscardProblemMyVote_Body = z
  .object({
    what_to_discard_problem_my_vote: z.object({ tile_id: z.number().int() }).passthrough(),
  })
  .passthrough();
const WhatToDiscardProblemVoteResult = z
  .object({ tile_id: z.number().int(), count: z.number().int() })
  .passthrough();
const WhatToDiscardProblem = z
  .object({
    id: z.number().int(),
    user: User,
    round: z.string().nullable(),
    turn: z.number().int().nullable(),
    wind: z.string().nullable(),
    points: z.number().int().nullable(),
    dora_id: z.number().int(),
    hand1_id: z.number().int(),
    hand2_id: z.number().int(),
    hand3_id: z.number().int(),
    hand4_id: z.number().int(),
    hand5_id: z.number().int(),
    hand6_id: z.number().int(),
    hand7_id: z.number().int(),
    hand8_id: z.number().int(),
    hand9_id: z.number().int(),
    hand10_id: z.number().int(),
    hand11_id: z.number().int(),
    hand12_id: z.number().int(),
    hand13_id: z.number().int(),
    tsumo_id: z.number().int(),
    description: z.string().nullable(),
    comments_count: z.number().int(),
    likes_count: z.number().int(),
    votes_count: z.number().int(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const createWhatToDiscardProblem_Body = z
  .object({
    what_to_discard_problem: z
      .object({
        round: z.string(),
        turn: z.string(),
        wind: z.string(),
        points: z.string(),
        dora_id: z.string().min(1),
        hand1_id: z.string().min(1),
        hand2_id: z.string().min(1),
        hand3_id: z.string().min(1),
        hand4_id: z.string().min(1),
        hand5_id: z.string().min(1),
        hand6_id: z.string().min(1),
        hand7_id: z.string().min(1),
        hand8_id: z.string().min(1),
        hand9_id: z.string().min(1),
        hand10_id: z.string().min(1),
        hand11_id: z.string().min(1),
        hand12_id: z.string().min(1),
        hand13_id: z.string().min(1),
        tsumo_id: z.string().min(1),
        description: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough();

export const schemas = {
  Session,
  createLineCallback_Body,
  createAuthRequest_Body,
  createAuthVerification_Body,
  User,
  Errors,
  LearningCategory,
  LearningQuestion,
  updateUser_Body,
  WithdrawalSummary,
  CursorPagination,
  Meta,
  createUser_Body,
  Comment,
  createComment_Body,
  Like,
  Tile,
  WhatToDiscardProblemVote,
  createWhatToDiscardProblemMyVote_Body,
  WhatToDiscardProblemVoteResult,
  WhatToDiscardProblem,
  createWhatToDiscardProblem_Body,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/auth/google/callback",
    alias: "createGoogleCallback",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ code: z.string() }).passthrough(),
      },
    ],
    response: z.object({ session: Session }).passthrough(),
    errors: [
      {
        status: 400,
        description: `bad request`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable entity - auth request validation fails`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/auth/line/callback",
    alias: "createLineCallback",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createLineCallback_Body,
      },
    ],
    response: z.object({ session: Session }).passthrough(),
    errors: [
      {
        status: 400,
        description: `bad request - missing code`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable entity - auth request validation fails`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/auth/line/login_url",
    alias: "getLineLoginUrl",
    requestFormat: "json",
    response: z.object({ login_url: z.string() }).passthrough(),
  },
  {
    method: "post",
    path: "/auth/request",
    alias: "createAuthRequest",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createAuthRequest_Body,
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/auth/verification",
    alias: "createAuthVerification",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createAuthVerification_Body,
      },
    ],
    response: z.object({ user: User }).passthrough(),
    errors: [
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.object({ errors: Errors }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/learnings/categories",
    alias: "getLearningCategories",
    requestFormat: "json",
    response: z.object({ learning_categories: z.array(LearningCategory) }).passthrough(),
  },
  {
    method: "get",
    path: "/learnings/categories/:category_id/questions",
    alias: "getLearningQuestions",
    requestFormat: "json",
    parameters: [
      {
        name: "category_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ learning_questions: z.array(LearningQuestion) }).passthrough(),
  },
  {
    method: "get",
    path: "/learnings/categories/:category_id/questions/:id",
    alias: "getLearningQuestion",
    requestFormat: "json",
    parameters: [
      {
        name: "category_id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ learning_question: LearningQuestion }).passthrough(),
  },
  {
    method: "get",
    path: "/learnings/categories/:id",
    alias: "getLearningCategory",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ learning_category: LearningCategory }).passthrough(),
  },
  {
    method: "get",
    path: "/me/profile",
    alias: "getProfile",
    requestFormat: "json",
    response: z.object({ profile: User }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/me/profile",
    alias: "updateUser",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: updateUser_Body,
      },
    ],
    response: z.object({ user: User }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/me/withdrawal",
    alias: "withdrawUser",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/me/withdrawal/summary",
    alias: "getWithdrawalSummary",
    requestFormat: "json",
    response: z.object({ withdrawal_summary: WithdrawalSummary }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.object({ errors: Errors }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/session",
    alias: "getSession",
    requestFormat: "json",
    response: z.object({ session: Session }).passthrough(),
  },
  {
    method: "delete",
    path: "/session",
    alias: "deleteSession",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.object({ errors: Errors }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/users",
    alias: "createUser",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createUser_Body,
      },
    ],
    response: z.object({ user: User }).passthrough(),
    errors: [
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/users/:id",
    alias: "getUser",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ user: User }).passthrough(),
  },
  {
    method: "delete",
    path: "/users/:id",
    alias: "deleteUser",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/users/:user_id/follow",
    alias: "createFollow",
    requestFormat: "json",
    parameters: [
      {
        name: "user_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ message: z.string() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z
          .object({ errors: z.array(z.object({ message: z.string() }).partial().passthrough()) })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `unprocessable entity`,
        schema: z
          .object({ errors: z.array(z.string()) })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: "delete",
    path: "/users/:user_id/follow",
    alias: "deleteFollow",
    requestFormat: "json",
    parameters: [
      {
        name: "user_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ message: z.string() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z
          .object({ errors: z.array(z.object({ message: z.string() }).partial().passthrough()) })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `not found`,
        schema: z
          .object({ errors: z.array(z.string()) })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/users/:user_id/followers",
    alias: "getUserFollowers",
    requestFormat: "json",
    parameters: [
      {
        name: "user_id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "cursor",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.object({ users: z.array(User), meta: Meta }).passthrough(),
  },
  {
    method: "get",
    path: "/users/:user_id/following",
    alias: "getUserFollowing",
    requestFormat: "json",
    parameters: [
      {
        name: "user_id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "cursor",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.object({ users: z.array(User), meta: Meta }).passthrough(),
  },
  {
    method: "get",
    path: "/what_to_discard_problems",
    alias: "getWhatToDiscardProblems",
    requestFormat: "json",
    parameters: [
      {
        name: "cursor",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({ what_to_discard_problems: z.array(WhatToDiscardProblem), meta: Meta })
      .passthrough(),
  },
  {
    method: "post",
    path: "/what_to_discard_problems",
    alias: "createWhatToDiscardProblem",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createWhatToDiscardProblem_Body,
      },
    ],
    response: z.object({ what_to_discard_problem: WhatToDiscardProblem }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/what_to_discard_problems/:id",
    alias: "deleteWhatToDiscardProblem",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/what_to_discard_problems/:id",
    alias: "updateWhatToDiscardProblem",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createWhatToDiscardProblem_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem: WhatToDiscardProblem }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/comments",
    alias: "getComments",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem_comments: z.array(Comment) }).passthrough(),
  },
  {
    method: "post",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/comments",
    alias: "createComment",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createComment_Body,
      },
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem_comment: Comment }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/comments/:comment_id/replies",
    alias: "getWhatToDiscardProblemCommentReplies",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "comment_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem_comment_replies: z.array(Comment) }).passthrough(),
  },
  {
    method: "delete",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/comments/:id",
    alias: "deleteComment",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/likes/my_like",
    alias: "getWhatToDiscardProblemMyLike",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ my_like: Like }).passthrough(),
  },
  {
    method: "post",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/likes/my_like",
    alias: "createWhatToDiscardProblemMyLike",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem_my_like: Like }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/likes/my_like",
    alias: "deleteWhatToDiscardProblemMyLike",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/votes/my_vote",
    alias: "getWhatToDiscardProblemMyVote",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem_my_vote: WhatToDiscardProblemVote }).passthrough(),
  },
  {
    method: "post",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/votes/my_vote",
    alias: "createWhatToDiscardProblemMyVote",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createWhatToDiscardProblemMyVote_Body,
      },
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ what_to_discard_problem_my_vote: WhatToDiscardProblemVote }).passthrough(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/votes/my_vote",
    alias: "deleteWhatToDiscardProblemMyVote",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/what_to_discard_problems/:what_to_discard_problem_id/votes/result",
    alias: "getWhatToDiscardProblemVoteResult",
    requestFormat: "json",
    parameters: [
      {
        name: "what_to_discard_problem_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({ what_to_discard_problem_vote_result: z.array(WhatToDiscardProblemVoteResult) })
      .passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
