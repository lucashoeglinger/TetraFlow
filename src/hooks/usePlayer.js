import { useState, useCallback } from "react";
import useZen from "./useZen";
import { randomTetromino } from "../utils/Tetrominoes";

const buildPlayer = (previous, zenMode) => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino(zenMode)); 
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map(() => randomTetromino(zenMode));
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop(),
  };
};

export const usePlayer = () => {
  const zenMode = useZen.zenMode; 
  const [player, setPlayer] = useState(() => buildPlayer(null, zenMode));

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev, zenMode));
  }, [zenMode]);

  return [player, setPlayer, resetPlayer];
};
