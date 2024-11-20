import React from "react";
import Preview from "./Preview";

const Previews = ({ tetrominoes }) => {
  // Get only the last tetromino
  const latestTetromino = tetrominoes[tetrominoes.length - 1];

  return (
    // <div className="Previews flex flex-col items-center space-y-4">
     <>
      {latestTetromino && (
        <Preview tetromino={latestTetromino} index={0} />
      )}
      </>
    // </div>
  );
};

export default React.memo(Previews);
