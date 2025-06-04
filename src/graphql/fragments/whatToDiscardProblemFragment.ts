import { TILE_FRAGMENT } from "@/src/graphql/fragments/tileFragment";
import { USER_FRAGMENT } from "@/src/graphql/fragments/userFragments";

export const WHAT_TO_DISCARD_PROBLEM_FRAGMENT = `
  ${TILE_FRAGMENT}
  ${USER_FRAGMENT}

  fragment WhatToDiscardProblemFields on WhatToDiscardProblem {
    id
    user {...UserFields}
    round
    turn
    wind
    pointEast
    pointSouth
    pointWest
    pointNorth
    likesCount
    commentsCount
    votesCount
    dora {...TileFields}
    tsumo {...TileFields}
    hand1 {...TileFields}
    hand2 {...TileFields}
    hand3 {...TileFields}
    hand4 {...TileFields}
    hand5 {...TileFields}
    hand6 {...TileFields}
    hand7 {...TileFields}
    hand8 {...TileFields}
    hand9 {...TileFields}
    hand10 {...TileFields}
    hand11 {...TileFields}
    hand12 {...TileFields}
    hand13 {...TileFields}
    myLike {
      id
    }
    myVote {
      id
      tile { ...TileFields }
    }
    createdAt
    updatedAt
  }
`;
