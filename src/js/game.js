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