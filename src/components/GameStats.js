import React from "react";

const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <div className="flex flex-col text-gray-200 text-right space-y-4">
  
      {/* <div>
        <p className="text-lg">Lines to Level</p>
        <p className="text-2xl font-bold">{linesToLevel}</p>
      </div> */}
      <div className="m-2">
        <p className="text-4xl">Score</p>
        <p className="text-4xl ">{points}</p>
      </div>
      <div className="m-2">
        <p className="text-4xl">Level</p>
        <p className="text-4xl">{level}</p>
      </div>
    </div>
  );
};

export default React.memo(GameStats);
