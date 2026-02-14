/* Gameboard is responsible for:
 * stroing the board
 * updating a cell
 * checkin if a move is valid
 * resetting a board
 */
const Gameboard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const placeMark = (index, mark) => {
    if (board[index] !== '') return false;
    board[index] = mark;
    return true;
  };

  const reset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, placeMark, reset };
})();

/** Player is responsible for:
 * Name
 * Marker (x or O)
 */

const Player = (name, marker) => {
  return { name, marker };
};

/** Game Controller is responsible for:
 *  Switching turns
 * checking for win/tie
 * Ending the game
 */
const Game = (() => {
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');

  let currentPlayer = player1;
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    return winningCombos.some((combo) =>
      combo.every((i) => Gameboard.getBoard()[i] === currentPlayer.marker)
    );
  };

  const checkTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== '');
  };

  const playTurn = (index) => {
    if (gameOver) return;

    const success = Gameboard.placeMark(index, currentPlayer.marker);
    if (!success) {
      console.log('Spot already taken');
      return;
    }

    console.log(Gameboard.getBoard());

    if (checkWin()) {
      console.log(`${currentPlayer.name} wins!`);
      gameOver = true;
      return;
    }

    if (checkTie()) {
      console.log("It's a tie!");
      gameOver = true;
      return;
    }

    switchPlayer();
    console.log(`Next turn: ${currentPlayer.name}`);
  };

  const restart = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
    console.log('Game restarted');
  };

  return { playTurn, restart };
})();
