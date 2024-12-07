import { useContext } from "react";
import { PauseContext } from "../contexts/PauseContext";

const usePause = () => {
  const context = useContext(PauseContext);
  if (!context) {
    throw new Error("usePause must be used within a PauseProvider");
  }
  return context;
};

export default usePause;
