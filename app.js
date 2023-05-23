let gameStart = false;

// Factory Function
const player = (playerMarker) => {
  
  return { playerMarker };
}

// Pop up menu IIFE Returning Module Function.
const gameOptions = (function() {
  // Default values for players because this is inside IIFE Function.
  let playerOneMarker = 'O';
  let playerTwoMarker = 'X';

  // Option menu is show at web launch because this is inside IIFE Function.
  const menu = document.querySelector('.pop-up-div');
  menu.style.display = 'flex';
  if (menu.style.display === 'flex') {
    gameStart = false;
  }

  // This div is used as an "background" behind Option menu and to prevent clicking at game board before game start.
  const background = document.createElement('div');
  background.classList.add('pop-up-background');
  document.body.appendChild(background);

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
    if (playerVsPlayer.checked) {

    } else if (playerVsEasy.checked) {

    } else if (playerVsHard.checked) {

    }
    gameStart = true;
    menu.style.display = 'none';
    background.classList.remove('pop-up-background');
  }

  function openMenu() {
    menu.style.display = 'flex';
    background.classList.add('pop-up-background');
  }

  return {playerOneMarker, playerTwoMarker}; // TODO: figure out which returning parameters to return
})();

// Game Board Returning IIFE Module Function
const gameBoard = (function() {
  // Empty array used as an placehold for each cell in a board.
  const gameboard = ['', '', '', '', '', '', '', '', ''];

    // TODO: figure out how to determine when game should start since this is in IIFE Function and it won't get values
    if (gameStart === true) {
      const firstPlayer = player(gameOptions.playerOneMarker);
      console.log(firstPlayer.playerMarker);
      const secondPlayer = player(gameOptions.playerTwoMarker);
      console.log(secondPlayer.playerMarker);
    }

    // TODO: Add winning conditions, and return them

  return {gameboard};
})();

// Returning IIFE Module Function used to render game at DOM
const displayController = (function() {
  // Declare local property from "gameBoard" Function
  const _board = gameBoard.gameboard;

  //
  const boardBox = document.querySelectorAll('.board-box');
  const currentPlayer = document.querySelector('.current-player'); // TODO: Text Content at DOM that show who has a turn.

  // Assigned board cells from DOM to each index of gameboard array
  for (let i = 0; i < _board.length; i++) {
     boardBox[i].textContent = _board[i];
  }

  // TODO: ADD change player function 
  boardBox.forEach(box => box.addEventListener('click', (e) => {
    if (box.textContent === '') {
      box.textContent = jeff.playerMarker; // This was just a test that didn't work
      _board[e.target.id] = box.textContent;
      currentPlayer.textContent = `Current player is ${jeff.playerMarker}`;
      console.log(e.target.id);
      jeff.changeMarker();
    }
  }));
  
})();






