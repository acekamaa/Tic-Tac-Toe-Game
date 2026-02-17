// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const statusText = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  const players = { X: 'Player 1', O: 'Player 2' };

  // Add click listeners
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      Game.playTurn(index);
      render();
    });
  });

  // Restart button
  restartBtn.addEventListener('click', () => {
    Game.reset();
    render();
  });

  function render() {
    const board = Game.getBoard();
    const winner = Game.getWinner();
    const currentPlayer = Game.getCurrentPlayer();

    // Update cells
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      if (board[index] || winner) {
        cell.style.pointerEvents = 'none';
        cell.style.cursor = 'not-allowed';
      } else {
        cell.style.pointerEvents = 'auto';
        cell.style.cursor = 'pointer';
      }
    });

    // Update status text
    if (winner === 'draw') {
      statusText.textContent = "It's a draw!";
    } else if (winner) {
      statusText.textContent = `${players[winner]} wins!`;
    } else {
      statusText.textContent = `${players[currentPlayer]}'s turn`;
    }
  }

  // Initial render
  render();
});
