import React, { createContext, useContext, useState } from "react";
import { useDropTime } from "../hooks/useDropTime";

export const PauseContext = createContext();

export const PauseProvider = ({ children }) => {

  const [pause, setPause] = useState(false);

  const togglePause = () => {
    setPause((prevPause) => {
      const newPause = !prevPause;
      return newPause;
    });
  };

  return (
    <PauseContext.Provider value={{ pause, setPause, togglePause}}>
      {children}
    </PauseContext.Provider>
  );
};


export const usePause = () => {
  const context = useContext(PauseContext);
  if (!context) {
    throw new Error("usePause must be used within a PauseProvider");
  }
  return context;
};
