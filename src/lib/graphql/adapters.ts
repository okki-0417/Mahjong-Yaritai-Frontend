import { WhatToDiscardProblemQuery, WhatToDiscardProblemsQuery } from "@/src/generated/graphql";

// Define types that match the expected structure
type WhatToDiscardProblemType = {
  id: string;
  round?: string;
  turn?: number;
  wind?: string;
  points?: string;
  description?: string;
  votes_count: number;
  comments_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    avatar_url?: string;
  };
  dora_id: string;
  hand1_id: string;
  hand2_id: string;
  hand3_id: string;
  hand4_id: string;
  hand5_id: string;
  hand6_id: string;
  hand7_id: string;
  hand8_id: string;
  hand9_id: string;
  hand10_id: string;
  hand11_id: string;
  hand12_id: string;
  hand13_id: string;
  tsumo_id: string;
};

export function adaptGraphQLProblemToREST(
  graphqlProblem: NonNullable<WhatToDiscardProblemQuery["whatToDiscardProblem"]>,
): WhatToDiscardProblemType {
  return {
    id: graphqlProblem.id,
    round: graphqlProblem.round || undefined,
    turn: graphqlProblem.turn || undefined,
    wind: graphqlProblem.wind || undefined,
    points: graphqlProblem.points || undefined,
    description: graphqlProblem.description || undefined,
    votes_count: graphqlProblem.votesCount,
    comments_count: graphqlProblem.commentsCount,
    likes_count: graphqlProblem.likesCount,
    created_at: graphqlProblem.createdAt,
    updated_at: graphqlProblem.updatedAt,
    user: {
      id: graphqlProblem.user.id,
      name: graphqlProblem.user.name,
      avatar_url: graphqlProblem.user.avatarUrl || undefined,
    },
    dora_id: graphqlProblem.dora.id,
    hand1_id: graphqlProblem.hand1.id,
    hand2_id: graphqlProblem.hand2.id,
    hand3_id: graphqlProblem.hand3.id,
    hand4_id: graphqlProblem.hand4.id,
    hand5_id: graphqlProblem.hand5.id,
    hand6_id: graphqlProblem.hand6.id,
    hand7_id: graphqlProblem.hand7.id,
    hand8_id: graphqlProblem.hand8.id,
    hand9_id: graphqlProblem.hand9.id,
    hand10_id: graphqlProblem.hand10.id,
    hand11_id: graphqlProblem.hand11.id,
    hand12_id: graphqlProblem.hand12.id,
    hand13_id: graphqlProblem.hand13.id,
    tsumo_id: graphqlProblem.tsumo.id,
  };
}

export function adaptGraphQLProblemListNodeToREST(
  node: WhatToDiscardProblemsQuery["whatToDiscardProblems"]["edges"][0]["node"],
): WhatToDiscardProblemType {
  return {
    id: node.id,
    round: node.round || undefined,
    turn: node.turn || undefined,
    wind: node.wind || undefined,
    points: node.points || undefined,
    description: node.description || undefined,
    votes_count: node.votesCount,
    comments_count: node.commentsCount,
    likes_count: node.likesCount,
    created_at: node.createdAt,
    updated_at: node.updatedAt,
    user: {
      id: node.user.id,
      name: node.user.name,
      avatar_url: node.user.avatarUrl || undefined,
    },
    dora_id: node.doraId?.id,
    hand1_id: node.hand1Id?.id,
    hand2_id: node.hand2Id?.id,
    hand3_id: node.hand3Id?.id,
    hand4_id: node.hand4Id?.id,
    hand5_id: node.hand5Id?.id,
    hand6_id: node.hand6Id?.id,
    hand7_id: node.hand7Id?.id,
    hand8_id: node.hand8Id?.id,
    hand9_id: node.hand9Id?.id,
    hand10_id: node.hand10Id?.id,
    hand11_id: node.hand11Id?.id,
    hand12_id: node.hand12Id?.id,
    hand13_id: node.hand13Id?.id,
    tsumo_id: node.tsumoId?.id,
  };
}
