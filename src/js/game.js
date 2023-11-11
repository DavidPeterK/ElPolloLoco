let gameStop = true;
let menuMusik = true;
let inGameMusik = false;

/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    // Get the canvas element from the DOM
    checkIcon();
}

function startGame() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    // Create a new World instance and pass the canvas and keyboard to it
    world = new World(canvas, keyboard);
}

function hideMenuOverlay() {
    let menu = document.getElementById('menu-container');
    let option = document.getElementById('buttonOption');
    let end = document.getElementById('buttonEnd');
    menu.classList.add('d-none');
    option.classList.add('d-none');
    end.classList.add('d-none');
}

function showMenuOverlay() {
    let menu = document.getElementById('menu-container');
    let option = document.getElementById('buttonOption');
    let end = document.getElementById('buttonEnd');
    menu.classList.remove('d-none');
    option.classList.remove('d-none');
    end.classList.remove('d-none');

}
// Toggle-Funktion für Overlays
function toggleDisplay(elementId) {
    let element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
}

function isFullScreen() {
    return (
        document.fullscreenElement ||       // Standard-Property
        document.webkitFullscreenElement || // Chrome, Safari und Opera Property
        document.mozFullScreenElement ||    // Firefox Property
        document.msFullscreenElement        // Internet Explorer und Edge Property
    ) != null; // Wenn eines dieser Properties existiert, ist der Vollbildmodus aktiv
}

function checkIcon() {
    let maxScreenIcon = document.getElementById('enter-fullscreen-button');
    let normalScreenIcon = document.getElementById('exit-fullscreen-button');
    setInterval(() => {
        if (isFullScreen()) {
            maxScreenIcon.style.display = 'none';
            normalScreenIcon.style.display = 'flex';
        } else {
            maxScreenIcon.style.display = 'flex';
            normalScreenIcon.style.display = 'none';
        }
    }, 500);
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
            console.warn(`Failed to enter fullscreen mode: ${err.message}`);
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
