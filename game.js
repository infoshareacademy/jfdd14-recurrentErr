const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const treeImg = document.querySelector('#imgTree');

class GameObject {
  constructor(x, y, width, height, image) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  init(ctx) {
    // ctx.fillStyle = ctx.createPattern(this.image,'repeat'); // bez tej deklaracji jeżeli drawImage
    // ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
    // ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    for (var w = 0; w < this.width; w += this.image.width) {
      ctx.drawImage(this.image, w, this.y);
    }
  }
}

class Player extends GameObject {
  constructor(x, y, image) {
    super(x, y, 20, 20, image);
  }
}

class Obstacle extends GameObject {
  constructor(x, y, width, height, image) {
    super(x, y, width, height, image);
  }

  update(){
    this.y += 2; // speed of obstacle
  }
}

// const player = new Player(100, 100); // utworzenie podstawowego obiektu - dla przykładu
//dla obiektu gracza i przeszkody tworzymy podklasy dziedziczące jego własności

const obstacles = [];

function createNewObstacle(){
  const randomOne = Math.floor(Math.random() * 35) * 20; // losowa szerokość pierwszej przeszkody od 0 do 720 co 10
  const randomTwo = num => num >= 720 ? 0 : num + 100; // początek drugiej przeszkody w zależności od tego jaką długość ma przeszkoda pierwsza
  const obstacleOne = new Obstacle(0, -40, randomOne, 40,treeImg);
  const obstacleTwo = new Obstacle(randomTwo(randomOne), -40, gameWidth - randomTwo(randomOne), 40,treeImg);
  obstacles.push([obstacleOne,obstacleTwo]);
}

//window.setInterval(createNewObstacle,5000);

// let obstacleIntervalCounter = 0

let obstacleTimer = 0;

function animationFrame() {

  console.log(obstacleTimer,obstacles.length);

  if(obstacleTimer===110){
    createNewObstacle();
    if(obstacles.length===5){
      obstacles.shift();  
    }
    obstacleTimer = 0;
  }

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  // player.init(ctx);
  if(obstacles.length!==0){
    obstacles.forEach(element=>{
      element[0].init(ctx);
      element[1].init(ctx);
      element[0].update();
      element[1].update();
    });
  }

  obstacleTimer++;

  //console.log(obstacles);
}

const refreshFrame = setInterval(animationFrame, 40); // setInterval odświeża canvas 25 razy na sekundę
