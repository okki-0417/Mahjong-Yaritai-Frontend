/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  /** An example field added by the generator */
  testField: Scalars["String"]["output"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  /** Get current user session */
  currentSession: Session;
  /** Get user by ID */
  user?: Maybe<User>;
  /** Get what to discard problems with cursor pagination */
  whatToDiscardProblems: WhatToDiscardProblemConnection;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryWhatToDiscardProblemsArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

/** User session information */
export type Session = {
  __typename?: "Session";
  isLoggedIn: Scalars["Boolean"]["output"];
  user?: Maybe<User>;
  userId?: Maybe<Scalars["Int"]["output"]>;
};

export type User = {
  __typename?: "User";
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["ISO8601DateTime"]["output"];
  id: Scalars["ID"]["output"];
  isFollowing: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  profileText?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["ISO8601DateTime"]["output"];
};

export type WhatToDiscardProblem = {
  __typename?: "WhatToDiscardProblem";
  createdAt: Scalars["ISO8601DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  points?: Maybe<Scalars["String"]["output"]>;
  round?: Maybe<Scalars["String"]["output"]>;
  turn?: Maybe<Scalars["Int"]["output"]>;
  updatedAt: Scalars["ISO8601DateTime"]["output"];
  user: User;
  wind?: Maybe<Scalars["String"]["output"]>;
};

export type WhatToDiscardProblemConnection = {
  __typename?: "WhatToDiscardProblemConnection";
  edges: Array<WhatToDiscardProblemEdge>;
  pageInfo: PageInfo;
};

export type WhatToDiscardProblemEdge = {
  __typename?: "WhatToDiscardProblemEdge";
  cursor: Scalars["String"]["output"];
  node: WhatToDiscardProblem;
};

export type CurrentSessionQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentSessionQuery = {
  __typename?: "Query";
  currentSession: {
    __typename?: "Session";
    isLoggedIn: boolean;
    userId?: number | null;
    user?: { __typename?: "User"; id: string; name: string; avatarUrl?: string | null } | null;
  };
};

export const CurrentSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CurrentSession" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentSession" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isLoggedIn" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CurrentSessionQuery, CurrentSessionQueryVariables>;
