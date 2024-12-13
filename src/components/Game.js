import Menu from "./Menu";
import Tetris from "./Tetris";
import Pause from "./Pause";
import Highscore from "./Highscore";
import { useGameOver } from "../hooks/useGameOver";
import { usePause } from "../contexts/PauseContext";
import { useHighscore } from "../contexts/HighscoreContext";
import supabase from "../backend/createSupaClient";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const { pause, setPause, togglePause } = usePause();
  const {highscore, setHighscore, highscoreActive, setHighscoreActive} = useHighscore();

  async function OnSave(name, score) {
    const {error} = await supabase
                         .from("Highscores")
                         .insert({name: name, score: score})

    if(error){
      console.error("Error inserting Highscores", error);
    }
    setHighscoreActive(false)
  }

  const start = () => {
    resetGameOver();
    setPause(false);
    setHighscoreActive(false);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div className="Game relative h-screen">
      {pause && <Pause onResume={togglePause} />}
      {highscoreActive ? (
        <Highscore
          score={highscore}
          onRestart={start}
          onSave={OnSave}
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
