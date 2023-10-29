let canvas;
let world;
let keyboard = new Keyboard();

//läd canvas und world class und gibt das canvas weiter
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

