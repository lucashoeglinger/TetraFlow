import {React, useEffect} from "react";
import Board from "./Board";
import GameController from "./GameController";
import GameStats from "./GameStats";
import Previews from "./Previews";
import { useBoard } from "../hooks/useBoard";
import { useHighscore } from "../contexts/HighscoreContext";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import { useLevel } from "../hooks/useLevel";
import { usePause } from "../contexts/PauseContext";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats(useLevel.initialLevel);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const {highscore, setHighscore, highscoreActive, setHighscoreActive} = useHighscore();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });


  return (
    <div className="Tetris h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
      <div className="game-grid grid grid-cols-[1fr_3fr_1fr] gap-8 items-center w-full max-w-6xl">
        {/* Next Preview */}
        <div className="next-preview flex flex-col items-center">
          <h2 className="text-gray-200 text-xl mb-2">Next</h2>
          <Previews className="Preview" tetrominoes={player.tetrominoes} />
        </div>

        {/* Game Board */}
        <div className="board-container flex justify-center">
          <Board board={board} />
        </div>

        {/* Game Stats */}
        <div className="game-stats flex flex-col items-center text-gray-200">
          <div className="text-2xl mb-4">Score</div>
          <div className="value text-3xl font-bold">{gameStats.points}</div>
          <div className="text-2xl mt-4">Level</div>
          <div className="value text-3xl font-bold">{gameStats.level}</div>
        </div>
      </div>

      {/* Game Controller */}
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setHighscore={setHighscore}
        setHighscoreActive={setHighscoreActive}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Tetris;
