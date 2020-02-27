const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const treeImg = document.querySelector('#imgTree');
const groundImg = document.querySelector('#imgGround');

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
    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        // var otherleft = otherobj.x;
        // var otherright = otherobj.x + (otherobj.width);
        // var othertop = otherobj.y;
        // var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if (/*(mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)||*/ (mytop >= 0) && (mybottom <= 800) && (myleft >= 0) && (myright <= 800)) {
            crash = false;
            // console.log('ok');
        }
        return crash;       
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

const obstacles = [];
const backgrounds = [];

function createNewObstacle(){
  const randomOne = Math.floor(Math.random() * 35) * 20; // losowa szerokość pierwszej przeszkody od 0 do 720 co 10
  const randomTwo = num => num >= 720 ? 0 : num + 100; // początek drugiej przeszkody w zależności od tego jaką długość ma przeszkoda pierwsza
  const obstacleOne = new Obstacle(0, -80, randomOne, 80,treeImg);
  const obstacleTwo = new Obstacle(randomTwo(randomOne), -80, gameWidth - randomTwo(randomOne), 80,treeImg);
  obstacles.push([obstacleOne,obstacleTwo]);
}

function createNewBackground(){
  const bckgr = new Obstacle(0, -800, 800, 800,groundImg);
  backgrounds.push(bckgr);
}


createNewBackground();
backgrounds[0].y = 0;

const player = new Player (380, 760);

document.addEventListener('keydown', function (element) {
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

createNewObstacle();

const animationFrameTime = 20;
const spcBtwnObs = 100;

function animationFrame() {

  ctx.clearRect(0, 0, gameWidth, gameHeight);

  if(backgrounds[backgrounds.length-1].y >= 0){
    createNewBackground();  
  }

  if(backgrounds[0].y >= gameHeight){
    backgrounds.shift();  
  }


  console.log(backgrounds.length);

  if(obstacles[obstacles.length-1][0].y >= spcBtwnObs){
    createNewObstacle();  
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

  player.init(ctx);
  player.newPos(ctx);
  player.crashWith(); 
}

const refreshFrame = setInterval(animationFrame, animationFrameTime); // setInterval odświeża canvas 25 razy na sekundę
