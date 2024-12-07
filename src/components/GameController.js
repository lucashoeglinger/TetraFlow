import { useEffect, useState } from "react";
import { Action, actionForKey, actionIsDrop } from "../utils/Input";
import { playerController } from "../utils/PlayerController";

import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";
import usePause from "../hooks/usePause";

const GameController = ({ board, gameStats, player, setGameOver, setPlayer }) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });
  const { pause, togglePause } = usePause();
  const [isFastDropping, setIsFastDropping] = useState(false);

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
    if (pause) return;
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return null; 
};

export default GameController;
