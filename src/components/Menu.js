import useLevel from '../hooks/useLevel';
import useZen from '../hooks/useZen';
import { useState } from 'react';

const Menu = ({ onClick, onClickGyro }) => {
  const [initialLevel, setInitialLevel] = useState(useLevel.initialLevel);
  const [expertLevel, setExpertLevel] = useState(useLevel.expertLevel);

  const [zenMode, setZenMode] = useState(useZen.zenMode);


  const handleZenChange = (e) => {
    const value = e.target.checked;
    setZenMode(value);
    useZen.setZenMode(value);
  }
  const handleInitialLevelChange = (e) => {
    const value = Number(e.target.value);
    setInitialLevel(value);
    useLevel.setInitialLevel(value); 
  };

  const handleExpertLevelChange = (e) => {
    const value = Number(e.target.value);
    setExpertLevel(value); 
    useLevel.setExpertLevel(value); 
  };

  return (
    <div className="Menu">
      <div className="bg-gray-900 text-gray-100 flex items-center justify-center min-h-screen min-w-screen">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <button
            className="w-full bg-gray-400 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md text-lg mb-6"
            onClick={onClick}
          >
            New game
          </button>
          <button
            className="w-full bg-gray-400 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md text-lg mb-6"
            onClick={onClickGyro}
          >
           Calibrate Gyroscope
          </button>

          <div className="space-y-6">
            <div>
              <div className="mb-2">Activate ZenMode</div>
            <label htmlFor="ZenMode" className="switch">
            <input id="ZenMode" type="checkbox" defaultChecked={zenMode} onChange={handleZenChange}/>
            <span className="slider round"></span>
          </label>
        </div>
            <div>
              <label
                htmlFor="initial-level"
                className="block text-left text-sm font-medium mb-1"
              >
                Initial level
              </label>
              <div className="flex items-center justify-between">
                <input
                  type="range"
                  id="initial-level"
                  min="1"
                  max="29"
                  value={initialLevel}
                  className="w-3/4 accent-yellow-400"
                  onChange={handleInitialLevelChange} 
                />
                <span className="ml-4 text-yellow-400 font-semibold">
                  {initialLevel}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="expert-level"
                className="block text-left text-sm font-medium mb-1"
              >
                Expert Level
              </label>
              <div className="flex items-center justify-between">
                <input
                  type="range"
                  id="expert-level"
                  min="1"
                  max="10"
                  value={expertLevel}
                  className="w-3/4 accent-yellow-400"
                  onChange={handleExpertLevelChange} 
                />
                <span className="ml-4 text-yellow-400 font-semibold">
                  {expertLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm">Your score</p>
            <p className="text-4xl text-yellow-400 font-bold mt-2">0000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
