export type WhatToDiscardProblem = {
  id: number;
  user: User;
  round: number;
  turn: number;
  wind: number;
  point_east: number;
  point_south: number;
  point_west: number;
  point_north: number;
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
  likes_count: number;
  comments_count: number;
  votes_count: number;
  created_at: string;
  updated_at: string;
};

export type Tile = {
  id: number;
  suit: string;
  ordinal_number_in_suit: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: number;
  name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};
