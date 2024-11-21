const className = "tetromino";

export const TETROMINOES = (zenMode) => ({
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    className: zenMode ? `${className} ${className}__iz` : `${className} ${className}__i`
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    className: zenMode ? `${className} ${className}__jz` : `${className} ${className}__j`
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    className: zenMode ? `${className} ${className}__lz` : `${className} ${className}__l`
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    className: zenMode ? `${className} ${className}__oz` : `${className} ${className}__o`
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    className: zenMode ? `${className} ${className}__sz` : `${className} ${className}__s`
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    className: zenMode ? `${className} ${className}__tz` : `${className} ${className}__t`
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    className: zenMode ? `${className} ${className}__zz` : `${className} ${className}__z`
  }
});

export const randomTetromino = (zenMode) => {
  let tetrominoZen = TETROMINOES(zenMode)
  const keys = Object.keys(tetrominoZen);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return tetrominoZen[key];
};

export const rotate = ({ piece, direction }) => {
  // Transpose rows and columns
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index])
  );

  // Reverse rows to get a rotated matrix
  if (direction > 0) return newPiece.map((row) => row.reverse());

  return newPiece.reverse();
};

export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape
}) => {
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const occupied = isOccupied;
        const _y = y + position.row;
        const _x = x + position.column;
        rows[_y][_x] = { occupied, className };
      }
    });
  });

  return rows;
};
