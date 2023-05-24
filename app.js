let gameStart = false;

// Factory Function
const Player = (playerMarker) => {
  return { playerMarker };
}

// Pop up menu IIFE Returning Module Function.
const GameOptions = (function() {
  'use strict';

  let playerOneMarker = 'O';
  let playerTwoMarker = 'X';

  // Option menu is show at web launch because this is inside IIFE Function.
  const menu = document.querySelector('.pop-up-div');

  // This div is used as an "background" behind Option menu and to prevent clicking at game board before game start.
  const background = document.createElement('div');

  openMenu();

  // Getting Radio buttons that are in same group to select whitch marker player will be using.
  const firstPlayerMarker = document.querySelectorAll('.first-player');
  const secondPlayerMarker = document.querySelectorAll('.second-player');

  // Radio buttons to determine which "game mode" player/players will be playing.
  const playerVsPlayer = document.getElementById('player-player');
  const playerVsEasy = document.getElementById('player-easy');
  const playerVsHard = document.getElementById('player-hard');

  // Event listener used for changing FIRST player marker
  firstPlayerMarker.forEach(change => change.addEventListener('change', () => {
    if (change.id === 'first-player-o') {
      document.getElementById('second-player-x').checked = true;
      playerOneMarker = 'O';
      playerTwoMarker = 'X';
    } else if (change.id === 'first-player-x') {
      playerOneMarker = 'X';
      playerTwoMarker = 'O';
      document.getElementById('second-player-o').checked = true;
    }
  }));

  // Event listener used for changing SECOND player marker
  secondPlayerMarker.forEach(change => change.addEventListener('change', () => {
    if (change.id === 'second-player-o') {
      playerOneMarker = 'X';
      playerTwoMarker = 'O';
      document.getElementById('first-player-x').checked = true; 
    } else if (change.id === 'second-player-x') {
      playerOneMarker = 'O';
      playerTwoMarker = 'X';
      document.getElementById('first-player-o').checked = true;
    }
  }));

  // Button from Pop-up menu, used to start game and hide menu window
  const startBtn = document.querySelector('.btn-start');
  startBtn.addEventListener('click', startGame);

  // Button from main screen, used to show menu
  const newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', openMenu);

  function startGame() {
    gameStart = true;
    menu.style.display = 'none';
    background.classList.remove('pop-up-background');
    p1();
    p2();
    // TODO
    if (playerVsPlayer.checked) {
      pvp();
    } else if (playerVsEasy.checked) {
      pve();
    } else if (playerVsHard.checked) {
      pvh();
    }
  }

  function pvp() {
    console.log('Player vs Player game mode');
  }

  function pve() {

  }

  function pvh() {

  }

  function p1() {
     const playerOne = Player(playerOneMarker);
     return playerOne.playerMarker;
  }

  function p2() {
    const playerTwo = Player(playerTwoMarker);
    return playerTwo.playerMarker;
  }

  function openMenu() {
    gameStart = false;
    menu.style.display = 'flex';
    background.classList.add('pop-up-background');
    document.body.appendChild(background);
  }

  return { p1, p2 };
})();

// Game Returning Board IIFE Module Function
const GameBoard = (function() {
  // Empty array used as an placehold for each cell in a board.
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  // TODO: Add winning conditions, and return them
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return { gameboard };
})();

// TODO: This function does so many things, it needs to be reworked and added 'GameController'
// IIFE Module Function used to render game at DOM
const DisplayController = (function() {
  'use strict';
  // Declared local property from "gameBoard" Function
  const _board = GameBoard.gameboard;

  let round = 1;

  const boardBox = document.querySelectorAll('.board-box');
  const showCurrentPlayer = document.querySelector('.current-player'); // TODO: Text Content at DOM that show who has a turn.

  // Assigned board cells from DOM to each index of gameboard array
  for (let i = 0; i < _board.length; i++) {
     boardBox[i].textContent = _board[i];
  }

  // TODO: Event listener that will add "O" or "X" to the board at DOM and board array
  boardBox.forEach(box => box.addEventListener('click', () => {
    const firstPlayer = GameOptions.p1();
    const secondPlayer = GameOptions.p2();

    let currentPlayer = firstPlayer;

    function changePlayer() {
      if (round % 2 === 1) {
        currentPlayer = firstPlayer;
      } else {
        currentPlayer = secondPlayer;
      }

      round += 1;
      return currentPlayer;
    }

    if (box.textContent === '') {
      box.textContent = changePlayer();
    }
  }));

})();






