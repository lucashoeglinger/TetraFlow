const BoardCell = ({ cell }) => (
  <div
    className={`h-7 w-8 ${
      cell.className ? cell.className : ""
    } relative`}
  >
    <div className="absolute inset-0 bg-opacity-50 rounded-md"></div>
  </div>
);

export default BoardCell;
