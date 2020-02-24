const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext('2d');
const gameWidth = canvas.width;
const gameHeight = canvas.height;

class GameObject {
    constructor(x, y , width , height, speed, image){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxSpeed = speed;
        this.image = image;
  }
  
  init(ctx){
    ctx.fillStyle = 'black'; // bez tej deklaracji jeżeli drawImage
    ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
  }
  
}

const gameObject = new GameObject(100,100,20,20); // utworzenie podstawowego obiektu - dla przykładu
                                                  //dla obiektu gracza i przeszkody tworzymy podklasy dziedziczące jego własności


function animationFrame(){
    ctx.clearRect(0,0,gameWidth,gameHeight);
    gameObject.init(ctx);
}

const refreshFrame = setInterval(animationFrame,40); // setInterval odświeża canvas 25 razy na sekundę