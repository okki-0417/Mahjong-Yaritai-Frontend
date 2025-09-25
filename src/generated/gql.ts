/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "query CommentReplies($problemId: ID!, $commentId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    comments(parentCommentId: $commentId, limit: 20) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n  }\n}": typeof types.CommentRepliesDocument;
  "mutation CreateComment($whatToDiscardProblemId: ID!, $content: String!, $parentCommentId: ID) {\n  createComment(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, content: $content, parentCommentId: $parentCommentId}\n  ) {\n    comment {\n      id\n      content\n      userId\n      parentCommentId\n      repliesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}": typeof types.CreateCommentDocument;
  "mutation CreateFollow($userId: ID!) {\n  createFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}": typeof types.CreateFollowDocument;
  "mutation CreateUser($name: String!, $email: String!, $avatar: String) {\n  createUser(input: {name: $name, email: $email, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}": typeof types.CreateUserDocument;
  "mutation CreateWhatToDiscardProblem($title: String!, $description: String, $tileIds: [ID!]!, $doraId: ID) {\n  createWhatToDiscardProblem(\n    input: {title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}": typeof types.CreateWhatToDiscardProblemDocument;
  "mutation CreateWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  createWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}": typeof types.CreateWhatToDiscardProblemLikeDocument;
  "mutation CreateWhatToDiscardProblemVote($whatToDiscardProblemId: ID!, $tileId: ID!) {\n  createWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, tileId: $tileId}\n  ) {\n    vote {\n      id\n      tileId\n      whatToDiscardProblemId\n      userId\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    errors\n  }\n}": typeof types.CreateWhatToDiscardProblemVoteDocument;
  "query CurrentSession {\n  currentSession {\n    isLoggedIn\n    userId\n    user {\n      id\n      name\n      avatarUrl\n    }\n  }\n}": typeof types.CurrentSessionDocument;
  "mutation DeleteComment($commentId: ID!) {\n  deleteComment(input: {commentId: $commentId}) {\n    success\n    errors\n  }\n}": typeof types.DeleteCommentDocument;
  "mutation DeleteFollow($userId: ID!) {\n  deleteFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}": typeof types.DeleteFollowDocument;
  "mutation DeleteWhatToDiscardProblem($id: ID!) {\n  deleteWhatToDiscardProblem(input: {id: $id}) {\n    success\n    errors\n  }\n}": typeof types.DeleteWhatToDiscardProblemDocument;
  "mutation DeleteWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}": typeof types.DeleteWhatToDiscardProblemLikeDocument;
  "mutation DeleteWhatToDiscardProblemVote($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}": typeof types.DeleteWhatToDiscardProblemVoteDocument;
  "query LearningQuestions($learningCategoryId: ID!) {\n  learningQuestions(learningCategoryId: $learningCategoryId) {\n    id\n    questionText\n    answerText\n    createdAt\n    updatedAt\n    learningCategory {\n      id\n      name\n      description\n    }\n  }\n}": typeof types.LearningQuestionsDocument;
  "mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(input: {name: $name, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}": typeof types.UpdateUserDocument;
  "mutation UpdateWhatToDiscardProblem($id: ID!, $title: String, $description: String, $tileIds: [ID!], $doraId: ID) {\n  updateWhatToDiscardProblem(\n    input: {id: $id, title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}": typeof types.UpdateWhatToDiscardProblemDocument;
  "query WhatToDiscardProblem($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n  }\n}": typeof types.WhatToDiscardProblemDocument;
  "query WhatToDiscardProblemDetail($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    isLikedByMe\n    myVote {\n      id\n      tileId\n    }\n    voteResults {\n      tileId\n      count\n      percentage\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    comments(limit: 10) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n      replies(limit: 5) {\n        id\n        content\n        createdAt\n        repliesCount\n        user {\n          id\n          name\n          avatarUrl\n        }\n      }\n    }\n  }\n}": typeof types.WhatToDiscardProblemDetailDocument;
  "query WhatToDiscardProblemVoteResult($problemId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    voteResults {\n      tileId\n      count\n      percentage\n    }\n  }\n}": typeof types.WhatToDiscardProblemVoteResultDocument;
  "query WhatToDiscardProblems($limit: Int, $cursor: String) {\n  whatToDiscardProblems(limit: $limit, cursor: $cursor) {\n    edges {\n      node {\n        id\n        round\n        turn\n        wind\n        points\n        description\n        votesCount\n        commentsCount\n        likesCount\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n          avatarUrl\n        }\n        doraId: dora {\n          id\n        }\n        hand1Id: hand1 {\n          id\n        }\n        hand2Id: hand2 {\n          id\n        }\n        hand3Id: hand3 {\n          id\n        }\n        hand4Id: hand4 {\n          id\n        }\n        hand5Id: hand5 {\n          id\n        }\n        hand6Id: hand6 {\n          id\n        }\n        hand7Id: hand7 {\n          id\n        }\n        hand8Id: hand8 {\n          id\n        }\n        hand9Id: hand9 {\n          id\n        }\n        hand10Id: hand10 {\n          id\n        }\n        hand11Id: hand11 {\n          id\n        }\n        hand12Id: hand12 {\n          id\n        }\n        hand13Id: hand13 {\n          id\n        }\n        tsumoId: tsumo {\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": typeof types.WhatToDiscardProblemsDocument;
  "mutation WithdrawUser {\n  withdrawUser(input: {}) {\n    success\n    errors\n  }\n}": typeof types.WithdrawUserDocument;
};
const documents: Documents = {
  "query CommentReplies($problemId: ID!, $commentId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    comments(parentCommentId: $commentId, limit: 20) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n  }\n}":
    types.CommentRepliesDocument,
  "mutation CreateComment($whatToDiscardProblemId: ID!, $content: String!, $parentCommentId: ID) {\n  createComment(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, content: $content, parentCommentId: $parentCommentId}\n  ) {\n    comment {\n      id\n      content\n      userId\n      parentCommentId\n      repliesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}":
    types.CreateCommentDocument,
  "mutation CreateFollow($userId: ID!) {\n  createFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}":
    types.CreateFollowDocument,
  "mutation CreateUser($name: String!, $email: String!, $avatar: String) {\n  createUser(input: {name: $name, email: $email, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}":
    types.CreateUserDocument,
  "mutation CreateWhatToDiscardProblem($title: String!, $description: String, $tileIds: [ID!]!, $doraId: ID) {\n  createWhatToDiscardProblem(\n    input: {title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}":
    types.CreateWhatToDiscardProblemDocument,
  "mutation CreateWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  createWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}":
    types.CreateWhatToDiscardProblemLikeDocument,
  "mutation CreateWhatToDiscardProblemVote($whatToDiscardProblemId: ID!, $tileId: ID!) {\n  createWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, tileId: $tileId}\n  ) {\n    vote {\n      id\n      tileId\n      whatToDiscardProblemId\n      userId\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    errors\n  }\n}":
    types.CreateWhatToDiscardProblemVoteDocument,
  "query CurrentSession {\n  currentSession {\n    isLoggedIn\n    userId\n    user {\n      id\n      name\n      avatarUrl\n    }\n  }\n}":
    types.CurrentSessionDocument,
  "mutation DeleteComment($commentId: ID!) {\n  deleteComment(input: {commentId: $commentId}) {\n    success\n    errors\n  }\n}":
    types.DeleteCommentDocument,
  "mutation DeleteFollow($userId: ID!) {\n  deleteFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}":
    types.DeleteFollowDocument,
  "mutation DeleteWhatToDiscardProblem($id: ID!) {\n  deleteWhatToDiscardProblem(input: {id: $id}) {\n    success\n    errors\n  }\n}":
    types.DeleteWhatToDiscardProblemDocument,
  "mutation DeleteWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}":
    types.DeleteWhatToDiscardProblemLikeDocument,
  "mutation DeleteWhatToDiscardProblemVote($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}":
    types.DeleteWhatToDiscardProblemVoteDocument,
  "query LearningQuestions($learningCategoryId: ID!) {\n  learningQuestions(learningCategoryId: $learningCategoryId) {\n    id\n    questionText\n    answerText\n    createdAt\n    updatedAt\n    learningCategory {\n      id\n      name\n      description\n    }\n  }\n}":
    types.LearningQuestionsDocument,
  "mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(input: {name: $name, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}":
    types.UpdateUserDocument,
  "mutation UpdateWhatToDiscardProblem($id: ID!, $title: String, $description: String, $tileIds: [ID!], $doraId: ID) {\n  updateWhatToDiscardProblem(\n    input: {id: $id, title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}":
    types.UpdateWhatToDiscardProblemDocument,
  "query WhatToDiscardProblem($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n  }\n}":
    types.WhatToDiscardProblemDocument,
  "query WhatToDiscardProblemDetail($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    isLikedByMe\n    myVote {\n      id\n      tileId\n    }\n    voteResults {\n      tileId\n      count\n      percentage\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    comments(limit: 10) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n      replies(limit: 5) {\n        id\n        content\n        createdAt\n        repliesCount\n        user {\n          id\n          name\n          avatarUrl\n        }\n      }\n    }\n  }\n}":
    types.WhatToDiscardProblemDetailDocument,
  "query WhatToDiscardProblemVoteResult($problemId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    voteResults {\n      tileId\n      count\n      percentage\n    }\n  }\n}":
    types.WhatToDiscardProblemVoteResultDocument,
  "query WhatToDiscardProblems($limit: Int, $cursor: String) {\n  whatToDiscardProblems(limit: $limit, cursor: $cursor) {\n    edges {\n      node {\n        id\n        round\n        turn\n        wind\n        points\n        description\n        votesCount\n        commentsCount\n        likesCount\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n          avatarUrl\n        }\n        doraId: dora {\n          id\n        }\n        hand1Id: hand1 {\n          id\n        }\n        hand2Id: hand2 {\n          id\n        }\n        hand3Id: hand3 {\n          id\n        }\n        hand4Id: hand4 {\n          id\n        }\n        hand5Id: hand5 {\n          id\n        }\n        hand6Id: hand6 {\n          id\n        }\n        hand7Id: hand7 {\n          id\n        }\n        hand8Id: hand8 {\n          id\n        }\n        hand9Id: hand9 {\n          id\n        }\n        hand10Id: hand10 {\n          id\n        }\n        hand11Id: hand11 {\n          id\n        }\n        hand12Id: hand12 {\n          id\n        }\n        hand13Id: hand13 {\n          id\n        }\n        tsumoId: tsumo {\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}":
    types.WhatToDiscardProblemsDocument,
  "mutation WithdrawUser {\n  withdrawUser(input: {}) {\n    success\n    errors\n  }\n}":
    types.WithdrawUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CommentReplies($problemId: ID!, $commentId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    comments(parentCommentId: $commentId, limit: 20) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n  }\n}",
): (typeof documents)["query CommentReplies($problemId: ID!, $commentId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    comments(parentCommentId: $commentId, limit: 20) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateComment($whatToDiscardProblemId: ID!, $content: String!, $parentCommentId: ID) {\n  createComment(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, content: $content, parentCommentId: $parentCommentId}\n  ) {\n    comment {\n      id\n      content\n      userId\n      parentCommentId\n      repliesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}",
): (typeof documents)["mutation CreateComment($whatToDiscardProblemId: ID!, $content: String!, $parentCommentId: ID) {\n  createComment(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, content: $content, parentCommentId: $parentCommentId}\n  ) {\n    comment {\n      id\n      content\n      userId\n      parentCommentId\n      repliesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateFollow($userId: ID!) {\n  createFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation CreateFollow($userId: ID!) {\n  createFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateUser($name: String!, $email: String!, $avatar: String) {\n  createUser(input: {name: $name, email: $email, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}",
): (typeof documents)["mutation CreateUser($name: String!, $email: String!, $avatar: String) {\n  createUser(input: {name: $name, email: $email, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateWhatToDiscardProblem($title: String!, $description: String, $tileIds: [ID!]!, $doraId: ID) {\n  createWhatToDiscardProblem(\n    input: {title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}",
): (typeof documents)["mutation CreateWhatToDiscardProblem($title: String!, $description: String, $tileIds: [ID!]!, $doraId: ID) {\n  createWhatToDiscardProblem(\n    input: {title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      createdAt\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  createWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation CreateWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  createWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateWhatToDiscardProblemVote($whatToDiscardProblemId: ID!, $tileId: ID!) {\n  createWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, tileId: $tileId}\n  ) {\n    vote {\n      id\n      tileId\n      whatToDiscardProblemId\n      userId\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    errors\n  }\n}",
): (typeof documents)["mutation CreateWhatToDiscardProblemVote($whatToDiscardProblemId: ID!, $tileId: ID!) {\n  createWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId, tileId: $tileId}\n  ) {\n    vote {\n      id\n      tileId\n      whatToDiscardProblemId\n      userId\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CurrentSession {\n  currentSession {\n    isLoggedIn\n    userId\n    user {\n      id\n      name\n      avatarUrl\n    }\n  }\n}",
): (typeof documents)["query CurrentSession {\n  currentSession {\n    isLoggedIn\n    userId\n    user {\n      id\n      name\n      avatarUrl\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteComment($commentId: ID!) {\n  deleteComment(input: {commentId: $commentId}) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation DeleteComment($commentId: ID!) {\n  deleteComment(input: {commentId: $commentId}) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteFollow($userId: ID!) {\n  deleteFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation DeleteFollow($userId: ID!) {\n  deleteFollow(input: {userId: $userId}) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteWhatToDiscardProblem($id: ID!) {\n  deleteWhatToDiscardProblem(input: {id: $id}) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation DeleteWhatToDiscardProblem($id: ID!) {\n  deleteWhatToDiscardProblem(input: {id: $id}) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation DeleteWhatToDiscardProblemLike($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemLike(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteWhatToDiscardProblemVote($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation DeleteWhatToDiscardProblemVote($whatToDiscardProblemId: ID!) {\n  deleteWhatToDiscardProblemVote(\n    input: {whatToDiscardProblemId: $whatToDiscardProblemId}\n  ) {\n    success\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query LearningQuestions($learningCategoryId: ID!) {\n  learningQuestions(learningCategoryId: $learningCategoryId) {\n    id\n    questionText\n    answerText\n    createdAt\n    updatedAt\n    learningCategory {\n      id\n      name\n      description\n    }\n  }\n}",
): (typeof documents)["query LearningQuestions($learningCategoryId: ID!) {\n  learningQuestions(learningCategoryId: $learningCategoryId) {\n    id\n    questionText\n    answerText\n    createdAt\n    updatedAt\n    learningCategory {\n      id\n      name\n      description\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(input: {name: $name, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}",
): (typeof documents)["mutation UpdateUser($name: String, $avatar: String) {\n  updateUser(input: {name: $name, avatar: $avatar}) {\n    user {\n      id\n      name\n      avatarUrl\n    }\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation UpdateWhatToDiscardProblem($id: ID!, $title: String, $description: String, $tileIds: [ID!], $doraId: ID) {\n  updateWhatToDiscardProblem(\n    input: {id: $id, title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}",
): (typeof documents)["mutation UpdateWhatToDiscardProblem($id: ID!, $title: String, $description: String, $tileIds: [ID!], $doraId: ID) {\n  updateWhatToDiscardProblem(\n    input: {id: $id, title: $title, description: $description, tileIds: $tileIds, doraId: $doraId}\n  ) {\n    whatToDiscardProblem {\n      id\n      round\n      turn\n      wind\n      points\n      description\n      votesCount\n      commentsCount\n      likesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n    }\n    errors\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query WhatToDiscardProblem($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n  }\n}",
): (typeof documents)["query WhatToDiscardProblem($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query WhatToDiscardProblemDetail($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    isLikedByMe\n    myVote {\n      id\n      tileId\n    }\n    voteResults {\n      tileId\n      count\n      percentage\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    comments(limit: 10) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n      replies(limit: 5) {\n        id\n        content\n        createdAt\n        repliesCount\n        user {\n          id\n          name\n          avatarUrl\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["query WhatToDiscardProblemDetail($id: ID!) {\n  whatToDiscardProblem(id: $id) {\n    id\n    round\n    turn\n    wind\n    points\n    description\n    votesCount\n    commentsCount\n    likesCount\n    createdAt\n    updatedAt\n    user {\n      id\n      name\n      avatarUrl\n    }\n    dora {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand1 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand2 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand3 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand4 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand5 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand6 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand7 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand8 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand9 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand10 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand11 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand12 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    hand13 {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    tsumo {\n      id\n      suit\n      ordinalNumberInSuit\n    }\n    isLikedByMe\n    myVote {\n      id\n      tileId\n    }\n    voteResults {\n      tileId\n      count\n      percentage\n      tile {\n        id\n        suit\n        ordinalNumberInSuit\n      }\n    }\n    comments(limit: 10) {\n      id\n      content\n      createdAt\n      repliesCount\n      user {\n        id\n        name\n        avatarUrl\n      }\n      replies(limit: 5) {\n        id\n        content\n        createdAt\n        repliesCount\n        user {\n          id\n          name\n          avatarUrl\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query WhatToDiscardProblemVoteResult($problemId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    voteResults {\n      tileId\n      count\n      percentage\n    }\n  }\n}",
): (typeof documents)["query WhatToDiscardProblemVoteResult($problemId: ID!) {\n  whatToDiscardProblem(id: $problemId) {\n    id\n    voteResults {\n      tileId\n      count\n      percentage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query WhatToDiscardProblems($limit: Int, $cursor: String) {\n  whatToDiscardProblems(limit: $limit, cursor: $cursor) {\n    edges {\n      node {\n        id\n        round\n        turn\n        wind\n        points\n        description\n        votesCount\n        commentsCount\n        likesCount\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n          avatarUrl\n        }\n        doraId: dora {\n          id\n        }\n        hand1Id: hand1 {\n          id\n        }\n        hand2Id: hand2 {\n          id\n        }\n        hand3Id: hand3 {\n          id\n        }\n        hand4Id: hand4 {\n          id\n        }\n        hand5Id: hand5 {\n          id\n        }\n        hand6Id: hand6 {\n          id\n        }\n        hand7Id: hand7 {\n          id\n        }\n        hand8Id: hand8 {\n          id\n        }\n        hand9Id: hand9 {\n          id\n        }\n        hand10Id: hand10 {\n          id\n        }\n        hand11Id: hand11 {\n          id\n        }\n        hand12Id: hand12 {\n          id\n        }\n        hand13Id: hand13 {\n          id\n        }\n        tsumoId: tsumo {\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}",
): (typeof documents)["query WhatToDiscardProblems($limit: Int, $cursor: String) {\n  whatToDiscardProblems(limit: $limit, cursor: $cursor) {\n    edges {\n      node {\n        id\n        round\n        turn\n        wind\n        points\n        description\n        votesCount\n        commentsCount\n        likesCount\n        createdAt\n        updatedAt\n        user {\n          id\n          name\n          avatarUrl\n        }\n        doraId: dora {\n          id\n        }\n        hand1Id: hand1 {\n          id\n        }\n        hand2Id: hand2 {\n          id\n        }\n        hand3Id: hand3 {\n          id\n        }\n        hand4Id: hand4 {\n          id\n        }\n        hand5Id: hand5 {\n          id\n        }\n        hand6Id: hand6 {\n          id\n        }\n        hand7Id: hand7 {\n          id\n        }\n        hand8Id: hand8 {\n          id\n        }\n        hand9Id: hand9 {\n          id\n        }\n        hand10Id: hand10 {\n          id\n        }\n        hand11Id: hand11 {\n          id\n        }\n        hand12Id: hand12 {\n          id\n        }\n        hand13Id: hand13 {\n          id\n        }\n        tsumoId: tsumo {\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation WithdrawUser {\n  withdrawUser(input: {}) {\n    success\n    errors\n  }\n}",
): (typeof documents)["mutation WithdrawUser {\n  withdrawUser(input: {}) {\n    success\n    errors\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
