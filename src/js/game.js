let gameActiv = false;
let gameStop = true;
let MENU_SOUND = new Audio('src/sounds/menu.mp3');
let ELPOLLOLOCO_SOUND = new Audio('src/sounds/introMusic.mp3');
let canvas; let keyboard; let world;
let coinStorage = 0; let throwObjectsStorage = 0;

/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    // Get the canvas element from the DOM
    setTimeout(() => {
        hideOverlay('loadScreen');
        checkIcon();
        playMenuMusic();
    }, 4000);
}

function startGame() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}
function playMenuMusic() {
    if (!ELPOLLOLOCO_SOUND.paused) {
        ELPOLLOLOCO_SOUND.pause();
        ELPOLLOLOCO_SOUND.currentTime = 0; // Setzt die Ingame-Musik zurück zum Anfang
    }
    MENU_SOUND.play();
    MENU_SOUND.loop = true;
}

// Funktion, um Ingame-Musik zu spielen
function playGameMusic() {
    if (!MENU_SOUND.paused) {
        MENU_SOUND.pause();
        MENU_SOUND.currentTime = 0; // Setzt die Menümusik zurück zum Anfang      
    }
    ELPOLLOLOCO_SOUND.play();
    ELPOLLOLOCO_SOUND.loop = true;
}

function closeGame() {
    window.close();
}

function hideOverlay(id) {
    let overLay = document.getElementById(id);
    overLay.classList.add('d-none');
}

function showOverlay(id) {
    let overLay = document.getElementById(id);
    overLay.classList.remove('d-none');

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
