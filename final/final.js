let score = 0; // Initialize score
let gridSize = 4; // Start with a 4x4 grid
let grid = []; // The main grid array

const gridContainer = document.getElementById('grid');
const restartButton = document.getElementById('restart');
const statusText = document.getElementById('status');

// Update the score display
function updateScore(points) {
  score += points;
  document.getElementById('score').textContent = score;

  // Check if the user wins
  if (score >= 2000) {
    endGame('win');
    return;
  }

  // Expand grid at specific thresholds
  if (score >= 500 && gridSize === 4) {
    gridSize = 5;
    expandGrid();
  } else if (score >= 1000 && gridSize === 5) {
    gridSize = 6;
    expandGrid();
  }
}

// End the game with a specific status
function endGame(status) {
  if (status === 'win') {
    statusText.textContent = 'Congratulations! You Win!';
  } else if (status === 'lose') {
    statusText.textContent = 'Game Over!';
  }

  document.removeEventListener('keydown', handleKeyPress); // Disable further moves
}

// Check game status (loss condition)
function checkGameStatus() {
  // Check if there are empty tiles
  if (grid.some(row => row.includes(0))) {
    return; // There are valid moves
  }

  // Check if adjacent tiles can be merged
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const currentTile = grid[r][c];

      // Check right and down neighbors (avoid checking out of bounds)
      if (
        (c < gridSize - 1 && currentTile === grid[r][c + 1]) || // Right neighbor
        (r < gridSize - 1 && currentTile === grid[r + 1][c])    // Down neighbor
      ) {
        return; // There are valid moves
      }
    }
  }

  // No valid moves left
  endGame('lose');
}

// Reset the game
restartButton.addEventListener('click', () => {
  score = 0;
  gridSize = 4; // Reset to 4x4 grid
  document.getElementById('score').textContent = score;
  createGrid();
  statusText.textContent = '';
  document.addEventListener('keydown', handleKeyPress);
});

// Initialize the grid
function createGrid() {
  grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  addNewTile();
  addNewTile();
  renderGrid();
}

// Expand the grid
function expandGrid() {
  const newGrid = Array.from({ length: gridSize }, (_, r) =>
    Array.from({ length: gridSize }, (_, c) => (grid[r] && grid[r][c] ? grid[r][c] : 0))
  );
  grid = newGrid;
  renderGrid();
}

// Render the grid
function renderGrid() {
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

// Add a new tile
function addNewTile() {
  const emptyCells = [];
  
  // Collect all empty cells in the current grid
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  
  // If there are no empty cells, do nothing
  if (emptyCells.length === 0) return;

  // Randomly pick an empty cell and assign it a value (2 or 4)
  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}


// Move the grid and merge tiles
function moveGrid(direction) {
  const previousGrid = JSON.stringify(grid); // Save the grid state

  for (let i = 0; i < gridSize; i++) {
    let line = direction === 'left' || direction === 'right'
      ? grid[i]
      : grid.map(row => row[i]);

    if (direction === 'right' || direction === 'down') line = line.reverse();

    const compacted = line.filter(v => v !== 0);
    for (let j = 0; j < compacted.length - 1; j++) {
      if (compacted[j] === compacted[j + 1]) {
        compacted[j] *= 2;
        updateScore(compacted[j]); // Add merged value to score
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
    renderGrid();
    checkGameStatus();
  }
}

// Check game status
function checkGameStatus() {
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

// Handle key presses
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

// Start the game
createGrid();
document.addEventListener('keydown', handleKeyPress);
