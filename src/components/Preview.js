import React from "react";
import { buildBoard } from "../utils/Board";
import { transferToBoard } from "../utils/Tetrominoes";
import BoardCell from "../utils/BoardCell";

const Preview = ({ tetromino, index }) => {
  const { shape, className } = tetromino;

  // Create a 4x4 empty board
  const board = buildBoard({ rows: 4, columns: 4 });

  // Set the position of the preview block
  const style = { top: `${index * 15}vw` };

  // Transfer the tetromino shape to the board
  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  return (
    <div
      className="w-full max-w-[150px] h-[8rem] bg-transparent flex justify-center items-center m-2"
      style={style}
    >
      <div
        className="grid grid-cols-4 gap-[1px] h-7 w-7 bg-gray-800 "
        style={{ width: "100%", height: "100%" }}
      >
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);
