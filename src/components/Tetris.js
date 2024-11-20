import Board from "./Board";
import GameController from "./GameController";
import GameStats from "./GameStats";
import Previews from "./Previews";

import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import { useLevel } from "../hooks/useLevel";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats(useLevel.initialLevel);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="grid grid-cols-3 gap-4">
        {/* Left Section */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <h2 className="text-gray-200 text-4xl  m-2">Next</h2>
          <Previews tetrominoes={player.tetrominoes} />
        </div>

        {/* Middle Section (Board) */}
        <div className="col-span-1">
          <Board board={board} />
        </div>

        {/* Right Section */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <GameStats gameStats={gameStats} />
        </div>
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Tetris;
