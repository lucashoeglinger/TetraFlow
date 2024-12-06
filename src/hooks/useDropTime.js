import { useState, useCallback, useEffect } from "react";

const defaultDropTime = 1000;
const minimumDropTime = 50;
const speedIncrement = 100;

export const useDropTime = ({ gameStats }) => {
  const [dropTime, setDropTime] = useState(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState(null);

  const resumeDropTime = useCallback(() => {
    if (previousDropTime !== null) {
      setDropTime(previousDropTime);
      setPreviousDropTime(null);
    } else {
      const speed = speedIncrement * (gameStats.level - 1);
      const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);
      setDropTime(newDropTime);
    }
  }, [previousDropTime, gameStats.level]);

  const pauseDropTime = useCallback(() => {
    if (dropTime !== null) {
      setPreviousDropTime(dropTime); 
      setDropTime(null); 
    }
  }, [dropTime]);

  useEffect(() => {
    if (dropTime !== null) {
      const speed = speedIncrement * (gameStats.level - 1);
      const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);
      setDropTime(newDropTime);
    }
  }, [gameStats.level]);

  return [dropTime, pauseDropTime, resumeDropTime];
};
