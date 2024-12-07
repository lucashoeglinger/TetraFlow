const BoardCell = ({ cell }) => {
  const { className, color } = cell;

  return (
    <div
      className={`BoardCell ${className || ""}`}
      style={{
        backgroundColor: color || "rgba(0, 0, 0, 0.1)", // Default empty cell color
        border: className ? "1px solid rgba(0, 0, 0, 0.3)" : "none", // Border for Tetromino cells
      }}
    />
  );
};

export default BoardCell;
