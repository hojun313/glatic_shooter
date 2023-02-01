let canvas;
let ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,enemyImage,bulletImage,gameOverImage;
let gameover = false;
let score = 0;

let spaceshipX = canvas.width/2 - 32;
let spaceshipY = canvas.height - 64;

let bullets = [];
function Bullet(){
    this.x = spaceshipX + 16;
    this.y = spaceshipY - 10;
    bullets.push(this);
    this.speed = 5;

    this.checkCollision = function(){
        for (let i = 0; i < enemies.length; i++) {
            if (this.x+23 > enemies[i].x && this.x+11 < enemies[i].x + 64 && this.y > enemies[i].y && this.y < enemies[i].y + 64) {
                enemies.splice(i,1);
                bullets.splice(bullets.indexOf(this),1);
                score += 10;
            }
        }
    }
}
function createBullet() {
    let bullet = new Bullet();
}

function generateRandomValue(min,max){
    let rNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return rNum;
}

let enemies = [];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.init = function(){
        this.x = generateRandomValue(0,canvas.width - 64);
        this.y = 0;
        enemies.push(this);
    }
}
function createEnemy(){
    const interval = setInterval(function(){
        let enemy = new Enemy();
        enemy.init();
    },1000);
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = 'images/background.jpg';
    spaceshipImage = new Image();
    spaceshipImage.src = 'images/ship.png';
    enemyImage = new Image();
    enemyImage.src = 'images/enemyred.png';
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
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].y >= -32) {
            bullets[i].checkCollision();
        }
        else{
            bullets.splice(i,1);
        }
    }
    console.log(bullets);
}

function render(){
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    ctx.fillText('Score: '+ score,10,20);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    for (let i = 0; i < bullets.length; i++) {
        ctx.drawImage(bulletImage,bullets[i].x,bullets[i].y);
        bullets[i].y -= bullets[i].speed;
    }
    for (let i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemyImage,enemies[i].x,enemies[i].y);
        if (enemies[i].y > canvas.height-64) {
            gameover = true;
            ctx.drawImage(gameOverImage,canvas.width/2 - 190, canvas.height/2 - 190, 380, 380);
        }
        enemies[i].y += enemies[i].speed;
    }
}

function main(){
    if (!gameover) {
        update();
        render();
        requestAnimationFrame(main);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();