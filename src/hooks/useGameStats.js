import { useState, useCallback } from "react";
import Sounds from "../utils/Sounds";

export const useGameStats = (initialLevel) => {

  const buildGameStats = () => ({
    level: initialLevel,
    linesCompleted: 0,
    linesPerLevel: 10,
    points: 0
  });

  const [gameStats, setGameStats] = useState(buildGameStats());

  const addLinesCleared = useCallback((lines) => {
    setGameStats((previous) => {
      const points = previous.points + [0, 40, 100, 300, 1200][lines] * (previous.level + 1);
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1
          : previous.level;
      const linesCompleted = newLinesCompleted % linesPerLevel;

      if(newLinesCompleted >= linesPerLevel){
        Sounds.nextLevelMusic.play();
      }

      return {
        level,
        linesCompleted,
        linesPerLevel,
        points
      };
    }, []);
  }, []);

  return [gameStats, addLinesCleared];
};
