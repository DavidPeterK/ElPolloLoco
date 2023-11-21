let gameActiv = false; let gameStop = true;
let canvas; let keyboard; let world; let levelEPL1;
let coinStorage = 0; let throwObjectsStorage = 0;
let mobileOverlay = true; let muteGame = false;

/**
 * Initializes the game setup.
 * This function sets up initial game settings like music, sound volumes, and UI elements.
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

/**
 * Starts the game.
 * This function initializes the level, sets up the keyboard and game world, and plays the game music.
 */
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

/**
 * Restarts the game by reloading the webpage.
 */
function restartGame() {
    location.reload();
}

/**
 * Sets the music volume for the game based on user input and mute status.
 */
function setMusicVolume() {
    let musicVolume = document.getElementById('volumeControlMusic').value;
    if (muteGame) {
        showOverlay('unmuteIcon');
        hideOverlay('muteIcon');
        MENU_SOUND.volume = 0;
        ELPOLLOLOCO_SOUND.volume = 0;
        INTROCHICKEN_MUSIC.volume = 0;
    } else {
        hideOverlay('unmuteIcon');
        showOverlay('muteIcon');
        MENU_SOUND.volume = musicVolume;
        ELPOLLOLOCO_SOUND.volume = musicVolume;
        INTROCHICKEN_MUSIC.volume = musicVolume;
    }
}

/**
 * Sets the sound effects volume for the game based on user input and mute status.
 */
function setSoundVolume() {
    let soundVolume = document.getElementById('volumeControlSound').value;
    if (muteGame) {
        hideOverlay('unmuteIcon');
        showOverlay('muteIcon');
        muteSounds();
    } else {
        showOverlay('unmuteIcon');
        hideOverlay('muteIcon');
        setSoundsVolume(soundVolume);
    }
}

/**
 * Sets the volume for various game sounds.
 * 
 * @param {number} soundVolume - The volume level to set for game sounds.
 */
function setSoundsVolume(soundVolume) {
    WALKING_SOUND.volume = soundVolume;
    DAMAGE_SOUND.volume = soundVolume;
    JUMP_SOUND.volume = soundVolume;
    INTROCHICKEN_SOUND.volume = soundVolume;
    INTROCHICKEN_END.volume = soundVolume;
    FLYING_THROWOBJECT.volume = soundVolume;
    BROKEN_THROWOBJECT.volume = soundVolume;
    COLLECTBOTTLE_SOUND.volume = soundVolume;
    COLLECTCOIN_SOUND.volume = soundVolume;
    ENEMYDAMAGE_SOUND.volume = soundVolume;
    LOSE_SOUND.volume = soundVolume;
    WIN_SOUND.volume = soundVolume;
}

/**
 * Mutes all game sounds.
 */
function muteSounds() {
    WALKING_SOUND.volume = 0;
    DAMAGE_SOUND.volume = 0;
    JUMP_SOUND.volume = 0;
    INTROCHICKEN_SOUND.volume = 0;
    INTROCHICKEN_END.volume = 0;
    FLYING_THROWOBJECT.volume = 0;
    BROKEN_THROWOBJECT.volume = 0;
    COLLECTBOTTLE_SOUND.volume = 0;
    COLLECTCOIN_SOUND.volume = 0;
    ENEMYDAMAGE_SOUND.volume = 0;
    LOSE_SOUND.volume = 0;
    WIN_SOUND.volume = 0;
}

/**
 * Plays the menu music and sets it to loop.
 */
function playMenuMusic() {
    if (!ELPOLLOLOCO_SOUND.paused) {
        ELPOLLOLOCO_SOUND.pause();
        ELPOLLOLOCO_SOUND.currentTime = 0;
    }
    MENU_SOUND.play().then(() => {
    }).catch((err) => {
        console.warn(`Failed to play menu music: ${err.message}`);
    });
    MENU_SOUND.loop = true;
}

/**
 * Plays the main game music and sets it to loop.
 */
function playGameMusic() {
    if (!MENU_SOUND.paused) {
        MENU_SOUND.pause();
        MENU_SOUND.currentTime = 0;
    }
    ELPOLLOLOCO_SOUND.play();
    ELPOLLOLOCO_SOUND.loop = true;
}

/**
 * Plays the endboss music and sets it to loop.
 */
function playEndbossMusic() {
    if (!ELPOLLOLOCO_SOUND.paused) {
        ELPOLLOLOCO_SOUND.pause();
        ELPOLLOLOCO_SOUND.currentTime = 0;
    }
    INTROCHICKEN_MUSIC.play();
    INTROCHICKEN_MUSIC.loop = true;
}

/**
 * Closes the game window.
 */
function closeGame() {
    window.close();
}

/**
 * Hides a specified overlay element.
 * 
 * @param {string} id - The ID of the overlay element to hide.
 */
function hideOverlay(id) {
    let overLay = document.getElementById(id);
    overLay.classList.add('d-none');
}

/**
 * Shows a specified overlay element.
 * 
 * @param {string} id - The ID of the overlay element to show.
 */
function showOverlay(id) {
    let overLay = document.getElementById(id);
    overLay.classList.remove('d-none');
}

/**
 * Shows the mobile controls overlay if applicable.
 */
function showMobileOverlay() {
    if (mobileOverlay) {
        let overLay = document.getElementById('control-container');
        overLay.classList.remove('d-none');
    }
}

/**
 * Toggles the visibility of the mobile controls overlay.
 */
function toggleMobileOverlay() {
    var checkbox = document.getElementById("mobileOverlayCheckbox");
    mobileOverlay = checkbox.checked;
}

/**
 * Checks if the current window is in full screen mode.
 * 
 * @returns {boolean} True if the window is in full screen mode, false otherwise.
 */
function isFullScreen() {
    return (
        document.fullscreenElement ||       // Standard-Property
        document.webkitFullscreenElement || // Chrome, Safari and Opera Property
        document.mozFullScreenElement ||    // Firefox Property
        document.msFullscreenElement        // Internet Explorer and Edge Property
    ) != null;
}

/**
 * Regularly checks and updates the fullscreen icon based on the current fullscreen status.
 */
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

/**
 * Enters fullscreen mode for a specified element.
 * 
 * @param {HTMLElement} element - The element to display in fullscreen mode.
 */
function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen().then(() => {
        }).catch((err) => {
            console.warn(`Failed to enter fullscreen mode: ${err.message}`);
        });
    }
}

/**
 * Exits fullscreen mode.
 */
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

/**
 * Handles the touch start event for mobile controls.
 * 
 * @param {string} id - The ID of the touched control element.
 */
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

/**
 * Handles the touch end event for mobile controls.
 * 
 * @param {string} id - The ID of the touched control element.
 */
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

/**
 * Handles the touch cancel event for mobile controls.
 * 
 * @param {string} id - The ID of the touched control element.
 */
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
