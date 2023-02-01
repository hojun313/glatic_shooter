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

let bullets = [];
function Bullet(){
    this.x = spaceshipX + 16;
    this.y = spaceshipY - 10;
    bullets.push(this);
    this.speed = 5;
}

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

let keysdown = {};
function setupKeyboardListener(){
    document.addEventListener('keydown',function(e){
        keysdown[e.key] = true;
        console.log(keysdown);
    });
    document.addEventListener('keyup',function(e){
        delete keysdown[e.key];
        if (e.key == ' ') {
            createBullet();
        }
    });
}

function createBullet() {
    let bullet = new Bullet();
    bullets.push(bullet);
}

function update(){
    if('ArrowLeft' in keysdown){
        spaceshipX -= 5;
    }
    if('ArrowRight' in keysdown){
        spaceshipX += 5;
    }
    if('ArrowUp' in keysdown){
        spaceshipY -= 5;
    }
    if('ArrowDown' in keysdown){
        spaceshipY += 5;
    }

    if (spaceshipX < 0) {
        spaceshipX = 0;
    }
    if (spaceshipX > canvas.width - 64) {
        spaceshipX = canvas.width - 64;
    }
    if (spaceshipY < 0) {
        spaceshipY = 0;
    }
    if (spaceshipY > canvas.height - 64) {
        spaceshipY = canvas.height - 64;
    }
}

function render(){
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    for (let i = 0; i < bullets.length; i++) {
        ctx.drawImage(bulletImage,bullets[i].x,bullets[i].y);
        bullets[i].y -= bullets[i].speed;
    }
}

function main(){
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();