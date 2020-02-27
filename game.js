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
<<<<<<< HEAD
  }
  
  init(ctx){
    ctx.fillStyle = 'black'; // bez tej deklaracji jeżeli drawImage
    ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
  }
  
=======
    }  
  init(ctx){
    ctx.fillStyle = 'black'; // bez tej deklaracji jeżeli drawImage
    ctx.fillRect(this.x, this.y, this.width, this.height); // drawImage jeżeli używamy tekstur
  }       
>>>>>>> feature/42-game-player
}

class Player extends GameObject {
    constructor(x, y, image){
<<<<<<< HEAD
      super(x, y , 20, 20, image);
     }
=======
        super(x, y , 40, 40, image);  
        this.speedX = 0;
        this.speedY = 0; 
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
            console.log('ok');
        }
        return crash;       
    }
>>>>>>> feature/42-game-player
}

class Obstacle extends GameObject {
    constructor(width, height, image){
      super(0, 0, width, height, image);
    }
}
<<<<<<< HEAD
 
const player = new Player(100,100); // utworzenie podstawowego obiektu - dla przykładu
                                          //dla obiektu gracza i przeszkody tworzymy podklasy dziedziczące jego własności
=======

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
>>>>>>> feature/42-game-player

const obstacle = new Obstacle(Math.floor((Math.random()*40+1)-1)*20,20);

function animationFrame(){
    ctx.clearRect(0,0,gameWidth,gameHeight);
    player.init(ctx);
    obstacle.init(ctx);
<<<<<<< HEAD
}

const refreshFrame = setInterval(animationFrame,40); // setInterval odświeża canvas 25 razy na sekundę
=======
    player.newPos(ctx);
    player.crashWith();       
}

const refreshFrame = setInterval(animationFrame,40); 
>>>>>>> feature/42-game-player
