import { Like } from "@/api-client";

export type Authorization = {
  authorized: boolean;
};

export type WhatToDiscardProblem = {
  id: number;
  user: User;
  round: number;
  turn: number;
  wind: number;
  pointEast: number;
  pointSouth: number;
  pointWest: number;
  pointNorth: number;
  dora: Tile;
  tsumo: Tile;
  hand1: Tile;
  hand2: Tile;
  hand3: Tile;
  hand4: Tile;
  hand5: Tile;
  hand6: Tile;
  hand7: Tile;
  hand8: Tile;
  hand9: Tile;
  hand10: Tile;
  hand11: Tile;
  hand12: Tile;
  hand13: Tile;
  likesCount: number;
  commentsCount: number;
  votesCount: number;
  myLike: Like;
  myVote: ProblemVote;
  createdAt: string;
  updatedAt: string;
};

export type ProblemLike = {
  id: number;
  userId: number;
  whatToDiscardProblemId: number;
  createdAt: string;
  updatedAt: string;
};

export type ProblemVote = {
  id: number;
  user_id: number;
  tile: Tile;
  whatToDiscardProblemId: number;
  created_at: number;
  updated_at: number;
};

export type VoteResultType = {
  tileId: number;
  count: number;
}[];

export type Tile = {
  id: number;
  suit: string;
  ordinalNumberIn_suit: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};
