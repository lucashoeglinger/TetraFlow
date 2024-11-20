import BoardCell from "./BoardCell";

const Board = ({ board }) => {
  return (
    <div
      className="grid gap-[1px]  bg-gray-700"
      style={{
        gridTemplateRows: `repeat(${board.size.rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${board.size.columns}, minmax(0, 1fr))`,
      }}
    >
      {board.rows.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  );
};

export default Board;
