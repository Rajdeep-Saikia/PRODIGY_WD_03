const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
};

const checkResult = () => {
  let roundWon = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      highlightWinnerCells(pattern);
      break;
    }
  }

  if (roundWon) {
    status.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s Turn`;
};

const highlightWinnerCells = (pattern) => {
  pattern.forEach(index => {
    cells[index].classList.add("win");
  });
};

const restartGame = () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  status.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
