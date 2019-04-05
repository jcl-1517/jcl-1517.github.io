//Variables that will be used later on
let lives = 5;
let livesCount = document.querySelector('.lives');
let moves = 0;
let count = document.querySelector('.moves');
let clock = document.querySelector('.clock');
let arrivals = 0;
let arrivalCounter = document.querySelector('.arrivals');
let winnerMessage = document.querySelector('.resultsTable');
let loseMessage = document.querySelector('.loseTable');
let board = document.querySelector('.board');



// Enemies our player must avoid
var Enemy = function(x, y, velocity) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.velocity = randomBugs(100, 300);
  this.x = x;
  this.y = y;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.velocity * dt;
  if (this.x > 550) {
    this.x = -150;
  }
  // To detect when bugs run over player and make it go back to start.
  if (Math.abs(this.x - player.x) < 75 &&
    Math.abs(this.y - player.y) < 78) {
    player.x = 202;
    player.y = 405;
    countLives()
  }
};

//Function to substract a live when player crashes with bug
var countLives = function() {
  lives--
  livesCount.innerHTML = lives + " Lives"
  if (lives === 0) {
    youLost()
  }
}

//Function to count the water arrivals needed to win the name
var waterArrivals = function() {
  if (player.y < 0) {
    arrivals++
    arrivalCounter.innerHTML = arrivals + " Arrivals";
    player.y = 400;
    player.x = 100;
  }
}

//Function to count the moves the player does
var countMoves = function() {
  moves++;
  count.innerHTML = moves + " Moves";
  //Activates the timing when player makes first move
  if (moves == 1) {
    seconds = 0;
    minutes = 0;
    interval = setInterval(timing, 1000);
  }
};

//Function to initiate the timer
var seconds = 0;
var minutes = 0;
var interval;
var timing = function() {
  clock.innerHTML = minutes + " minutes " + seconds + " seconds";
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
};

//Function that appears once the player wins and shows statistics of the game
function youWin() {
  if (arrivals === 2) {
    winnerMessage.setAttribute('style', 'opacity: 1; z-index: 1;')
    board.setAttribute('style', 'opacity: 0.3;')
    document.getElementById('winMoves').innerHTML = moves;
    document.getElementById('winTime').innerHTML = clock.innerHTML;
    document.getElementById('winLives').innerHTML = livesCount.innerHTML;
  }
};

//Function that appears when a player loses all the lives
function youLost() {
  loseMessage.setAttribute('style', 'opacity: 1; z-index: 1;')
  board.setAttribute('style', 'opacity: 0.3;')
};

document.getElementById('playAgainButton').addEventListener('click', function() {
  location.reload();
});
document.getElementById('TryAgainButton').addEventListener('click', function() {
  location.reload();
});

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x,
    this.y
  );
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

Player.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x,
    this.y,
  );
};

Player.prototype.handleInput = function(key) {
  //conditions to start/stop the keystroke, move the player, and count moves and arrivals
  switch (key) {
    case 'up':
      this.y -= 85;
      countMoves();
      waterArrivals();
      youWin()
      break;
    case 'down':
      this.y += 85;
      countMoves();
      waterArrivals();
      youWin()
      break;
    case 'right':
      this.x += 100;
      countMoves();
      waterArrivals();
      youWin()
      break;
    case 'left':
      this.x -= 100;
      countMoves();
      waterArrivals();
      youWin()
      break;
  }
  //Implemented so the player doesn't go out of the canvas
  if (this.x <= 2) this.x = 2;
  if (this.x >= 400) this.x = 400;
  if (this.y >= 405 || this.y <= -85) this.y = 405;
  if (this.y < 0) player.score += 1;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  bug1 = new Enemy(0, 52),
  bug2 = new Enemy(0, 146),
  bug3 = new Enemy(0, 228),
  bug4 = new Enemy(0, 146),
  bug5 = new Enemy(0, 52)
];

var player = new Player(100, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//Function created to run the bugs at diffrent speeds
function randomBugs(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
