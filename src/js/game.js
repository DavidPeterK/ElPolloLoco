/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    // Get the canvas element from the DOM
    initLevel1();
    startGame();
}

function startGame() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    // Create a new World instance and pass the canvas and keyboard to it
    world = new World(canvas, keyboard);
}

// Toggle-Funktion für Overlays
function toggleDisplay(elementId) {
    let element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
}



// Funktion zum Anzeigen des Ladescreens
function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'block';
}

// Funktion zum Ausblenden des Ladescreens
function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
}
document.addEventListener('fullscreenchange', (event) => {
    // Get the canvas element
    let canvas = document.getElementById('canvas');
    // Check if we are in fullscreen mode
    if (document.fullscreenElement) {
        canvas.classList.add('fullscreen');
    } else {
        canvas.classList.remove('fullscreen');
    }
});

// Modify the enterFullScreen function to handle changes
function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen().then(() => {
            // Additional adjustments if needed after entering fullscreen
        }).catch((err) => {
            console.error(`Failed to enter fullscreen mode: ${err.message}`);
        });
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}
