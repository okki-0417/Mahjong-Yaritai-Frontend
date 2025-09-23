"use client";

import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import TileImage from "@/src/components/TileImage";
import tileNameById from "@/src/lib/utils/tileNameById";
import PopButton from "@/src/components/PopButton";
import shuffle from "@/src/lib/utils/shuffle";

const initialMessage = "いらなそうな牌を捨ててください。";

export default function MahjongPlayGround() {
  const [tsumoCount, setTsumoCount] = useState(1);
  const [message, setMessage] = useState(initialMessage);
  const [phase, setPhase] = useState<"draw" | "discard">("discard");

  const makeShuffledDeck = useCallback(() => {
    let tilesIds = [];
    for (let i = 0; i < 34; i++) {
      for (let j = 0; j < 4; j++) {
        tilesIds.push(i + 1);
      }
    }
    return shuffle(tilesIds);
  }, []);

  const [tiles, setTiles] = useState(
    (() => {
      const deck = makeShuffledDeck();
      const hand = deck.splice(-13).sort((a, b) => a - b);
      const tsumo = deck.pop();
      return {
        deck,
        hand: [...hand, tsumo],
      };
    })(),
  );

  const tsumo = () => {
    const drawnTileId = tiles.deck[tiles.deck.length - 1];

    setTiles(prev => ({
      hand: (() => {
        return [...prev.hand, prev.deck[prev.deck.length - 1]];
      })(),
      deck: prev.deck.slice(0, -1),
    }));

    return drawnTileId;
  };

  const discard = (index: number) => {
    const discardedTileId = tiles.hand[index];

    setTiles(prev => ({
      ...prev,
      hand: prev.hand.filter((_, i) => i !== index),
    }));

    return discardedTileId;
  };

  const riipai = () => {
    setTiles(prev => ({
      ...prev,
      hand: prev.hand.sort((a, b) => a - b),
    }));

    return null;
  };

  const handleReset = () => {
    setTiles({
      deck: makeShuffledDeck(),
      hand: [],
    });

    setTsumoCount(1);

    Array.from({ length: 14 }).forEach(() => tsumo());
    riipai();
    setPhase("discard");
    setMessage(initialMessage);
  };

  const handleDiscard = (index: number) => {
    if (phase === "discard") {
      const discardedTileId = discard(index);
      riipai();
      setPhase("draw");
      setMessage(`「${tileNameById[discardedTileId]}」を捨てました。「ツモる」を押してください。`);
    } else {
      setMessage("ツモった後に牌を捨ててください");
    }
  };

  const handleTsumo = () => {
    if (phase !== "draw" || tiles.deck.length <= 0) {
      setMessage("この状態では牌をツモれません。");
    } else {
      const drawnTileId = tsumo();
      setPhase("discard");
      setTsumoCount(tsumoCount + 1);
      setMessage(`「${tileNameById[drawnTileId]}」をツモりました。捨てる牌を選びましょう。`);
    }
  };

  return (
    <Box borderRadius="md" className="bg-mj-mat" p={["1", "4"]}>
      <HStack justify="space-between" align="start">
        <Text className="grow" fontSize={["md", "lg"]}>
          {message}
        </Text>

        <HStack className="grow-0">
          <Button size={["xs", "md"]} onClick={handleReset}>
            リセット
          </Button>
        </HStack>
      </HStack>

      <HStack mt="2">
        <Text>牌山の残量: {tiles.deck.length} / 136</Text>
        <Text>ツモ回数: {tsumoCount}</Text>
      </HStack>

      <HStack gap="0" mt="1">
        {Object.values(tiles.hand.slice(0, 13))
          .filter(Boolean)
          .map((tileId, index) => {
            return (
              <PopButton
                key={index}
                onClick={() => handleDiscard(index)}
                className="hover:-translate-y-2 transition-all">
                <TileImage tileId={tileId} hover={false} />
              </PopButton>
            );
          })}

        {tiles.hand.length == 14 && (
          <PopButton
            onClick={() => handleDiscard(tiles.hand.length - 1)}
            className="hover:-translate-y-2 transition-all lg:ml-4 ml-2">
            <TileImage tileId={tiles.hand[tiles.hand.length - 1]} hover={false} />
          </PopButton>
        )}
      </HStack>

      {phase == "draw" && (
        <Button
          mt="4"
          size={["xs", "md"]}
          colorScheme="blue"
          onClick={handleTsumo}
          cursor={tiles.deck.length > 0 ? "pointer" : "not-allowed"}>
          ツモる
        </Button>
      )}
    </Box>
  );
}
