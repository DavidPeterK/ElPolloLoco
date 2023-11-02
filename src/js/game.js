// Initialize variables
let world;
/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    // Get the canvas element from the DOM
    canvas = document.getElementById('canvas');
    initLevel1();

    // Create a new World instance and pass the canvas and keyboard to it
    world = new World('start');
}
