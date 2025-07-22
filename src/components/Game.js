import Menu from "./Menu";
import Tetris from "./Tetris";
import Pause from "./Pause";
import Highscore from "./Highscore";
import { useGameOver } from "../hooks/useGameOver";
import { usePause } from "../contexts/PauseContext";
import { useHighscore } from "../contexts/HighscoreContext";
import useGyroscope from "../hooks/useGyroscope";
import {useState, useEffect} from "react";
import CalibrateDevice from "./CalibrateDevice";
import supabase from "../backend/createSupaClient";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const { pause, setPause, togglePause } = usePause();

  const {highscore, setHighscore, highscoreActive, setHighscoreActive} = useHighscore();

  const [isCalibrate, setIsCalibrate] = useGyroscope();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() =>  {
    function updateOnlineState(){
      setIsOnline(navigator.onLine);
    }
    window.addEventListener("online", updateOnlineState);
    window.addEventListener("offline", updateOnlineState);

    return () => {
      window.addEventListener("online", updateOnlineState);
      window.addEventListener("offline", updateOnlineState);
    }
  }, [])

  async function OnSave(name, score) {
    if(!isOnline) return;
    
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
  const setGyro = () => {
    setIsCalibrate(true);
  }
  const deactivateGyro = () => {
    setIsCalibrate(false)
  }

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div className="Game relative h-screen">
      {!isOnline && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          You are offline. Please reconnect to fetch data.
        </div>
      )}
      {pause && <Pause onResume={togglePause} />}
      {isCalibrate && <CalibrateDevice
                        onToMenu={deactivateGyro}></CalibrateDevice>}
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
          onClickGyro={setGyro}
        />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default Game;
