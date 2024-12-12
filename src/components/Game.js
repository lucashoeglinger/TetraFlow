import Menu from "./Menu";
import Tetris from "./Tetris";
import Pause from "./Pause";
import Highscore from "./Highscore";
import { useGameOver } from "../hooks/useGameOver";
import { usePause } from "../contexts/PauseContext";
import { useHighscore } from "../hooks/useHighscore";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const { pause, setPause, togglePause } = usePause();
  const [highscore, setHighscore, highscoreActive, setHighscoreActive] = useHighscore();

  const start = () => {
    resetGameOver();
    setPause(false);
    setHighscoreActive(false);
  };

  const handleGameOver = (score) => {
    setGameOver(true);
  };

  console.log(highscoreActive)

  return (
    <div className="Game relative h-screen">
      {pause && <Pause onResume={togglePause} />}
      {highscoreActive ? (
        <Highscore
          highscore={highscore}
          onRestart={start}
          onBackToMenu={() => { setHighscoreActive(true)}}
        />
      ) : gameOver ? (
        <Menu
          onClick={start}
          onViewHighscore={() => {
            setHighscoreActive(true)
            console.log(true);
          }}
        />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default Game;
