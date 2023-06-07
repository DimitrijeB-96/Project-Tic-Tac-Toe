"use strict";

const Player = (name, marker) => {
  let _name = name;
  let _marker = marker;

  const getName = () => _name;
  const getMarker = () => _marker;

  return {
    getName,
    getMarker
  }
}

const Board = (function() {
  const _board = ['', '', '', '', '', '', '', '', ''];

  const _winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const getWinningCondtions = () => _winningConditions;

  const getBoard = () => _board;

  const setBoard = (i, value) => {
    _board[i] = value; 
    console.log("Current board is: ", _board); // Remove later
  }

  const restartBoard = () => {
    for (let i = 0; i < _board.length; i++) {
      _board[i] = '';
    }
  }

  return {
    getBoard,
    setBoard,
    restartBoard,
    getWinningCondtions,
  }
})();

const GameController = (function() {
  const board = Board;

  let _gameOver = false;

  let _round = 1;

  let p1;
  let playerX = [];

  let p2;
  let playerO = [];

  let _currentPlayerMarker;

  let _currentPlayerName;

  const startGame = (firstPlayer, secondPlayer) => {
    const _first = Player(firstPlayer, 'X');
    const _second = Player(secondPlayer, 'O');

    setPlayers(_first, _second);
  };

  const setPlayers = (_first, _second) => {
    p1 = _first;
    p2 = _second;

    _currentPlayerMarker = p1.getMarker();
    _currentPlayerName = p1.getName();
  }

  const getRound = () => _round;

  const nextRound = () => _round++;

  const getCurrentPlayerMarker = () => _currentPlayerMarker;

  const getFirstPlayer = () => p1;

  const getSecondPlayer = () => p2;

  const nextPlayerMarker = () => {
    _currentPlayerMarker = _currentPlayerMarker === p1.getMarker() ? p2.getMarker() : p1.getMarker();
    return _currentPlayerMarker;
  };

  const nextPlayerName = () => {
    _currentPlayerName = _currentPlayerName === p1.getName() ? p2.getName()  : p1.getName() ;
    return _currentPlayerName;
  };

  const setFirstPlayerMarker = () => {
    _currentPlayerMarker = p1.getMarker();
    return _currentPlayerMarker;
  }

  function storePlayersMarkers() {
    const getBoard = board.getBoard();

    for (let i = 0; i < getBoard.length; i++) {
      if ( getBoard[i] === 'X') {
        if (!playerX.includes(i)) {
          playerX.push(i);
          playerX.sort();
        }
      } else if (getBoard[i] === 'O') {
        if (!playerO.includes(i)) {
          playerO.push(i);
          playerO.sort();
        }
      }
    }
  }

  const checkWinner = () => {
    let checkX = false;
    let checkO = false;
    let winner;
    const winningConditions = board.getWinningCondtions();
    const checkBoard = board.getBoard();

    for (let i = 0; i < winningConditions.length; i++) {
      checkX = winningConditions[i].every(el => playerX.includes(el));
      checkO = winningConditions[i].every(el => playerO.includes(el));

      if (checkX || checkO) {
        break;
      } 
    }

    if (checkX) {
      winner = p1.getMarker();
    } else if (checkO) {
      winner = p2.getMarker();
    } else if (checkBoard.includes('') === false) {
      winner = 'TIE';
    }

    return winner;
  };

  const gameOver = () => {
    _round = 1;
    _gameOver = true;
    return _gameOver;
  }

  const clearPlayers = () => {
    playerX = [];
    playerO = [];
  }

  return {
    startGame,
    getRound,
    nextRound,
    getFirstPlayer,
    getSecondPlayer,
    getCurrentPlayerMarker,
    nextPlayerMarker,
    nextPlayerName,
    setFirstPlayerMarker,
    checkWinner,
    storePlayersMarkers,
    clearPlayers,
    gameOver,
  }
})();

