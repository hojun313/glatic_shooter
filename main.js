let canvas;
let ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,enemyImage,bulletImage,gameOverImage;
let gameover = false;
let score = 0;
let money = 0;

let spaceshipX = canvas.width/2 - 32;
let spaceshipY = canvas.height - 64;
let spaceshipAs = 30;
let spaceshipHp = 100;

let bullets = [];
function Bullet(){
    this.speed = 5;
    this.damage = 50;
    this.size = 32;
    this.x = spaceshipX + 32 - this.size/2;
    this.y = spaceshipY - 10;
    bullets.push(this);

    this.checkCollision = function(){
        for (let i = 0; i < enemies.length; i++) {
            if (this.x+(23/32)*this.size > enemies[i].x && this.x+(11/32)*this.size < enemies[i].x + 64 && this.y > enemies[i].y && this.y < enemies[i].y + 64) {
                enemies[i].hp -= this.damage;
                bullets.splice(bullets.indexOf(this),1);
                if (enemies[i].hp <= 0) {
                    enemies.splice(i,1);
                    score += 10;
                    money += 1;
                }
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

let enemy_bullets = [];
function EnemyBullet(num){
    this.speed = 1;
    this.damage = 50;
    this.size = 32;
    this.x = enemies[num].x + this.size/2;
    this.y = enemies[num].y + 10;
    enemy_bullets[num].push(this);

    this.checkCollision = function(){
        if (this.x+(23/32)*this.size > spaceshipX && this.x+(11/32)*this.size < spaceshipX + 64 && this.y+64 > spaceshipY && this.y+64 < spaceshipY + 64) {
            spaceshipHp -= this.damage;
            enemy_bullets[num].splice(enemy_bullets[num].indexOf(this),1);
            if (spaceshipHp <= 0) {
                gameover = true;
            }
        }
    }
}
function createEnemyBullet(num) {
    let enemyBullet = new EnemyBullet(num);
}

let enemies = [];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.speed = 0.1;
    this.hp = 100;
    this.damage = 10;
    this.as = 1200;
    this.init = function(){
        this.x = generateRandomValue(0,canvas.width - 64);
        this.y = 0;
        enemies.push(this);
        enemy_bullets.push([]);
    }
}
function createEnemy(){
    const interval = setInterval(function(){
        let enemy = new Enemy();
        enemy.init();
    },5000);
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
    enemybulletImage = new Image();
    enemybulletImage.src = 'images/laser.png';
    gameOverImage = new Image();
    gameOverImage.src = 'images/gameover.png';
}

let keysdown = {};
function setupKeyboardListener(){
    document.addEventListener('keydown',function(e){
        keysdown[e.key] = true;
    });
    document.addEventListener('keyup',function(e){
        delete keysdown[e.key];
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
    if(" " in keysdown){
        console.log(astimer);
        if (astimer >= spaceshipAs){
            createBullet();
            astimer = 0;
        }
    }

    console.log(enemy_bullets);

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

    for (let i = 0; i < enemies.length; i++) {
        if (timer % enemies[i].as == 0) {
            createEnemyBullet(i);
        }
    }

    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].y >= -32) {
            bullets[i].checkCollision();
        }
        else{
            bullets.splice(i,1);
        }
    }

    for (let i = 0; i < enemy_bullets.length; i++) {
        for (let j = 0; j < enemy_bullets[i].length; j++) {
            if (enemy_bullets[i][j].y <= canvas.height) {
                enemy_bullets[i][j].checkCollision();
            }
            else{
                enemy_bullets[i].splice(j,1);
            }
        }
    }

}

function render(){
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    ctx.fillText('Score: '+ score,10,20);
    ctx.fillText('Money: '+ money,10,40);
    ctx.fillText('HP: '+ spaceshipHp,10,60);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    for (let i = 0; i < bullets.length; i++) {
        ctx.drawImage(bulletImage,bullets[i].x,bullets[i].y,bullets[i].size,bullets[i].size);
        bullets[i].y -= bullets[i].speed;
    }
    for (let i = 0; i < enemy_bullets.length; i++) {
        for (let j = 0; j < enemy_bullets[i].length; j++) {
            ctx.drawImage(enemybulletImage,enemy_bullets[i][j].x,enemy_bullets[i][j].y,enemy_bullets[i][j].size,enemy_bullets[i][j].size);
            enemy_bullets[i][j].y += enemy_bullets[i][j].speed;
        }
    }
    for (let i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemyImage,enemies[i].x,enemies[i].y);
        ctx.fillStyle = 'white';
        ctx.fillRect(enemies[i].x+7,enemies[i].y-10,50,5);
        ctx.fillStyle = 'red';
        ctx.fillRect(enemies[i].x+7,enemies[i].y-10,50*(enemies[i].hp/100),5);
        if (enemies[i].y > canvas.height-64) {
            enemies.splice(i,1);
        }
        enemies[i].y += enemies[i].speed;
        if (enemies[i].x <= 0) {
            enemies[i].x = canvas.width - 65;
        }
        else if (enemies[i].x >= canvas.width - 64) {
            enemies[i].x = 1;
        }
        else{
            enemies[i].x += Math.sin(enemies[i].y/10)*2;
        }
    }
    if (gameover) {
        ctx.drawImage(gameOverImage,0,0,canvas.width,canvas.he);
    }
}

astimer = spaceshipAs;
timer = 0;
function main(){
    if (!gameover) {
        update();
        render();
        astimer++;
        timer++;
        requestAnimationFrame(main);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();