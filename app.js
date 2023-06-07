"use strict";

const boardBox = document.querySelectorAll('.board-box');

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

  function restartGame() {
    board.restartBoard();
    setFirstPlayerMarker();
    clearPlayers();
    gameOver();
  }

  return {
    startGame,
    restartGame,
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

const RenderController = (function() {
  const displayTextForPlayer = document.querySelector('.current-player');
  const displayCurrentPlayer = document.querySelector('.current');

  const backgroundDiv = document.createElement('div');

  function currentPlayerText(currentPlayer) {
    displayTextForPlayer.style.display = 'inline';
    displayCurrentPlayer.textContent = currentPlayer;
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

  function clearBoard() {
    for (let i = 0; i < boardBox.length; i++) {
      boardBox[i].textContent = '';
    }
  }

  return {
    currentPlayerText,
    hideCurrentPlayer,
    addBackground,
    removeBackground,
    clearBoard,
  }
})();

const MenuController = (function() {
  const board = Board; /////////////////////////
  const game = GameController;
  const render = RenderController;

  const displayMenuDiv = document.querySelector('.pop-up-menu');

  const firstPlayerName = document.getElementById('first-player');
  const secondPlayerName = document.getElementById('second-player');

  const startGameBtn = document.querySelector('.btn-start');
  startGameBtn.addEventListener('click', startGame);

  const getFirstPlayer = () => firstPlayerName;

  function startGame() { 
    game.startGame(firstPlayerName.value, secondPlayerName.value);
    hideMenu();
    game.restartGame();
    render.currentPlayerText(firstPlayerName.value);
  }

  const chooseOpponent = document.querySelectorAll('.choose-opponent');
  chooseOpponent.forEach(opponent => opponent.addEventListener('click', checkOpponent));

  const playerVsPlayer = document.getElementById('player-player');
  const playerVsEasy = document.getElementById('player-easy');
  const playerVsHard = document.getElementById('player-hard');

  function checkOpponent(e) {
    let whoIsOpponent = e.target.id;
    if (whoIsOpponent === 'player-player') {
      enableSecondPlayer();
    } else if (whoIsOpponent === 'player-easy') {
      disableSecondPlayer('Easy');
    } else if (whoIsOpponent === 'player-hard') {
      disableSecondPlayer('Hard') 
    }
    return whoIsOpponent; // ???
  }

  function disableSecondPlayer(whichBot) {
    secondPlayerName.disabled = true;
    secondPlayerName.value = `${whichBot} AI`;
  }

  function enableSecondPlayer() {
    secondPlayerName.disabled = false;
    secondPlayerName.value = '';
  }

  function showMenu() {
    displayMenuDiv.style.display = 'flex';
    render.addBackground();
  }

  function hideMenu() {
    displayMenuDiv.style.display = 'none';
    render.removeBackground();
  }

  return {
    getFirstPlayer,
    showMenu,
    hideMenu,
  }
})();

const WinnerController = (function() {
  const game = GameController;
  const render = RenderController;
  const menu = MenuController;

  const displayWinnerDiv = document.querySelector('.pop-up-winner');

  const displayWinnerH2 = document.querySelector('.show-winner-h1');
  const displayWinnerP = document.querySelector('.show-winner');

  const playAgainBtn = document.querySelector('.play-again');
  playAgainBtn.addEventListener('click', playAgain);

  const menuBtn = document.querySelector('.menu');
  menuBtn.addEventListener('click', openMenu);

  function displayGameOver(player) {
    render.hideCurrentPlayer();
    showWinner();

    displayWinnerH2.textContent = `Winner is `;
    displayWinnerP.textContent = `${player.getName()}`;
  }

  function displayGameOverWhenTie() {
    render.hideCurrentPlayer();
    showWinner();

    displayWinnerH2.textContent = '';
    displayWinnerP.textContent = `IT'S A TIE!`;
  }

  function showWinner() {
    displayWinnerDiv.style.display = 'flex';
    render.addBackground();
  }

  function hideWinner() {
    displayWinnerDiv.style.display = 'none';
    render.removeBackground();
  }

  function openMenu() {
    hideWinner();
    menu.showMenu(); 
    game.restartGame();
    render.clearBoard();
  }

  function playAgain() {
    hideWinner();
    game.restartGame();
    render.currentPlayerText(menu.getFirstPlayer().value);
    render.clearBoard();
  }

  return {
    displayGameOver,
    displayGameOverWhenTie,
    hideWinner, /////// ?????
    showWinner,
  }
})();

const ScreenController = (function() {
  const board = Board;
  const game = GameController;
  const menu = MenuController;
  const render = RenderController;
  const win = WinnerController;

  menu.showMenu();

  boardBox.forEach(box => box.addEventListener('click', play));

  const restartGameBtn = document.querySelector('.restart');
  restartGameBtn.addEventListener('click', restartGame);

  const newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', openMenu);

  function play(e) { 
    if (e.target.textContent === '') {
      e.target.textContent = game.getCurrentPlayerMarker();
      board.setBoard(e.target.id, game.getCurrentPlayerMarker());
      game.storePlayersMarkers();
      console.log(game.getRound());

      let check = game.checkWinner();
      if (check !== undefined && game.getRound() <= 9) {
        if (check === 'X') {
          win.displayGameOver(game.getFirstPlayer());
        } else if (check === 'O') {
          win.displayGameOver(game.getSecondPlayer());
        } else if (check === 'TIE') {
          win.displayGameOverWhenTie();
        }
        game.gameOver();
      } else {
        game.nextRound();
        game.nextPlayerMarker();
        render.currentPlayerText(game.nextPlayerName());
      }
    }
  }

  function openMenu() {
    win.hideWinner();
    menu.showMenu(); 
    game.restartGame();
    render.clearBoard();
  }

  function restartGame() {
    game.restartGame();
    render.currentPlayerText(game.getFirstPlayer().getName());
    render.clearBoard();
  }
})();
