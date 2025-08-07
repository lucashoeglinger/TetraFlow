import { Howl } from "howler";
import Tetris from "../sound/Tetris.mp3";
import gameOver from "../sound/game-over.mp3";
import nextLevel from "../sound/next-level.mp3";

let gameOverMusic = new Howl({
    src: [gameOver],
    volume: 0.5
});

let nextLevelMusic = new Howl({
    src: [nextLevel],
    volume: 0.8
});

const tetrisMusic = new Howl({
  src: [Tetris],
  loop: true,
  volume: 0.1,
  onload: () => {
    console.log('Music loaded!');
    tetrisMusic.play();
  },
  onloaderror: (id, err) => {
    console.error('Failed to load audio', err);
  }
});
const Sound =  {
  gameOverMusic: gameOverMusic,
  nextLevelMusic: nextLevelMusic,
  tetrisMusic: tetrisMusic,
};

export default Sound;