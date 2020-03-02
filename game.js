const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const treeImg = document.querySelector('#imgTree');

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
    constructor(x, y, image){
        super(x, y , 30, 30, image);  
        this.speedX = 0;
        this.speedY = 0; 
    }

    init(ctx){
        ctx.fillStyle = 'black'; // bez tej deklaracji jeżeli drawImage
        ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
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
    for(var w = 0; w < this.width; w += this.image.width) {
        ctx.drawImage(this.image, this.x+w, this.y);
    }
  } 

  update(){
    this.y += 2; // speed of obstacle
  }    
}

const obstacles = [];

function createNewObstacle(){
  const randomOne = Math.floor(Math.random() * 35) * 20; // losowa szerokość pierwszej przeszkody od 0 do 720 co 10
  const randomTwo = num => num >= 720 ? 0 : num + 100; // początek drugiej przeszkody w zależności od tego jaką długość ma przeszkoda pierwsza
  const obstacleOne = new Obstacle(0, -40, randomOne, 40,treeImg);
  const obstacleTwo = new Obstacle(randomTwo(randomOne), -40, gameWidth - randomTwo(randomOne), 40,treeImg);
  obstacles.push([obstacleOne,obstacleTwo]); 
  checkCollision();     
}

const player = new Player (380, 760); 



document.addEventListener('keydown', function (element) {
    event.preventDefault();
    if (element.code === "ArrowLeft") {
        player.speedX = -4;     
    }
    if (element.code === "ArrowRight") {
        player.speedX = 4;      
    }  
    if (element.code === "ArrowUp") {
        player.speedY = -4;
    }
    if (element.code === "ArrowDown") {
        player.speedY = 4;
    }
});
document.addEventListener('keyup', function (element) {
    if (element.code === "ArrowLeft") {
        player.speedX = 0;     
    }
    if (element.code === "ArrowRight") {
        player.speedX = 0;      
    }  
    if (element.code === "ArrowUp") {
        player.speedY = 0;
    }
    if (element.code === "ArrowDown") {
        player.speedY = 0;
    }
});

let obstacleTimer = 0;

function animationFrame() { 
    
  checkCollision();  

  if(obstacleTimer===110){
    createNewObstacle();
    if(obstacles.length===5){
      obstacles.shift();  
    }
    obstacleTimer = 0;
  }

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  if(obstacles.length!==0){
    obstacles.forEach(element=>{
      element[0].init(ctx);
      element[1].init(ctx);
      element[0].update();
      element[1].update();
    });
  }

  player.init(ctx);
  player.newPos(ctx); 
    
  obstacleTimer++;
  
}

const refreshFrame = setInterval(animationFrame, 40); // setInterval odświeża canvas 25 razy na sekundę


function checkCollision() {
  obstacles.forEach((el) => {
      const topObstacle = el.y;
      const bottomObstacle = el.y + el.height;
      const playerTop = player.y;
      const playerBottom = player.y + player.height;
      
      const leftObstacle = el.x;
      const rightObstacle = el.x + el.width;
      const playerLeft = player.x;
      const playerRight = player.x + player.width;
      
      if (bottomObstacle > playerTop ||
          topObstacle < playerBottom ||
          leftObstacle < playerRight ||
          rightObstacle > playerLeft ||
          playerTop <= 0 ||
          playerBottom >= 800 ||
          playerLeft <= 0 ||
          playerRight >= 800) {
          console.log("kolizja");
          clearInterval(refreshFrame);  
                 
      }    
  })
};
