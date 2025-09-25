import { WhatToDiscardProblemQuery, WhatToDiscardProblemsQuery } from "@/src/generated/graphql";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";

export function adaptGraphQLProblemToREST(
  graphqlProblem: NonNullable<WhatToDiscardProblemQuery["whatToDiscardProblem"]>,
): z.infer<typeof schemas.WhatToDiscardProblem> {
  return {
    id: Number(graphqlProblem.id),
    round: graphqlProblem.round || undefined,
    turn: graphqlProblem.turn || undefined,
    wind: graphqlProblem.wind || undefined,
    points: graphqlProblem.points ? Number(graphqlProblem.points) : undefined,
    description: graphqlProblem.description || undefined,
    votes_count: graphqlProblem.votesCount,
    comments_count: graphqlProblem.commentsCount,
    likes_count: graphqlProblem.likesCount,
    created_at: graphqlProblem.createdAt,
    updated_at: graphqlProblem.updatedAt,
    user: {
      id: Number(graphqlProblem.user.id),
      name: graphqlProblem.user.name,
      avatar_url: graphqlProblem.user.avatarUrl || undefined,
    },
    dora_id: Number(graphqlProblem.dora.id),
    hand1_id: Number(graphqlProblem.hand1.id),
    hand2_id: Number(graphqlProblem.hand2.id),
    hand3_id: Number(graphqlProblem.hand3.id),
    hand4_id: Number(graphqlProblem.hand4.id),
    hand5_id: Number(graphqlProblem.hand5.id),
    hand6_id: Number(graphqlProblem.hand6.id),
    hand7_id: Number(graphqlProblem.hand7.id),
    hand8_id: Number(graphqlProblem.hand8.id),
    hand9_id: Number(graphqlProblem.hand9.id),
    hand10_id: Number(graphqlProblem.hand10.id),
    hand11_id: Number(graphqlProblem.hand11.id),
    hand12_id: Number(graphqlProblem.hand12.id),
    hand13_id: Number(graphqlProblem.hand13.id),
    tsumo_id: Number(graphqlProblem.tsumo.id),
  };
}

export function adaptGraphQLProblemListNodeToREST(
  node: WhatToDiscardProblemsQuery["whatToDiscardProblems"]["edges"][0]["node"],
): z.infer<typeof schemas.WhatToDiscardProblem> {
  return {
    id: Number(node.id),
    round: node.round || undefined,
    turn: node.turn || undefined,
    wind: node.wind || undefined,
    points: node.points ? Number(node.points) : undefined,
    description: node.description || undefined,
    votes_count: node.votesCount,
    comments_count: node.commentsCount,
    likes_count: node.likesCount,
    created_at: node.createdAt,
    updated_at: node.updatedAt,
    user: {
      id: Number(node.user.id),
      name: node.user.name,
      avatar_url: node.user.avatarUrl || undefined,
    },
    dora_id: Number(node.doraId.id),
    hand1_id: Number(node.hand1Id.id),
    hand2_id: Number(node.hand2Id.id),
    hand3_id: Number(node.hand3Id.id),
    hand4_id: Number(node.hand4Id.id),
    hand5_id: Number(node.hand5Id.id),
    hand6_id: Number(node.hand6Id.id),
    hand7_id: Number(node.hand7Id.id),
    hand8_id: Number(node.hand8Id.id),
    hand9_id: Number(node.hand9Id.id),
    hand10_id: Number(node.hand10Id.id),
    hand11_id: Number(node.hand11Id.id),
    hand12_id: Number(node.hand12Id.id),
    hand13_id: Number(node.hand13Id.id),
    tsumo_id: Number(node.tsumoId.id),
  };
}
