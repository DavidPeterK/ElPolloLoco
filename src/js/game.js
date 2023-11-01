// Initialize variables
let world;
/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    initLevel1();
    // Create a new World instance and pass the canvas and keyboard to it
    world = new World('start');
}
