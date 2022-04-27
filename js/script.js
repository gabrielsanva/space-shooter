const player = document.getElementById("player"),
    mainArea = document.getElementById("main");

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
    if (topPosition === "0px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position -= 25;
        player.style.top = `${position}px`;
    }
}

// move down

function moveDown() {
    let topPosition = getComputedStyle(player).getPropertyValue("top");
    if (topPosition === "525px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position += 25;
        player.style.top = `${position}px`;
    }
}

window.addEventListener("keydown", fly)