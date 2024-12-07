import React from "react";
import { usePause } from "../contexts/PauseContext";
import { useDropTime } from "../hooks/useDropTime";

const Pause = () => {
  const { togglePause } = usePause();
  const [, , resumeDropTime] = useDropTime({});

  const handleResume = () => {
    togglePause();
    resumeDropTime({});
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="text-center">
        <h1 className="text-4xl text-white mb-4">Game Paused</h1>
        <button
          onClick={handleResume}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500"
        >
          Resume
        </button>
      </div>
    </div>
  );
};

export default Pause;
