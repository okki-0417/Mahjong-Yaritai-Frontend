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

export const schemas = {
  Session,
  createLineCallback_Body,
  createAuthRequest_Body,
  createAuthVerification_Body,
  User,
  Errors,
  LearningCategory,
  LearningQuestion,
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
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
