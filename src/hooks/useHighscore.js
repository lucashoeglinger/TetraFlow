import { useContext } from "react";
import { HighscoreContext } from "../contexts/PauseContext";

const useHighscore = () => {
  const context = useContext(HighscoreContext);
  if (!context) {
    throw new Error("usePause must be used within a PauseProvider");
  }
  return context;
};

export default useHighscore;