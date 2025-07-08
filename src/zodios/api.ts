import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const createAuthorizationSession_Body = z
  .object({ authorization_session: z.object({ email: z.string().max(64) }).passthrough() })
  .passthrough();
const createAuthorization_Body = z
  .object({ authorization: z.object({ token: z.string() }).passthrough() })
  .passthrough();
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
const User = z
  .object({
    id: z.number().int(),
    name: z.string(),
    avatar_url: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .passthrough();
const updateUser_Body = z
  .object({ name: z.string().max(20), avatar: z.instanceof(File) })
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
const WhatToDiscardProblem_NoRel = z
  .object({
    id: z.number().int().optional(),
    user_id: z.number().int(),
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
    is_liked_by_me: z.boolean().optional(),
    my_vote_tile_id: z.number().int().nullish(),
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
    user: User,
    what_to_discard_problem: WhatToDiscardProblem_NoRel,
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
const createWhatToDiscardProblem_Body = z
  .object({
    what_to_discard_problem: z
      .object({
        round: z.string(),
        turn: z.number().int(),
        wind: z.string(),
        dora_id: z.number().int(),
        point_east: z.number().int(),
        point_south: z.number().int(),
        point_west: z.number().int(),
        point_north: z.number().int(),
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
      })
      .passthrough(),
  })
  .passthrough();

export const schemas = {
  createAuthorizationSession_Body,
  createAuthorization_Body,
  Session,
  createSession_Body,
  createUser_Body,
  User,
  updateUser_Body,
  Comment,
  createComment_Body,
  Like,
  WhatToDiscardProblem_NoRel,
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
    path: "/authorization",
    alias: "createAuthorization",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createAuthorization_Body,
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
    path: "/authorization_session",
    alias: "createAuthorizationSession",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createAuthorizationSession_Body,
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
        schema: z.void(),
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
        schema: z.void(),
      },
      {
        status: 422,
        description: `successful`,
        schema: z.void(),
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
    response: z
      .object({ what_to_discard_problems: z.array(WhatToDiscardProblem), meta: z.unknown() })
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
