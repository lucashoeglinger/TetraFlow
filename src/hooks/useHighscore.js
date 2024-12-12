import { useState, useEffect } from "react";

export const useHighscore = () => {
    const [highscore, setHighscore] = useState([]);
    const [highscoreActive, setHighscoreActive] = useState(false);

    useEffect(() => {
        console.log("highscore:", highscoreActive);
      }, [highscoreActive])

    return [highscore, setHighscore, highscoreActive, setHighscoreActive];
};
