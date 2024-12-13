import { useEffect, useState } from "react";
import { Action, actionForKey, actionIsDrop } from "../utils/Input";
import { playerController } from "../utils/PlayerController";

import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";
import usePause from "../hooks/usePause";

const GameController = ({ board, gameStats, player, setGameOver, setHighscore, setHighscoreActive, setPlayer }) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });
  const { pause, togglePause } = usePause();
  const [isFastDropping, setIsFastDropping] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [lastHorizontalMove, setLastHorizontalMove] = useState(0);

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

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setLastHorizontalMove(Date.now())
  };

  const onTouchMove = (event) => {
    if (!touchStart) return;
  
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
  
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
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

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [onKeyDown, onKeyUp, lastHorizontalMove]);

  return null;
};

export default GameController;
