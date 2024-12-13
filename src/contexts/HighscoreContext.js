import { useState, createContext, useContext } from "react";

export const HighscoreContext = createContext();

export const HighscoreProvider = ({children}) => {
    const [highscore, setHighscore] = useState(0);
    const [highscoreActive, setHighscoreActive] = useState(false);

    return (
        <HighscoreContext.Provider value={{ highscore, setHighscore, highscoreActive, setHighscoreActive}}>
          {children}
        </HighscoreContext.Provider>
      );
};
export const useHighscore = () => {
    const context = useContext(HighscoreContext);
    if (!context) {
      throw new Error("usePause must be used within a PauseProvider");
    }
    return context;
  };