const ScreenController = (function() {
  const board = Board;
  const gameController = GameController;

  const displayMenuDiv = document.querySelector('.pop-up-menu');
  const backgroundDiv = document.createElement('div');
  const startGameBtn = document.querySelector('.btn-start');
  const firstPlayerName = document.getElementById('first-player');
  const secondPlayerName = document.getElementById('second-player');
  showMenu();

  startGameBtn.addEventListener('click', startGame);

  const displayTextForPlayer = document.querySelector('.current-player');
  const displayCurrentPlayer = document.querySelector('.current');

  const displayWinnerDiv = document.querySelector('.pop-up-winner');

  const displayWinnerH2 = document.querySelector('.show-winner-h1');
  const displayWinnerP = document.querySelector('.show-winner');

  const boardBox = document.querySelectorAll('.board-box');
  boardBox.forEach(box => box.addEventListener('click', play));

  const restartGameBtn = document.querySelector('.restart');
  restartGameBtn.addEventListener('click', restartGame);

  const newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', showMenu);

  function startGame() {
    gameController.startGame(firstPlayerName.value, secondPlayerName.value);
    hideMenu();
    restartGame();
    currentPlayerText(gameController.getFirstPlayer().getName());
  }

  function play(e) { 
    if (e.target.textContent === '') {
      e.target.textContent = gameController.getCurrentPlayerMarker();
      board.setBoard(e.target.id, gameController.getCurrentPlayerMarker());
      gameController.storePlayersMarkers();
      console.log(gameController.getRound());

      let check = gameController.checkWinner();
      if (check !== undefined && gameController.getRound() <= 9) {
        if (check === 'X') {
          displayGameOver(gameController.getFirstPlayer());
        } else if (check === 'O') {
          displayGameOver(gameController.getSecondPlayer());
        } else if (check === 'TIE') {
          displayGameOverWhenTie();
        }
        gameController.gameOver();
      } else {
        gameController.nextRound();
        gameController.nextPlayerMarker();
        currentPlayerText(gameController.nextPlayerName());
      }
    }
  }

  const playAgainBtn = document.querySelector('.play-again');
  playAgainBtn.addEventListener('click', playAgain);

  const menuBtn = document.querySelector('.menu');
  menuBtn.addEventListener('click', openMenu);

  function openMenu() {
    hideWinner();
    showMenu();
    restartGame();
  }

  function playAgain() {
    hideWinner();
    restartGame();
  }

  function displayGameOver(player) {
    hideCurrentPlayer();
    showWinner();

    displayWinnerH2.textContent = `Winner is `;
    displayWinnerP.textContent = `${player.getName()}`;
  }

  function displayGameOverWhenTie() {
    hideCurrentPlayer();
    showWinner();

    displayWinnerH2.textContent = '';
    displayWinnerP.textContent = `IT'S A TIE!`;
  }

  function showWinner() {
    displayWinnerDiv.style.display = 'flex';
    addBackground();
  }

  function hideWinner() {
    displayWinnerDiv.style.display = 'none';
    removeBackground();
  }

  function showMenu() {
    displayMenuDiv.style.display = 'flex';
    addBackground();
  }

  function hideMenu() {
    displayMenuDiv.style.display = 'none';
    removeBackground();
  }

  function addBackground() {
    document.body.appendChild(backgroundDiv);
    backgroundDiv.classList.add('pop-up-background');
  }

  function removeBackground() {
    backgroundDiv.classList.remove('pop-up-background');
  }

  function hideCurrentPlayer() {
    displayTextForPlayer.style.display = 'none';
  }

  function restartGame() {
    board.restartBoard();
    gameController.setFirstPlayerMarker();
    currentPlayerText(gameController.getFirstPlayer().getName());
    clearBoard();
    gameController.clearPlayers();
    gameController.gameOver();
  }

  function clearBoard() {
    for (let i = 0; i < boardBox.length; i++) {
      boardBox[i].textContent = '';
    }
  }

  function currentPlayerText(currentPlayer) {
    displayTextForPlayer.style.display = 'inline';
    displayCurrentPlayer.textContent = currentPlayer;
  }
})();
