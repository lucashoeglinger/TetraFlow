import "./index.css";
import "./tailwind.css"
import Game from ".//components/Game";
import { PauseProvider } from "./contexts/PauseContext";
import { HighscoreProvider } from "./contexts/HighscoreContext";
import { GyroProvider } from "./contexts/GyroContext";
import { OnlineStatusProvider } from "./contexts/OnlineStatusContext";

export default function App() {
  return (
      <div className="App">
        <OnlineStatusProvider>
          <GyroProvider>
            <HighscoreProvider>
                <PauseProvider>
                  <Game rows={20} columns={10} />
                </PauseProvider>
              </HighscoreProvider>
          </GyroProvider>
        </OnlineStatusProvider>
      </div>
  );
}
