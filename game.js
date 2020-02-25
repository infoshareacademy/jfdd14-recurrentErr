const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext('2d');
const gameWidth = canvas.width;
const gameHeight = canvas.height;

class GameObject {
    constructor(x, y , width , height, image){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = image;
  }
  
  init(ctx){
    ctx.fillStyle = 'black'; // bez tej deklaracji jeżeli drawImage
    ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
  }
  
}

class Player extends GameObject {
    constructor(x, y, image){
      super(x, y , 20, 20, image);
     }
}

class Obstacle extends GameObject {
    constructor(width, height, image){
      super(0, 0, width, height, image);
    }
}
 
const player = new Player(100,100); // utworzenie podstawowego obiektu - dla przykładu
                                          //dla obiektu gracza i przeszkody tworzymy podklasy dziedziczące jego własności

const obstacle = new Obstacle(Math.floor((Math.random()*40+1)-1)*20,20);

function animationFrame(){
    ctx.clearRect(0,0,gameWidth,gameHeight);
    player.init(ctx);
    obstacle.init(ctx);
}

const refreshFrame = setInterval(animationFrame,40); // setInterval odświeża canvas 25 razy na sekundę