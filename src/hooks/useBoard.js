import { useState, useEffect } from "react";
import { buildBoard, nextBoard } from "../utils/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
  stage, // New prop
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns, stage }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
