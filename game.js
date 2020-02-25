const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;

class GameObject {
  constructor(x, y, width, height, image) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  init(ctx) {
    ctx.fillStyle = "black"; // bez tej deklaracji jeżeli drawImage
    ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
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
}

const player = new Player(100, 100); // utworzenie podstawowego obiektu - dla przykładu
//dla obiektu gracza i przeszkody tworzymy podklasy dziedziczące jego własności

const randomOne = Math.floor(Math.random() * 73) * 10; // losowa szerokość pierwszej przeszkody od 0 do 720 co 10
const randomTwo = num => num >= 720 ? 0 : num + 80; // początek drugiej przeszkody w zależności od tego jaką długość ma przeszkoda pierwsza

const obstacleOne = new Obstacle(0, 0, randomOne, 20);
const obstacleTwo = new Obstacle(randomTwo(randomOne), 0, gameWidth - randomTwo(randomOne), 20);

function animationFrame() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  player.init(ctx);
  obstacleOne.init(ctx);
  obstacleTwo.init(ctx);
}

const refreshFrame = setInterval(animationFrame, 40); // setInterval odświeża canvas 25 razy na sekundę
