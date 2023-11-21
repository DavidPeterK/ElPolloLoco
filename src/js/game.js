let gameActiv = false; let gameStop = true;
let canvas; let keyboard; let world; let levelEPL1;
let coinStorage = 0; let throwObjectsStorage = 0;
let mobileOverlay = true; let muteGame = false;

/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    setTimeout(() => {
        playMenuMusic();
        setMusicVolume();
        setSoundVolume();
        hideOverlay('loadScreen');
        checkIcon();
    }, 4000);
}

function startGame() {
    startLevelEPL1()
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playGameMusic();
    setTimeout(() => {
        hideOverlay('loadScreen');
        showMobileOverlay();
        showOverlay('mutePauseContainer')
        gameStop = false;
        gameActiv = true;
    }, 3500);
}

function restartGame() {
    location.reload();
}

function setMusicVolume() {
    let musicVolume = document.getElementById('volumeControlMusic').value;
    if (muteGame) {
        showOverlay('unmuteIcon');
        hideOverlay('muteIcon');
        MENU_SOUND.volume = 0;
        ELPOLLOLOCO_SOUND.volume = 0;
    } else {
        hideOverlay('unmuteIcon');
        showOverlay('muteIcon');
        MENU_SOUND.volume = musicVolume;
        ELPOLLOLOCO_SOUND.volume = musicVolume;

    }
}

// Funktion, um die Soundeffektlautstärke zu ändern
function setSoundVolume() {
    let soundVolume = document.getElementById('volumeControlSound').value;
    if (muteGame) {
        hideOverlay('unmuteIcon');
        showOverlay('muteIcon');
        WALKING_SOUND.volume = 0;
        DAMAGE_SOUND.volume = 0;
        JUMP_SOUND.volume = 0;
        INTROCHICKEN_SOUND.volume = 0;
        FLYING_THROWOBJECT.volume = 0;
        BROKEN_THROWOBJECT.volume = 0;
        COLLECTBOTTLE_SOUND.volume = 0;
        COLLECTCOIN_SOUND.volume = 0;
        ENEMYDAMAGE_SOUND.volume = 0;
    } else {
        showOverlay('unmuteIcon');
        hideOverlay('muteIcon');
        WALKING_SOUND.volume = soundVolume;
        DAMAGE_SOUND.volume = soundVolume;
        JUMP_SOUND.volume = soundVolume;
        INTROCHICKEN_SOUND.volume = soundVolume;
        FLYING_THROWOBJECT.volume = soundVolume;
        BROKEN_THROWOBJECT.volume = soundVolume;
        COLLECTBOTTLE_SOUND.volume = soundVolume;
        COLLECTCOIN_SOUND.volume = soundVolume;
        ENEMYDAMAGE_SOUND.volume = soundVolume;
    }
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

function playEndbossMusic() {
    if (!ELPOLLOLOCO_SOUND.paused) {
        ELPOLLOLOCO_SOUND.pause();
        ELPOLLOLOCO_SOUND.currentTime = 0; // Setzt die Ingame-Musik zurück zum Anfang
    }
    INTROCHICKEN_MUSIC.play();
    INTROCHICKEN_MUSIC.loop = true;
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

function showMobileOverlay() {
    if (mobileOverlay) {
        let overLay = document.getElementById('control-container');
        overLay.classList.remove('d-none');
    }
}

// Toggle-Funktion für Overlays
function toggleDisplay(elementId) {
    let element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
}

function toggleMobileOverlay() {
    var checkbox = document.getElementById("mobileOverlayCheckbox");
    mobileOverlay = checkbox.checked;
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

function touchStart(id) {
    if (id === 'arrow-left') {
        keyboard.LEFT = true;
    }
    if (id === 'arrow-right') {
        keyboard.RIGHT = true;
    }
    if (id === 'throwObject') {
        keyboard.D = true;
    }
    if (id === 'arrow-up') {
        keyboard.UP = true;
    }
}

function touchEnd(id) {
    if (id === 'arrow-left') {
        keyboard.LEFT = false;
    }
    if (id === 'arrow-right') {
        keyboard.RIGHT = false;
    }
    if (id === 'throwObject') {
        keyboard.D = false;
    }
    if (id === 'arrow-up') {
        keyboard.UP = false;
    }
}

function touchCancel(id) {
    if (id === 'arrow-left') {
        keyboard.LEFT = false;
    }
    if (id === 'arrow-right') {
        keyboard.RIGHT = false;
    }
    if (id === 'throwObject') {
        keyboard.D = false;
    }
    if (id === 'arrow-up') {
        keyboard.UP = false;
    }
}
