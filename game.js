const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const treeImg = document.querySelector('#imgTree');
const groundImg = document.querySelector('#imgGround');
const playerImg = document.querySelector('#imgPlayer');
const gameScore = document.querySelector('#gameScore');
const levelInfo = document.querySelector('#levelInfo');
const highScoreInfo = document.querySelector('#highScore');
const currHighScore = localStorage.getItem('highScore');
const endGame = document.querySelector('#endGame');
const endGameHeader = document.querySelector('#endGameHeader');
const endGameBody = document.querySelector('#endGameBody');
var modal = document.getElementById("myModal");
var btnStart = document.querySelector(".close");

let player;
let obstacles;
let backgrounds; 
let spcBtwnObs;
let pathWidth;
let gamePoints;

const endQotes = ['Oczom ich ukazał się las...',
                  'Bunkrów nie ma...',
                  'O, jakie ładne drzewo!',
                  'Teraz już wiem jak się czuli ci w Rospudzie...',
                  'Jaka ta kora jest smaczna, ile witamin!',
                  'Postanowiłem zostać drwalem, zacznę od tego drzewa!'];


class GameObject {
    constructor(x, y , width , height, image){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = image;
    } 
}

class Player extends GameObject {
    constructor(x, y){
        super(x, y , 48, 54, playerImg);  
        this.speedX = 0;
        this.speedY = 0; 
    }

    init(ctx,animCount,animModif){
        ctx.drawImage(this.image, 16*animCount, 18*animModif, 16, 18, this.x, this.y, 48, 54);
      } 

    newPos(){
        this.x += this.speedX; 
        this.y += this.speedY;  
    }
  }

class Obstacle extends GameObject {
  constructor(x, y, width, height, image) {
    super(x, y, width, height, image);
  }

  init(ctx){
    for(var h = 0; h < this.height; h += this.image.height) {
      for(var w = 0; w < this.width; w += this.image.width) {
        ctx.drawImage(this.image, this.x+w, this.y+h);
      }
    }
  } 

  update(){
    this.y += 2; // speed of obstacle
  }    
}

function createNewObstacle(pathWidth){
  const randomOne = Math.floor(Math.random() * ((gameWidth-pathWidth)/20)) * 20; // losowa szerokość pierwszej przeszkody 
  const randomTwo = num => num >= gameWidth - pathWidth ? 0 : num + pathWidth; // początek drugiej przeszkody w zależności od tego jaką długość ma przeszkoda pierwsza
  const obstacleOne = new Obstacle(0, -80, randomOne, 80,treeImg);
  const obstacleTwo = new Obstacle(randomTwo(randomOne), -80, gameWidth - randomTwo(randomOne), 80,treeImg);
  obstacles.push([obstacleOne,obstacleTwo]);   
}

function createNewBackground(){
  const bckgr = new Obstacle(0, -800, 800, 800,groundImg);
  backgrounds.push(bckgr);
}

let animationModifier = 1;

document.addEventListener('keydown', function (element) {
    event.preventDefault();
    if (element.code === "ArrowLeft") {
        player.speedX = -4;
        animationModifier = 2;     
    }
    if (element.code === "ArrowRight") {
        player.speedX = 4;
        animationModifier = 3;      
    }  
    if (element.code === "ArrowUp") {
        player.speedY = -2;
        animationModifier = 1;
    }
    if (element.code === "ArrowDown") {
        player.speedY = 3;
        animationModifier = 0;
    }
});

document.addEventListener('keyup', function (element) {
    if (element.code === "ArrowLeft") {
        player.speedX = 0;
        animationModifier = 1;   
    }
    if (element.code === "ArrowRight") {
        player.speedX = 0;
        animationModifier = 1;     
    }  
    if (element.code === "ArrowUp") {
        player.speedY = 0;
        animationModifier = 1;
    }
    if (element.code === "ArrowDown") {
        player.speedY = 0;
        animationModifier = 1;
    }
});


window.onload = function() {
  resetGame();
  modal.style.display = "block";
}

btnStart.onclick = function() {
  modal.style.display = "none";
}

const animationCount = [0,1,0,2];
let animTimer = 0;

