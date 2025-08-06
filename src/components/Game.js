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
import { useIsOnline } from "../hooks/useIsOnline";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const { pause, setPause, togglePause } = usePause();

  const {highscore, setHighscore, highscoreActive, setHighscoreActive} = useHighscore();

  const [isCalibrate, setIsCalibrate] = useGyroscope();

  const isOnline = useIsOnline();

  useEffect(() =>  {
    function onPause(){
      if(Sound.tetrisMusic.playing()){
        Sound.tetrisMusic.stop();
      }
      setPause(true);
    }
    function onResume(){
      setTimeout(() => {
        if(!Sound.tetrisMusic.playing()){
          Sound.tetrisMusic.play();
        }
       setPause(false);    
      }, 0);
    }
    function onDeviceReady(){
      document.addEventListener("pause", onPause, false);      
      document.addEventListener("resume", onResume, false);      
    }

    document.addEventListener("deviceready", onDeviceReady);

    return () => {
      document.removeEventListener("pause", onPause);
      document.removeEventListener("resume", onResume);
      document.removeEventListener("deviceready", onDeviceReady);
    }
  }, [])

  async function OnSave(name, score) {
    if(!isOnline){
      var item = {
        name: name,
        score: score,
      };
      const key = `highscore-${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(item));

      setHighscoreActive(false);
    }else{
    
        const {error} = await supabase
                             .from("Highscores")
                             .insert({name: name, score: score})

        if(error){
          console.error("Error inserting Highscores", error);
        }
        setHighscoreActive(false)
      }
  }

  async function syncDataToDatabase(){
    for (let i = 0; i < localStorage.length ?? 0; i++) {
        const raw = localStorage.getItem(localStorage.key(i));
        if (!raw) continue;

        let item;
        try {
          item = JSON.parse(raw);
        } catch (e) {
          console.warn(`Skipping malformed localStorage entry at index ${i}`);
          continue;
        }

        const { data, error } = await supabase
          .from("Highscores")
          .select("score")
          .order("score", { ascending: false })
          .limit(10);
        if(error){
          console.log("error fetching data")
        }

        if(item.score < data.Highscore){
          if (item?.name && typeof item.score === "number") {
            const { error } = await supabase
              .from("Highscores")
              .insert({ name: item.name, score: item.score });
          
            if (error) {
              console.error("Failed to sync item to Supabase", error.message);
            }
          }
        }
    }     
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
