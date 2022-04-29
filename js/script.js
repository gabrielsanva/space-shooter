const player = document.getElementById("player"),
    mainArea = document.getElementById("main"),
    how = document.getElementById("how"),
    start = document.getElementById("start"),
    movementSize = 20,
    enemies = ["monster-1.png", "monster-2.png", "monster-3.png"];
let enemiesInterval;
// moviment and fire
function fly(event) {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
    } else if (event.key === " ") {
        event.preventDefault();
        fire();
    }
}
// move up
function moveUp() {
    let topPosition = getComputedStyle(player).getPropertyValue("top");
    if (parseInt(topPosition) < 10) {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position -= movementSize;
        player.style.top = `${position}px`;
    }
}
// move down
function moveDown() {
    let topPosition = getComputedStyle(player).getPropertyValue("top");
    if (parseInt(topPosition) > 525) {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position += movementSize;
        player.style.top = `${position}px`;
    }
}
// fire
function fire() {
    let fireElement = createFireElement();
    mainArea.appendChild(fireElement);
    moveFire(fireElement);
}
// create fire element
function createFireElement() {
    let xPosition = parseInt(getComputedStyle(player).getPropertyValue("left"));
    let yPosition = parseInt(getComputedStyle(player).getPropertyValue("top"));
    let newFire = document.createElement("img");
    newFire.src = "../img/shoot.gif";
    newFire.classList.add("fire");
    newFire.style.left = `${xPosition}px`;
    newFire.style.top = `${yPosition - 10}px`;
    return newFire;
}
// fire movement
function moveFire(fire) {
    let fireInterval = setInterval(() => {
        let xPosition = parseInt(fire.style.left);
        let enemies = document.querySelectorAll(".enemy");
        enemies.forEach((enemy) => {
            if (checkColision(fire, enemy)) {
                enemy.src = "img/explosion.png";
                enemy.classList.remove("enemy");
                enemy.classList.add("dead-enemy");
            }
        })
        console.log(xPosition);
        if (xPosition > 480) {
            fire.remove();
        }
        else {
            fire.style.left = `${xPosition + 8}px`;
        }
    }, 10)
}
// create a new random enemy
function createEnemy() {
    let newEnemy = document.createElement('img');
    newEnemy.src = "img/" + (enemies[Math.floor(Math.random() * enemies.length)]);
    newEnemy.classList.add("enemy", "enemy-transition");
    newEnemy.style.left = "360px";
    newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    mainArea.appendChild(newEnemy);
    moveEnemy(newEnemy);
}
// move enemy
function moveEnemy(enemy) {
    let moveEnemyInterval = setInterval(() => {
        let xPosition = parseInt(getComputedStyle(enemy).getPropertyValue('left'));
        if (xPosition <= 50) {
            if (Array.from(enemy.classList).includes("dead-enemy")) {
                enemy.remove();
            }
            else {
                gameOver();
            }
        }
        else {
            enemy.style.left = `${xPosition - 4}px`;
        }

    }, 30)
}
// check colision
function checkColision(fire, enemy) {
    let fireTop = parseInt(fire.style.top),
        fireXPosition = parseInt(enemy.style.left),
        fireBottom = fireTop - 20,
        enemyTop = parseInt(enemy.style.top),
        enemyBottom = enemyTop - 30,
        enemyXPosition = parseInt(enemy.style.left);
    if (fireXPosition != 480 && fireXPosition + 40 >= enemyXPosition) {
        if (fireTop <= enemyTop && fireTop >= enemyBottom) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
function play() {
    start.style.display = how.style.display = "none";
    window.addEventListener("keydown", fly);
    enemiesInterval = setInterval(() => {
        createEnemy();
    }, 2000)
}
function gameOver() {
    window.removeEventListener("keydown", fly);
    clearInterval(enemiesInterval);
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((enemy) => enemy.remove());
    let fires = document.querySelectorAll(".fire");
    fires.forEach((fire) => fire.remove());

    setTimeout(() => {
        player.style.top = "250px";
        start.style.display = how.style.display = "block";
        alert("Game Over");
    })
}