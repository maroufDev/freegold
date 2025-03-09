const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const fallingObject = document.getElementById('fallingObject');
const scoreDisplay = document.getElementById('score');

let score = 0;
let basketPosition = 165; // Initial position of the basket
let fallingSpeed = 5; // Speed of falling object
let objectFalling = false;

document.addEventListener('mousemove', (event) => {
    const rect = gameArea.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // Get mouse X relative to game area
    basketPosition = Math.min(rect.width - 70, Math.max(0, mouseX - 35)); // Keep basket within bounds
    basket.style.left = basketPosition + 'px';
});

function startFalling() {
    let objectPosition = 0; // Start from the top
    objectFalling = true;

    function fall() {
        if (!objectFalling) return; // Stop if not falling

        objectPosition += fallingSpeed;

        if (objectPosition > gameArea.clientHeight) {
            objectFalling = false; // Stop falling when it reaches the bottom
            resetFallingObject();
        } else {
            fallingObject.style.top = objectPosition + 'px';
            requestAnimationFrame(fall);
        }

        checkCatch(objectPosition);
    }

    fall();
}

function resetFallingObject() {
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px'; // Random horizontal position
}

function checkCatch(objectPosition) {
    const basketRect = basket.getBoundingClientRect();
    const objectRect = fallingObject.getBoundingClientRect();

    if (
        objectPosition + objectRect.height >= basketRect.top &&
        objectPosition + objectRect.height <= basketRect.bottom &&
        objectRect.left + objectRect.width >= basketRect.left &&
        objectRect.left <= basketRect.left + basketRect.width
    ) {
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
        resetFallingObject();
        fallingSpeed += 0.5; // Increase speed as score increases
        startFalling(); // Start falling again
    }
}

startFalling();
