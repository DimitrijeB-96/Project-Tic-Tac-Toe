isGameStarted = false;

const Player = (marker) => {
  let _name;
  let _marker = marker;

  function setName(value) {
    _name = value;
    
    return _name;
  }

  const getName = () => _name;

  const getMarker = () => _marker;

  return {
    setName,
    getName,
    getMarker,
  }
}

const p1 = Player('X');
const p2 = Player('O');

function GameMenu() {
  'use strict';

  function setFirstPlayerName(value) {
    p1.setName(value);
  }

  function setSecondPlayerName(value) {
    p2.setName(value);
  }

  return {
    setFirstPlayerName,
    setSecondPlayerName,
  }
}

function GameMenuRender() {
  'use strict';

  const menu = GameMenu();

  const firstPlayerName = document.querySelector('.first-player');
  const secondPlayerName = document.querySelector('.second-player');
  const currentPlayerText = document.querySelector('.current-player');
  const currentPlayer = document.querySelector('.current');

  const displayGameMenu = document.querySelector('.pop-up-div');
  const background = document.createElement('div');

  const startGameBtn = document.querySelector('.btn-start');
  startGameBtn.addEventListener('click', startGame);


  function displayMenu() {
    displayGameMenu.style.display = 'flex';
    displayMenuBackground();
    displayCurrentPlayerText('none');
    isGameStarted = false;
  }

  function hideMenu() {
    displayGameMenu.style.display = 'none';
    background.classList.remove('pop-up-background');
  }

  function displayMenuBackground() {
    background.classList.add('pop-up-background');
    document.body.appendChild(background);
  }

  function displayCurrentPlayerText(value) {
    currentPlayerText.style.display = value;
  }

  function startGame() {
    hideMenu();
    isGameStarted = true;
    menu.setFirstPlayerName(firstPlayerName.value);
    menu.setSecondPlayerName(secondPlayerName.value);
    displayCurrentPlayerText('block');
    currentPlayer.textContent = firstPlayerName.value;
  }

  return {
    displayMenu,
    currentPlayer,
    currentPlayerText
  }
}

function Board() {
  'use strict';

  const board = ['', '', '', '', '', '', '', '', ''];

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

  return {
    board,
    winningConditions,
  }
}

const BoardRender = (function() {
  'use strict';

  const board = Board();
  const displayMenu = GameMenuRender();

  const displayBoard = document.querySelectorAll('.board-box');

  let currentPlayerMarker = p1.getMarker();

  let currentPlayerName = p1.getName();

  function changePlayerMarker() {
    currentPlayerMarker = currentPlayerMarker === p1.getMarker() ? p2.getMarker() : p1.getMarker();

    return currentPlayerMarker;
  }

  function changePlayerName() {
    currentPlayerName = currentPlayerName === p1.getName() ? p2.getName() : p1.getName();

    return currentPlayerName;
  }

  displayBoard.forEach(box => box.addEventListener('click', (e) => {
    if (isGameStarted !== false) {
      if (e.target.textContent === '') {
        displayMenu.currentPlayer.textContent = currentPlayerName;
        box.textContent = currentPlayerMarker;
        board.board[e.target.id] = currentPlayerMarker;
        changePlayerMarker();
        changePlayerName();
        console.log(board.board);
      }
      return board;
    }
  }));

  return {
    displayBoard,
    currentPlayerName,
  }
})();

const MainScreen = (function() {
  'use strict';

  const menu = GameMenu();
  const displayMenu = GameMenuRender();

  const board = Board();
  const displayBoard = BoardRender;

  const newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', openMenu);

  const restartBtn = document.querySelector('.restart');
  restartBtn.addEventListener('click', restartGame);

  function openMenu() {
    displayMenu.displayMenu();
  }

  // TODO
  function restartGame() {
    for(let i = 0; i < board.board.length; i++) {
      displayBoard.displayBoard[i].textContent = '';
      displayBoard.currentPlayerName = p1.getName();
      displayMenu.currentPlayer.textContent = p1.getName();

      board.board[i] = '';
    }
    console.log(board.board);
    return board;
  }
})();

