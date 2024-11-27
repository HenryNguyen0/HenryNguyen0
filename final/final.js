// script.js
const gridContainer = document.getElementById('grid');
const restartButton = document.getElementById('restart');
const statusText = document.getElementById('status');

let grid = [];

// Initialize the grid
function createGrid() {
  grid = Array.from({ length: 4 }, () => Array(4).fill(0)); // Create a 4x4 grid of zeros
  addNewTile();
  addNewTile();
  renderGrid();
}

// Render the grid visually
function renderGrid() {
  gridContainer.innerHTML = ''; // Clear the grid container
  for (let row of grid) {
    for (let cell of row) {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.textContent = cell === 0 ? '' : cell; // Display number or leave blank for 0
      cellDiv.classList.toggle('empty', cell === 0); // Apply 'empty' class for styling
      gridContainer.appendChild(cellDiv);
    }
  }
}

// Add a new tile (2 or 4) in a random empty position
function addNewTile() {
  const emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  if (emptyCells.length === 0) return; // No space for new tiles

  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

// Move and merge tiles in a specific direction
function moveGrid(direction) {
    const previousGrid = JSON.stringify(grid); // Save the grid state before the move
    let moved = false;
  
    for (let i = 0; i < 4; i++) {
      let line = direction === 'left' || direction === 'right'
        ? grid[i]
        : grid.map(row => row[i]);
  
      if (direction === 'right' || direction === 'down') line = line.reverse();
  
      // Compact tiles and merge
      const compacted = line.filter(v => v !== 0);
      for (let j = 0; j < compacted.length - 1; j++) {
        if (compacted[j] === compacted[j + 1]) {
          compacted[j] *= 2;
          updateScore(compacted[j]); // Add merged tile value to score
          compacted.splice(j + 1, 1);
          compacted.push(0);
        }
      }
      const newLine = [...compacted, ...Array(4 - compacted.length).fill(0)];
      if (direction === 'right' || direction === 'down') newLine.reverse();
  
      // Place new line into the grid
      for (let j = 0; j < 4; j++) {
        const value = direction === 'left' || direction === 'right' ? grid[i][j] : grid[j][i];
        if (value !== newLine[j]) moved = true; // Track if any changes occurred
        if (direction === 'left' || direction === 'right') {
          grid[i][j] = newLine[j];
        } else {
          grid[j][i] = newLine[j];
        }
      }
    }
  
    const currentGrid = JSON.stringify(grid); // Save the grid state after the move
    if (currentGrid !== previousGrid) {
      addNewTile(); // Only add a new tile if the grid changed
      renderGrid();
      checkGameStatus();
    }
  }
  

// Check game status: win or lose
function checkGameStatus() {
  // Check for a winning tile (2048)
  if (grid.some(row => row.includes(2048))) {
    statusText.textContent = 'You Win!';
    document.removeEventListener('keydown', handleKeyPress);
    return;
  }

  // Check for possible moves or empty cells
  const movesLeft = grid.some((row, r) =>
    row.some((cell, c) => cell === 0 || (c < 3 && cell === grid[r][c + 1]) || (r < 3 && cell === grid[r + 1][c]))
  );

  if (!movesLeft) {
    statusText.textContent = 'Game Over!';
    document.removeEventListener('keydown', handleKeyPress);
  }
}

// Handle key press to move tiles
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

// Event listeners
restartButton.addEventListener('click', () => {
  createGrid();
  statusText.textContent = '';
  document.addEventListener('keydown', handleKeyPress);
});

document.addEventListener('keydown', handleKeyPress);

// Start the game
createGrid();

let score = 0; // Initialize score

// Update the score display
function updateScore(points) {
  score += points;
  document.getElementById('score').textContent = score;
}

// Reset the game and score
restartButton.addEventListener('click', () => {
  score = 0; // Reset score
  document.getElementById('score').textContent = score;
  createGrid();
  statusText.textContent = '';
  document.addEventListener('keydown', handleKeyPress);
});

// Move and merge tiles with scoring
function moveGrid(direction) {
  let moved = false;

  for (let i = 0; i < 4; i++) {
    let line = direction === 'left' || direction === 'right'
      ? grid[i]
      : grid.map(row => row[i]);

    if (direction === 'right' || direction === 'down') line = line.reverse();

    // Compact tiles and merge
    const compacted = line.filter(v => v !== 0);
    for (let j = 0; j < compacted.length - 1; j++) {
      if (compacted[j] === compacted[j + 1]) {
        compacted[j] *= 2;
        updateScore(compacted[j]); // Add merged tile value to score
        compacted.splice(j + 1, 1);
        compacted.push(0);
      }
    }
    const newLine = [...compacted, ...Array(4 - compacted.length).fill(0)];
    if (direction === 'right' || direction === 'down') newLine.reverse();

    // Place new line into the grid
    for (let j = 0; j < 4; j++) {
      const value = direction === 'left' || direction === 'right' ? grid[i][j] : grid[j][i];
      if (value !== newLine[j]) moved = true;
      if (direction === 'left' || direction === 'right') {
        grid[i][j] = newLine[j];
      } else {
        grid[j][i] = newLine[j];
      }
    }
  }

  if (moved) {
    addNewTile();
    renderGrid();
    checkGameStatus();
  }
}

