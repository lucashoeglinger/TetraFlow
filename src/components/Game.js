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
import Sound from "../utils/Sounds";

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
    function onDeviceReady(){
      document.addEventListener("online", updateOnlineState);
      document.addEventListener("offline", updateOnlineState);
      updateOnlineState();
    }

    document.addEventListener("deviceready", onDeviceReady);

    return () => {
      document.removeEventListener("online", updateOnlineState);
      document.removeEventListener("offline", updateOnlineState);
      document.removeEventListener("deviceready", onDeviceReady);
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
    if (Sound.tetrisMusic.state() === "loaded" && !Sound.tetrisMusic.playing()) {
      Sound.tetrisMusic.play();
    }
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
      {pause && <Pause onResume={togglePause} />}
      {isCalibrate && <CalibrateDevice
                        onToMenu={deactivateGyro}></CalibrateDevice>}
      {!isOnline && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded shadow-md z-50">
          You are offline, please reconnect to the internet in order to save your score.
        </div>
      )}

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
