// Factory Function
const player = (playerMarker) => {
  
  function changeMarker() {
    if (playerMarker === 'X') {
      playerMarker = 'O';
    } else {
      playerMarker = 'X';
    }

    return playerMarker;
  }

  return { changeMarker, playerMarker };
}

// Pop up menu Module Function
const gameOptions = (function() {
  const menu = document.querySelector('.pop-up-div');
  menu.style.display = 'flex';

  const background = document.createElement('div');
  background.classList.add('pop-up-background');
  document.body.appendChild(background);

  const firstPlayerMarker = document.querySelectorAll('.first-player');
  const secondPlayerMarker = document.querySelectorAll('.second-player');

  firstPlayerMarker.forEach(change => change.addEventListener('change', () => {
    if (change.id === 'first-player-o') {
      document.getElementById('second-player-x').checked = true;
    } else if (change.id === 'first-player-x') {
      document.getElementById('second-player-o').checked = true;
    }
  }));

  secondPlayerMarker.forEach(change => change.addEventListener('change', () => {
    if (change.id === 'second-player-o') {
      document.getElementById('first-player-x').checked = true;
    } else if (change.id === 'second-player-x') {
      document.getElementById('first-player-o').checked = true;
    }
  }));

  const startBtn = document.querySelector('.btn-start');

  startBtn.addEventListener('click', () => {
    console.log("yo");
    menu.style.display = 'none';
    background.remove();
  });

  return {firstPlayerMarker, secondPlayerMarker};

})();

// Returning Module Function
const gameBoard = (function() {
  // Empty array where each element represent each cell of the board
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  return { gameboard };
})();

// Returning Module Function
const displayController = (function() {
  const _board = gameBoard.gameboard;

  const board = document.querySelector('.board'); // ?
  const boardBox = document.querySelectorAll('.board-box');
  const currentPlayer = document.querySelector('.current-player'); // TODO

  for (let i = 0; i < _board.length; i++) {
     boardBox[i].textContent = _board[i];
  }

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






