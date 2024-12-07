import BoardCell from "./BoardCell";

const Board = ({ board }) => {
  return (
    <div
      className="Board"
      style={{
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
      }}
    >
      {board.rows.map((row, y) =>
        row.map((cell, x) => <BoardCell key={`${y}-${x}`} cell={cell} />)
      )}
    </div>
  );
};

export default Board;
