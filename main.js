let canvas;
let ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,enemyImage,bulletImage,gameOverImage;
let spaceshipX = canvas.width/2 - 32;
let spaceshipY = canvas.height - 64;

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = 'images/background.jpg';
    spaceshipImage = new Image();
    spaceshipImage.src = 'images/ship.png';
    enemyImage = new Image();
    enemyImage.src = 'images/enemy.png';
    bulletImage = new Image();
    bulletImage.src = 'images/bullet.png';
    gameOverImage = new Image();
    gameOverImage.src = 'images/gameover.png';
}

function render(){
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
}

function main(){
    render();
    requestAnimationFrame(main);
}

loadImage();
main();