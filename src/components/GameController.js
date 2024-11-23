import { useState } from "react";
import { Action, actionForKey, actionIsDrop } from "../utils/Input";
import { playerController } from "../utils/PlayerController";

import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";
import {usePause} from "../hooks/usePause";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });
  const [pause, setPause] = useState(usePause.pause);
  const [isFastDropping, setIsFastDropping] = useState(false);

  useInterval(() => {
      handleInput({ action: Action.SlowDrop });
  }, isFastDropping ? 50 : dropTime);

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) {
      resumeDropTime();
      setIsFastDropping(false);
    }
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Quit) {
      setGameOver(true);
    } else if(action === Action.Pause){
      setPause(!pause);
      console.log(pause);
      if(pause === true){
        pauseDropTime()
      }
        resumeDropTime();
    } else {
      if (actionIsDrop(action)) {
        pauseDropTime();
        setIsFastDropping(true);
      }
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
