import React from "react";
import { buildBoard } from "../utils/Board";
import { transferToBoard } from "../utils/Tetrominoes";
import BoardCell from "../utils/BoardCell";

const Preview = ({ tetromino, index }) => {
  const { shape, className } = tetromino;

  // Create a 4x4 empty board
  const board = buildBoard({ rows: 4, columns: 4 });


  const style = { top: `${index * 15}vh` }; 

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
      className="relative flex justify-center items-center m-2"
      style={{
        ...style,
        width: "15vw",
        height: "15vw", 
        maxWidth: "120px", 
        maxHeight: "120px",
      }}
    >
      <div
        className="grid gap-[1px] bg-gray-800"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)", 
          gridTemplateRows: "repeat(4, 1fr)",
          width: "100%",
          height: "100%",
        }}
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
