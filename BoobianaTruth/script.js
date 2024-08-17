let keyPressCount = 0;
let lastKeyPressTime = 0;
const PRESS_LIMIT = 5;
const TIME_LIMIT = 3000; // 3 seconds

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('touchstart', handleTouchStart);

let touchCount = 0;
let touchStartTime = 0;

function handleKeyPress(event) {
    if (event.key === 'b') {
        const currentTime = Date.now();
        if (currentTime - lastKeyPressTime <= TIME_LIMIT) {
            keyPressCount++;
        } else {
            keyPressCount = 1; // Reset count if time limit exceeded
        }
        lastKeyPressTime = currentTime;

        if (keyPressCount >= PRESS_LIMIT) {
            showDarkOverlay();
            keyPressCount = 0; // Reset after triggering
        }
    }
}

function handleTouchStart() {
    const currentTime = Date.now();
    if (currentTime - touchStartTime <= TIME_LIMIT) {
        touchCount++;
    } else {
        touchCount = 1; // Reset count if time limit exceeded
    }
    touchStartTime = currentTime;

    if (touchCount >= PRESS_LIMIT) {
        showDarkOverlay();
        touchCount = 0; // Reset after triggering
    }
}

function showDarkOverlay() {
    document.getElementById('darkOverlay').classList.remove('hidden');
    startTypingAnimation();
}

function startTypingAnimation() {
    const textElement = document.getElementById('typingText');
    const text = "Boobiana isn't real, she's a man, a robot, controlled by the UK Government, mark my words.";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            textElement.innerHTML += text[index++];
            setTimeout(type, 50); // Typing speed
        } else {
            // Play typing sound
            const audio = new Audio('SoundEffects/BoobianaTruth/TypingEffect.mp3');
            audio.play();
        }
    }
    type();
}

document.getElementById('understoodButton').addEventListener('click', () => {
    document.getElementById('prompt').classList.add('hidden');
    document.getElementById('confirmationPrompt').classList.remove('hidden');
});

document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('darkOverlay').classList.add('hidden');
});

document.getElementById('noButton').addEventListener('click', () => {
    document.body.innerHTML = '<div style="text-align: center; color: white; background: black; height: 100vh; display: flex; justify-content: center; align-items: center;"><p>Your faith has been chosen</p></div>';
});
