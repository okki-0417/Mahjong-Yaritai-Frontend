import { z } from "zod";

export const MAX_DUPLICATE_TILES_NUM = 4;
export const TOTAL_POINTS = 100000;
export const POINT_UPPER_LIMIT = 200000;

const handFieldNames = [
  "hand1_id",
  "hand2_id",
  "hand3_id",
  "hand4_id",
  "hand5_id",
  "hand6_id",
  "hand7_id",
  "hand8_id",
  "hand9_id",
  "hand10_id",
  "hand11_id",
  "hand12_id",
  "hand13_id",
] as const;

export const tileFieldNames = [...handFieldNames, "dora_id", "tsumo_id"] as const;

export const pointFieldNames = ["point_east", "point_south", "point_west", "point_north"] as const;

// Define base schema to replace the removed schemas import
const baseWhatToDiscardProblemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  round: z.string().optional(),
  turn: z.string().optional(),
  wind: z.string().optional(),
  points: z.number().optional(),
  point_east: z.number().optional(),
  point_south: z.number().optional(),
  point_west: z.number().optional(),
  point_north: z.number().optional(),
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
  dora_id: z.string(),
});

const createWhatToDiscardProblem_Body = z.object({
  what_to_discard_problem: baseWhatToDiscardProblemSchema,
});

/**
 * 牌の重複をチェックする
 * 最大4枚までしか使えない
 */
function validateTileDuplication(inputtedTileIds: number[], ctx: z.RefinementCtx) {
  // 各牌の使用枚数をカウント
  const tileUsage: Record<number, number> = {};

  inputtedTileIds.forEach(tileId => (tileUsage[tileId] = (tileUsage[tileId] || 0) + 1));

  // 5枚以上使用されている牌を検出
  const overusedTileIds = Object.entries(tileUsage)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, count]) => count > MAX_DUPLICATE_TILES_NUM)
    .map(([tileId]) => Number(tileId));

  if (overusedTileIds.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["what_to_discard_problem", "dora_id"],
      message: `同じ牌を ${MAX_DUPLICATE_TILES_NUM + 1} 枚以上使用しています`,
    });
  }
}

/**
 * 手牌の並び順をチェックする
 * 手牌は昇順（萬子→筒子→索子→字牌）に並んでいる必要がある
 */
function validateHandTileOrder(inputtedTileIds: number[], ctx: z.RefinementCtx) {
  for (let i = 1; i < inputtedTileIds.length; i++) {
    if (inputtedTileIds[i] < inputtedTileIds[i - 1]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["what_to_discard_problem", "hand1_id"],
        message: "手牌は昇順に理牌してください（萬子 → 筒子 → 索子 → 字牌の順）",
      });
      break;
    }
  }
}

/**
 * 各プレイヤーの点数上限をチェックする
 * 点数は200,000点を超えてはいけない
 */
function validatePointUpperLimit(
  data: z.infer<typeof createWhatToDiscardProblem_Body>,
  ctx: z.RefinementCtx,
) {
  const point = Number(data.what_to_discard_problem.points);

  if (point !== null && point !== undefined && point > POINT_UPPER_LIMIT) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["what_to_discard_problem", "points"],
      message: `持ち点は${new Intl.NumberFormat("en-US").format(POINT_UPPER_LIMIT)}点以下にしてください`,
    });
  }
}

/**
 * 全プレイヤーの合計点数をチェックする
 * 合計は必ず100,000点になる必要がある
 */
function validatePointSum(
  data: z.infer<typeof createWhatToDiscardProblem_Body>,
  ctx: z.RefinementCtx,
) {
  const pointSum = pointFieldNames.reduce((sum, fieldName) => {
    const point = Number(data.what_to_discard_problem[fieldName]);
    return sum + (point || 0);
  }, 0);

  if (pointSum !== TOTAL_POINTS) {
    // エラーは最初の点数フィールドに表示
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["what_to_discard_problem", "point_east"],
      message: `合計得点が${TOTAL_POINTS}点になるようにしてください`,
    });
  }
}

export const customCreateWhatToDiscardProblem_BodySchema =
  createWhatToDiscardProblem_Body.superRefine((data, ctx) => {
    // 入力された牌IDを抽出（null/undefinedを除外）
    const inputtedTileIds = tileFieldNames
      .map(fieldName => Number(data.what_to_discard_problem[fieldName]))
      .filter(Boolean);

    const inputtedHandTileIds = handFieldNames
      .map(fieldName => Number(data.what_to_discard_problem[fieldName]))
      .filter(Boolean);

    // 牌に関するバリデーション
    validateTileDuplication(inputtedTileIds, ctx);
    validateHandTileOrder(inputtedHandTileIds, ctx);

    // 点数に関するバリデーション
    validatePointUpperLimit(data, ctx);
  });
