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
}

class Obstacle extends GameObject {
    constructor(width, height, image){
      super(0, 0, width, height, image);
    }
}

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

const obstacle = new Obstacle(Math.floor((Math.random()*40+1)-1)*20,20);

function animationFrame(){
    ctx.clearRect(0,0,gameWidth,gameHeight);
    player.init(ctx);
    obstacle.init(ctx);
    player.newPos(ctx);
    player.crashWith();       
}

const refreshFrame = setInterval(animationFrame,40); 