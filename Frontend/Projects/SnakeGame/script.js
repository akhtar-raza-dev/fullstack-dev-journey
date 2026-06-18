
// DOM & CONSTANT
const board = document.querySelector('#board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const durationElement = document.querySelector('.timer');

const overlay = document.querySelector('#overlay');
const overlayText = document.querySelector('#overlay-text');
const startBtn = document.querySelector('#start-btn');

const gridWidth = 40;
const totalCells = 800;
const cells = [];
const directionMap = {
  ArrowUp: 'UP',
  KeyW: 'UP',
  ArrowDown: 'DOWN',
  KeyS: 'DOWN',
  ArrowLeft: 'LEFT',
  KeyA: 'LEFT',
  ArrowRight: 'RIGHT',
  KeyD: 'RIGHT',
};
const actionMap = {
  KeyP: 'TOGGLE_PAUSE',
  Space: 'TOGGLE_PAUSE',
};
const oppositeDirectionMap = {
  RIGHT: 'LEFT',
  LEFT: 'RIGHT',
  UP: 'DOWN',
  DOWN: 'UP',
};

// STATE
let direction = 'UP';
let snake;
let food;
let score;
let highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
let seconds;
let gameInterval = null;
let timerInterval = null;
let gameRunning = false;

// INITIALIZATION
function createBoard() {
  if (cells.length === 0) {
    for (let i = 0; i < totalCells; i++) {
      let cell = document.createElement('div');
      // Added by Gemini: Board cell styling - entirely transparent/invisible since grid lines are gone
      cell.className = 'w-full h-full';
      board.appendChild(cell);
      cells.push(cell);
    }
  }
}
function initializeSnake() {
  // Added by Gemini: Resetting cells to transparent
  cells.forEach(cell => cell.className = 'w-full h-full');

  snake = [381, 382, 383, 384];
  for (let i = 0; i < snake.length; i++) {
    // Added by Gemini: Snake styling - Using a subtle gray/white and a tiny scale-down to create visual separation
    cells[snake[i]].className = 'bg-zinc-200 scale-[0.8] rounded-sm';
  }
}
function initializeScore() {
  score = 0;
  renderScore();
}

// UPDATE
function updateScore() {
  score++;
}
function updateSnake(nextHead, growSnake) {
  snake.push(nextHead);
  let removedTail = null;
  if (!growSnake) {
    removedTail = snake.shift();
  }
  return removedTail;
}
function updateHighScore() {
  highScore = score;
  localStorage.setItem('snakeHighScore', highScore);
}
function generateFood() {
  let newFoodPosition;
  let foodOverlapsSnake;
  do {
    newFoodPosition = Math.floor(Math.random() * totalCells);
    foodOverlapsSnake = snake.includes(newFoodPosition);
  } while (foodOverlapsSnake);
  food = newFoodPosition;
}
function updateDuration() {
  seconds++;
}

// RENDER
function renderScore() {
  scoreElement.textContent = String(score).padStart(3, '0');
}
function renderSnake(newHead, oldTail) {
  cells[newHead].className = 'bg-zinc-200 scale-[0.8] rounded-sm';
  if (newHead !== oldTail) {
    // Added by Gemini: Resetting tail to transparent
    cells[oldTail].className = 'w-full h-full';
  }
}
function renderHighScore() {
  highScoreElement.textContent = `HI: ${String(highScore).padStart(3, '0')}`;
}
function renderFood() {
  cells[food].className = 'bg-zinc-400 scale-[0.6] rounded-full';
}
function renderDuration() {
  durationElement.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
function showOverlay(message) {
  overlayText.textContent = message;
  overlay.classList.remove('hidden');
}
function hideOverlay() {
  overlay.classList.add('hidden');
}

// VALIDATION
function isWallCollision(currentHead, nextHead, direction) {
  let hitLeftWall = direction === 'LEFT' && currentHead % gridWidth === 0;
  let hitRightWall = direction === 'RIGHT' && (currentHead + 1) % gridWidth === 0;
  let hitTopWall = nextHead < 0;
  let hitBottomWall = nextHead >= totalCells;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}
function isSelfCollision(nextHead) {
  return snake.slice(1).includes(nextHead);
}
function isFoodEaten(nextHead) {
  return food === nextHead;
}

// CALCULATION / HELPERS
function calculateNextHead(currentHead, direction) {
  let nextHead;
  if (direction === 'RIGHT') nextHead = currentHead + 1;
  else if (direction === 'LEFT') nextHead = currentHead - 1;
  else if (direction === 'UP') nextHead = currentHead - gridWidth;
  else if (direction === 'DOWN') nextHead = currentHead + gridWidth;

  return nextHead;
}
function moveSnake(direction) {
  let currentHeadIdx = snake[snake.length - 1];
  let nextHeadIdx = calculateNextHead(currentHeadIdx, direction);

  if (isWallCollision(currentHeadIdx, nextHeadIdx, direction)) {
    gameOver();
    return;
  }
  if (isSelfCollision(nextHeadIdx)) {
    gameOver();
    return;
  }
  const growSnake = isFoodEaten(nextHeadIdx);

  if (growSnake) {
    updateScore();
    generateFood();
  }
  let removeTailIdx = updateSnake(nextHeadIdx, growSnake);

  renderScore();
  renderSnake(nextHeadIdx, removeTailIdx);
  renderFood();
}

window.addEventListener('keydown', (e) => {
  const keyboardCode = e.code;
  const mappedAction = actionMap[keyboardCode];

  if (mappedAction === 'TOGGLE_PAUSE' && gameRunning) {
    togglePause();
    return;
  }

  if (gameInterval !== null) {
    const translatedDirection = directionMap[keyboardCode];

    if (
        translatedDirection &&
        translatedDirection !== oppositeDirectionMap[direction]
    ) {
      direction = translatedDirection;
    }
  }
});

function startGameLoop() {
  gameInterval = setInterval(() => {
    moveSnake(direction);
  }, 150);
}
function startTimer() {
  timerInterval = setInterval(() => {
    updateDuration();
    renderDuration();
  }, 1000);
}

// ACTIONS
function startGame() {
  seconds = 0;
  gameRunning = true;
  hideOverlay();
  direction = 'UP';

  createBoard();
  initializeSnake();
  initializeScore();

  generateFood();
  renderDuration();

  renderHighScore();
  renderFood();

  startGameLoop();
  startTimer();
}

function gameOver() {
  clearInterval(gameInterval);
  gameInterval = null;
  clearInterval(timerInterval);
  timerInterval = null;

  gameRunning = false;

  if (highScore < score) {
    updateHighScore();
    renderHighScore();
  }

  showOverlay("Game Over");
}

function togglePause() {
  const isPaused = gameInterval === null;
  if (isPaused) {
    startGameLoop();
    startTimer();
  } else {
    clearInterval(gameInterval);
    gameInterval = null;
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Event listener to start the game
startBtn.addEventListener('click', () => {
  startGame();
});

// Initialize the board visuals on first load so the background isn't empty
createBoard();
renderHighScore();
