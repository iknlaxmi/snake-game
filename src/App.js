import './App.css';
import { useEffect, useRef, useState } from 'react';
import SnakeFood from './components/SnakeFood';
import Snake from './components/Snake';
import {
  MAX_LENGTH,
  SLOW_SPEED,
  MEDIUM_SPEED,
  FAST_SPEED,
} from './utils/Constants';
import { X_MAX, X_MIN, Y_MAX, Y_MIN, RATE } from './utils/Constants';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);

  const [arrowDirection, setArrowDirection] = useState('ArrowRight');
  const playgroundRef = useRef();
  const initPos = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ];
  const [snakeMovePosition, setSnakeMovePosition] = useState(initPos);
  const [snakeSpeed, setSnakeSpeed] = useState(SLOW_SPEED);
  // get random position for snake food
  const getSnakeFoodRandom = () => {
    const position = { x: 0, y: 0 };
    let x = Math.floor(Math.random() * MAX_LENGTH);
    console.log(x);
    let y = Math.floor(Math.random() * MAX_LENGTH);
    position.x = x - (x % RATE);
    position.y = y - (y % RATE);

    return position;
  };
  const [snakeFoodPosition, setSnakeFoodPosition] = useState(
    getSnakeFoodRandom()
  );
  //Handle Start button click
  const handleClick = () => {
    setScore(0);
    setStartGame(true);
    setGameOver(false);
  };
  //To move snake at regular intervals
  useEffect(() => {
    if (startGame === false) return;

    if (
      snakeMovePosition[snakeMovePosition.length - 1].x === X_MAX ||
      snakeMovePosition[snakeMovePosition.length - 1].x === X_MIN ||
      snakeMovePosition[snakeMovePosition.length - 1].y === Y_MAX ||
      snakeMovePosition[snakeMovePosition.length - 1].y === Y_MIN
    ) {
      setGameOver(true);
      setStartGame(false);

      setSnakeMovePosition(initPos);
      setSnakeFoodPosition(getSnakeFoodRandom());
      return;
    }
    playgroundRef.current.focus();
    const interval_duration = setInterval(moveSnake, snakeSpeed);
    return () => clearInterval(interval_duration);
  });

  //Based on the arrow pressed generate (x,y) point
  const moveSnake = () => {
    const movPos = [...snakeMovePosition];
    let x = movPos[movPos.length - 1].x,
      y = movPos[movPos.length - 1].y;
    switch (arrowDirection) {
      case 'ArrowUp':
        y = y - RATE;
        break;
      case 'ArrowDown':
        y = y + RATE;
        break;
      case 'ArrowLeft':
        x = x - RATE;
        break;
      case 'ArrowRight':
        x = x + RATE;
        break;
      default:
        break;
    }
    movPos.push({ x, y });

    if (x !== snakeFoodPosition.x || y !== snakeFoodPosition.y) {
      movPos.shift();
    } else {
      setSnakeFoodPosition(getSnakeFoodRandom());
      setScore(score + 1);
    }
    setSnakeMovePosition(movPos);
  };

  return (
    <>
      <h1 className="heading">🐍SNAKE GAME🐍</h1>
      <div
        className="App"
        onKeyDown={(e) => setArrowDirection(e.key)}
        ref={playgroundRef}
        tabIndex={0}
      >
        {!startGame && (
          <button className="start-btn" onClick={handleClick}>
            START
          </button>
        )}
        {!startGame && <p>Choose Level</p>}

        {!startGame && (
          <div className="container">
            <button
              className="speed-btn"
              onClick={() => setSnakeSpeed(SLOW_SPEED)}
            >
              Slow
            </button>
            <button
              className="speed-btn"
              onClick={() => setSnakeSpeed(MEDIUM_SPEED)}
            >
              MEDIUM
            </button>
            <button
              className="speed-btn"
              onClick={() => setSnakeSpeed(FAST_SPEED)}
            >
              FAST
            </button>
          </div>
        )}
        {startGame && <Snake moveData={snakeMovePosition} />}
        {startGame && <SnakeFood position={snakeFoodPosition} />}
      </div>
      <label className="score-label">Score: {score}</label>
    </>
  );
}

export default App;
