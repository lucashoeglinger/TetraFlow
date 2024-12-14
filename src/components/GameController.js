import { useEffect, useRef, useState } from "react";
import { Action, actionForKey, actionIsDrop } from "../utils/Input";
import { playerController } from "../utils/PlayerController";

import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";
import usePause from "../hooks/usePause";
import {throttle, debounce, last} from "lodash";

const GameController = ({ board, gameStats, player, setGameOver, setHighscore, setHighscoreActive, setPlayer }) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });
  const { pause, togglePause } = usePause();
  const [isFastDropping, setIsFastDropping] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const lastFastDropRef = useRef(Date.now())
  const lastRotateRef = useRef(Date.now())

  useInterval(() => {
    if (!pause) {
      handleInput({ action: Action.SlowDrop });
    }
  }, isFastDropping ? 50 : dropTime || Infinity);

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) {
      resumeDropTime();
      setIsFastDropping(false);
    }
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      togglePause();
      if (!pause) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
      return;
    }

    if (pause) return;

    if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) {
        pauseDropTime();
        setIsFastDropping(true);
      }
      if (!dropTime) return;
      handleInput({ action });
    }
  };
  const handleClick = (event) => {
    if(!event.target.closest("BoardCell") || !event.target){
      return;
    }
    handleInput({action: Action.FastDrop})
  }

  const handleInput = ({ action }) => {
    const points = gameStats.points;

    if (pause) return;

    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
      setHighscore,
      setHighscoreActive,
      points,
    });
  };

  const handleGyroscope = ({alpha, beta, gamma}) => {
    if(pause) return;
    const tiltThreshhold = 15;

    const betaThreshold = 90;

    const now = Date.now();

    if(gamma > tiltThreshhold){
      handleInput({action: Action.Right});
    }else if(gamma < -tiltThreshhold){
      handleInput({action: Action.Left})
    }

    if(beta > betaThreshold){
      if(now - lastFastDropRef.current >= 1000){
        handleInput({action: Action.FastDrop})
        lastFastDropRef.current = now;
       }
    }
    if(beta < betaThreshold - tiltThreshhold * 2){
      if(now - lastRotateRef.current >= 500){
        handleInput({action: Action.Rotate})
        lastRotateRef.current = now
      }
    }
  }
  const handleDeviceOrientation = (event) => {
    const {alpha, beta, gamma} = event;

    handleGyroscope({alpha, beta, gamma});
  }

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchMove = (event) => {
    if (!touchStart) return;
  
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
  
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 30) {
        if (deltaX > 0) {
          handleInput({ action: Action.Right });
        } else {
          handleInput({ action: Action.Left });
        }
        setTouchStart({ x: touch.clientX, y: touch.clientY });
      }
    } else {
      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          handleInput({ action: Action.SlowDrop });
        } else {
          handleInput({ action: Action.Rotate });
        }
        setTouchStart({ x: touch.clientX, y: touch.clientY });
      }
    }
  };
  

  const onTouchEnd = () => {
    setTouchStart(null);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
    document.addEventListener("click", handleClick);
    if(typeof DeviceOrientationEvent.requestPermission === 'function' ){
           DeviceOrientationEvent.requestPermission()
                .then((response) => {
                  if(response === 'granted'){
                    document.addEventListener('deviceorientation', handleDeviceOrientation)
                  }
                })
                .catch(console.error);
    }else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    } else {
      console.error("Device orientation not supported on this device");
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", handleClick)
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [onKeyDown, onKeyUp]);

  return null;
};

export default GameController;
