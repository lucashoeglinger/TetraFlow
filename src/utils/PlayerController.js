import { hasCollision, isWithinBoard } from "./Board";
import { rotate } from "./Tetrominoes";
import { Action } from "./Input";
import supabase from "../backend/createSupaClient";
import Sounds from "./Sounds";

const { data, error } = await supabase
                                .from('Highscores') 
                                .select('score')
                                .order('score', {ascending: false})
                                .limit(10)

    if (error) {
      console.error('Error fetching data:', error);
    } 

const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape
      }
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

const attemptMovement = async({ board, action, player, setPlayer, setGameOver, setHighscore, setHighscoreActive, points }) => {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  let currentPoints = 0;

  if(points !== currentPoints){
    currentPoints = Math.max(points, currentPoints);
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board
  });

  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    Sounds.gameOverMusic.play();
    Sounds.tetrisMusic.stop();
    
    const lowestHighscore = data[data.length - 1]?.score || 0;

    const isHighscore = points > lowestHighscore;

            if (isHighscore) {
              console.log(setHighscore)
              setHighscore(points);
              setHighscoreActive(isHighscore); 
            }

    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
  setHighscore,
  setHighscoreActive,
  points
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver, setHighscore, setHighscoreActive, points });
  }
};
