import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const createAuthRequest_Body = z
  .object({ auth_request: z.object({ email: z.string().max(64) }).passthrough() })
  .passthrough();
const createAuthVerification_Body = z
  .object({ auth_verification: z.object({ token: z.string() }).passthrough() })
  .passthrough();
const User = z
  .object({
    id: z.number().int(),
    name: z.string(),
    avatar_url: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const Errors = z.array(z.object({ message: z.string() }).passthrough());
const Session = z
  .object({ is_logged_in: z.boolean(), user_id: z.number().int().nullable() })
  .passthrough();
const createSession_Body = z
  .object({ session: z.object({ email: z.string(), password: z.string() }).passthrough() })
  .passthrough();
const createUser_Body = z
  .object({
    user: z
      .object({
        name: z.string().max(20),
        avatar: z.instanceof(File),
        password: z.string().optional(),
        password_confirmation: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough();
const updateUser_Body = z
  .object({ name: z.string().max(20), avatar: z.instanceof(File).nullable() })
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
  .object({
    tile_id: z.number().int(),
    count: z.number().int(),
    is_voted_bys_me: z.boolean().optional(),
  })
  .passthrough();
const WhatToDiscardProblem = z
  .object({
    id: z.number().int(),
    user: User,
    round: z.string(),
    turn: z.number().int(),
    wind: z.string(),
    point_east: z.number().int(),
    point_south: z.number().int(),
    point_west: z.number().int(),
    point_north: z.number().int(),
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
    comments_count: z.number().int(),
    likes_count: z.number().int(),
    votes_count: z.number().int(),
    is_liked_by_me: z.boolean(),
    my_vote_tile_id: z.number().int().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const CursorPagination = z
  .object({ next: z.number().int().nullish(), has_next: z.boolean(), limit: z.number().int() })
  .passthrough();
const createWhatToDiscardProblem_Body = z
  .object({
    what_to_discard_problem: z
      .object({
        round: z.string().min(2).max(2),
        turn: z.string(),
        wind: z.string().min(1).max(1),
        dora_id: z.string(),
        point_east: z.string(),
        point_south: z.string(),
        point_west: z.string(),
        point_north: z.string(),
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
      })
      .passthrough(),
  })
  .passthrough();

export const schemas = {
  createAuthRequest_Body,
  createAuthVerification_Body,
  User,
  Errors,
  Session,
  createSession_Body,
  createUser_Body,
  updateUser_Body,
  Comment,
  createComment_Body,
  Like,
  Tile,
  WhatToDiscardProblemVote,
  createWhatToDiscardProblemMyVote_Body,
  WhatToDiscardProblemVoteResult,
  WhatToDiscardProblem,
  CursorPagination,
  createWhatToDiscardProblem_Body,
};

const endpoints = makeApi([
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
    path: "/session",
    alias: "createSession",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createSession_Body,
      },
    ],
    response: z.object({ session: Session }).passthrough(),
    errors: [
      {
        status: 403,
        description: `forbidden`,
        schema: z.object({ errors: Errors }).passthrough(),
      },
      {
        status: 422,
        description: `unprocessable_entity`,
        schema: z.object({ errors: Errors }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/users",
    alias: "createUser",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createUser_Body,
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
    method: "put",
    path: "/users/:id",
    alias: "updateUser",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: updateUser_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
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
      .object({
        what_to_discard_problems: z.array(WhatToDiscardProblem),
        meta: z.object({ cursor: CursorPagination }).partial().passthrough(),
      })
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