function animationFrame() { 
    
  checkCollision();

  switch(gamePoints){
    case 1500:
      spcBtwnObs -= 20;
      pathWidth -= 20;
      levelInfo.innerHTML = 'Poziom 2';
      break;
    case 3000:
      spcBtwnObs -= 20;
      pathWidth -= 20;
      levelInfo.innerHTML = 'Poziom 3';
      break;
    case 4500:
      spcBtwnObs -= 20;
      pathWidth -= 20;
      levelInfo.innerHTML = 'Poziom 4';
      break;
    case 6000:
      spcBtwnObs -= 20;
      pathWidth -= 20;
      levelInfo.innerHTML = 'Poziom 5';
      break;
    case 7500:
      spcBtwnObs -= 10;
      pathWidth -= 10;
      levelInfo.innerHTML = 'Poziom 6';
      break;
    case 9000:
      spcBtwnObs -= 10;
      pathWidth -= 10;
      levelInfo.innerHTML = 'Poziom 7';
      break;       
  }

  const gameDistance = `Dystans: ${(gamePoints/1000).toFixed(1)} km`; // wyświetlanie wyniku gracza 
  
  if(gameDistance !== gameScore.innerHTML){ // odświeżanie wyniku gracza
    
    gameScore.innerHTML = gameDistance;

  }

  ctx.clearRect(0, 0, gameWidth, gameHeight);

  if(backgrounds[backgrounds.length-1].y >= 0){
    createNewBackground();  
  }

  if(backgrounds[0].y >= gameHeight){
    backgrounds.shift();  
  }

  if(obstacles[obstacles.length-1][0].y >= spcBtwnObs){
    createNewObstacle(pathWidth);  
  }

  if(obstacles[0][0].y >= gameHeight){
    obstacles.shift();  
  }

  if(backgrounds.length!==0){
    backgrounds.forEach(element=>{
      element.init(ctx);
      element.update();
    });
  }

  if(obstacles.length!==0){
    obstacles.forEach(element=>{
      element[0].init(ctx);
      element[1].init(ctx);
      element[0].update();
      element[1].update();
    });
  }

  animTimer = animTimer > 3 ? 0 : animTimer;

  player.init(ctx,animationCount[animTimer],animationModifier);
  player.newPos(ctx);
  
  if(gamePoints%10===0){
    animTimer++;
  }

  gamePoints++;
 
}
let refreshFrame;

btnStart.addEventListener('click', () => {
  refreshFrame = setInterval(animationFrame, 25)
}); // setInterval odświeża canvas 40 razy na sekundę

function checkCollision() {
  const playerTop = player.y + player.height/2;
  const playerBottom = player.y + player.height;
  const playerLeft = player.x + player.width/4;
  const playerRight = player.x + player.width*(3/4);

  if (playerTop <= 0 ||
      playerBottom >= gameHeight ||
      playerLeft <= 0 ||
      playerRight >= gameWidth) {
          console.log("kolizja");
          clearInterval(refreshFrame);  
          saveScoreReset();
      }
  
  obstacles.forEach(el=>{
    el.forEach(el=>{  
      const topObstacle = el.y;
      const bottomObstacle = el.y + el.height;
      const leftObstacle = el.x;
      const rightObstacle = el.x + el.width;
      
      if ((bottomObstacle > playerTop &&
          topObstacle < playerBottom) &&
          (leftObstacle < playerRight &&
          rightObstacle > playerLeft)) {
          console.log("kolizja");
          clearInterval(refreshFrame);
          saveScoreReset(); 
      }
    });
  });

};

const saveScoreReset = () => {

  const score = (gamePoints/1000).toFixed(1);

  const newGameBtn = document.createElement('button');
  newGameBtn.innerText = 'Nowa gra';
  newGameBtn.addEventListener('click',()=>{
    endGame.style.display = "none";
    
    resetGame();

    refreshFrame = setInterval(animationFrame, 20);
  });

  endGameHeader.innerHTML = `<h2>${endQotes[Math.floor(Math.random()*endQotes.length)]}</h2>`;
  endGameBody.innerHTML = `<p>Dystans który pokonałeś to: ${score} km</p>`;

  if(score>currHighScore){
    localStorage.setItem('highScore', score);
    const newHighScore = document.createElement('p');
    newHighScore.innerHTML = 'Nowy najwyższy wynik.';
    endGameBody.appendChild(newHighScore);
  }
  endGameBody.appendChild(newGameBtn);
  endGame.style.display = "block";
};

function resetGame() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  obstacles = [];
  backgrounds = [];
  gamePoints = 0;
  spcBtwnObs = 200;
  pathWidth = 200;
  player = new Player(376, 736);
  createNewObstacle(pathWidth);
  createNewBackground();
  backgrounds[0].y = 0;

  if (backgrounds.length !== 0) {
    backgrounds.forEach(element => {
      element.init(ctx);
    });
  }

  if (obstacles.length !== 0) {
    obstacles.forEach(element => {
      element[0].init(ctx);
      element[1].init(ctx);
    });
  }

  player.init(ctx,0,1);

  gameScore.innerHTML = 'Dystans: 0.0 km'
  levelInfo.innerHTML = "Poziom 1";
  highScoreInfo.innerHTML = `Najlepszy wynik: ${localStorage.getItem('highScore')||'0'} km`;
};