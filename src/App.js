import "./index.css";
import "./tailwind.css"
import Game from ".//components/Game";
import { PauseProvider } from "./contexts/PauseContext";

export default function App() {
  return (
    <div className="App">
      <PauseProvider>
        <Game rows={20} columns={10} />
      </PauseProvider>
    </div>
  );
}
