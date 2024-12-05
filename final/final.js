let score = 0; // score initializing
let gridSize = 4; // begin with 4x4
let grid = []; // the main grid

const gridContainer = document.getElementById('grid');
const restartButton = document.getElementById('restart');
const statusText = document.getElementById('status');

// displaying the score
function updateScore(points) {

  // increase the current score by the points earned
  score += points;
  document.getElementById('score').textContent = score;

  // check if the player has won
  if (score >= 2000) {
    end('win');
    return;
  }

  // expand the grid when the score requirements are met
  if (score >= 500 && gridSize === 4) {
    gridSize = 5;
    expandGrid();
  } else if (score >= 1000 && gridSize === 5) {
    gridSize = 6;
    expandGrid();
  }
}

// end the game and stop all further input
function end(status) {
  if (status === 'win') {
    statusText.textContent = 'Congratulations! You Win!';
  } else if (status === 'lose') {
    statusText.textContent = 'Game Over!';
  }

  document.removeEventListener('keydown', handleKeyPress); // stops inputs
}

// checks if the game no longer has valid moves
function validMove() {
  // check for empty grid spaces
  if (grid.some(row => row.includes(0))) {
    return; // if there are valid moves return
  }

  // check for possible merging
  for (let r = 0; r < gridSize; r++) {
    for (let d = 0; d < gridSize; d++) {
      const currentTile = grid[r][d];

      // checks the grid to the right and below
      if (
        (d < gridSize - 1 && currentTile === grid[r][d + 1]) || // right 
        (r < gridSize - 1 && currentTile === grid[r + 1][d])    // down 
      ) {
        return; // valid moves
      }
    }
  }

  //  no more valid moves
  end('lose');
}

// reset game
restartButton.addEventListener('click', () => {
  score = 0;
  gridSize = 4; // reset to 4x4 
  document.getElementById('score').textContent = score;
  createGrid();
  statusText.textContent = '';
  document.addEventListener('keydown', handleKeyPress);
});

// create the grid
function createGrid() {
  grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  addNewTile();
  addNewTile();
  generateGrid();
}

// expand grid
function expandGrid() {
  const newGrid = Array.from({ length: gridSize }, (_, r) =>
    Array.from({ length: gridSize }, (_, c) => (grid[r] && grid[r][c] ? grid[r][c] : 0))
  );
  grid = newGrid;
  generateGrid();
}

// generate grid
function generateGrid() {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let row of grid) {
    for (let cell of row) {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.textContent = cell === 0 ? '' : cell;
      cellDiv.classList.toggle('empty', cell === 0);
      gridContainer.appendChild(cellDiv);
    }
  }
}

// add more tiles
function addNewTile() {
  const emptyCells = [];
  
  // collect empty cells in the current grid
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  
  // if there are no empty cells, do nothing
  if (emptyCells.length === 0) return;

  // randomly pick an empty cell and assign it a value (2 or 4)
  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}


// move the grid and merge tiles
function moveGrid(direction) {
  const previousGrid = JSON.stringify(grid); // save the current grid

  for (let i = 0; i < gridSize; i++) {
    let line = direction === 'left' || direction === 'right'
      ? grid[i]
      : grid.map(row => row[i]);

    if (direction === 'right' || direction === 'down') line = line.reverse();

    const compacted = line.filter(v => v !== 0);
    for (let j = 0; j < compacted.length - 1; j++) {
      if (compacted[j] === compacted[j + 1]) {
        compacted[j] *= 2;
        updateScore(compacted[j]); // add the combined squares to the score
        compacted.splice(j + 1, 1);
        compacted.push(0);
      }
    }
    const newLine = [...compacted, ...Array(gridSize - compacted.length).fill(0)];
    if (direction === 'right' || direction === 'down') newLine.reverse();

    for (let j = 0; j < gridSize; j++) {
      if (direction === 'left' || direction === 'right') {
        grid[i][j] = newLine[j];
      } else {
        grid[j][i] = newLine[j];
      }
    }
  }

  const currentGrid = JSON.stringify(grid);
  if (currentGrid !== previousGrid) {
    addNewTile();
    generateGrid();
    validMove();
  }
}

// check game status
function validMove() {
  if (grid.some(row => row.includes(2048))) {
    statusText.textContent = 'You Win!';
    document.removeEventListener('keydown', handleKeyPress);
    return;
  }

  const movesLeft = grid.some((row, r) =>
    row.some((cell, c) => cell === 0 || (c < gridSize - 1 && cell === grid[r][c + 1]) || (r < gridSize - 1 && cell === grid[r + 1][c]))
  );

  if (!movesLeft) {
    statusText.textContent = 'Game Over!';
    document.removeEventListener('keydown', handleKeyPress);
  }
}

// arrow key input
function handleKeyPress(event) {
  const keyMap = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
  };

  const direction = keyMap[event.key];
  if (direction) {
    moveGrid(direction);
  }
}

// start the game
createGrid();
document.addEventListener('keydown', handleKeyPress);
