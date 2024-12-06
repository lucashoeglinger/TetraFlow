import Menu from "./Menu";
import Tetris from "./Tetris";
import Pause from "./Pause";
import { useGameOver } from "../hooks/useGameOver";
import { usePause } from "../hooks/PauseContext";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const { pause, setPause, togglePause } = usePause(); 


  const start = () => {
    resetGameOver();
    setPause(false); 
  };

  return (
    <div className="Game relative h-screen">
      {pause && <Pause onResume={togglePause} />}
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};

export default Game;
