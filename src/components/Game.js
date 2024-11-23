import Menu from "./Menu";
import Tetris from "./Tetris";
import Pause from "./Pause";
import { useState } from "react";

import { useGameOver } from "../hooks/useGameOver";
import usePause from "../hooks/usePause";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const pause = usePause;

  const start = () => resetGameOver();

  return (
    <div className="Game">
      {!pause.pause ? (
          gameOver ? (
          <Menu onClick={start} />
        ) : (
          <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
        )
      ) : (
        <Pause/>
      )}
    </div>

  );
};

export default Game;
