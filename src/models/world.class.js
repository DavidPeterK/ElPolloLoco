class World {
    ctx;
    canvas;
    keyboard;
    level;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.level = levelEPL1;
        this.draw();
    }

    /**
     * Manages the drawing of the entire game scene.
     * This method clears the canvas, applies the camera transformation for scrolling, and draws all game objects.
     * It continuously updates the scene using requestAnimationFrame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.backGroundObjects();
        this.gameObjects();
        this.fixedObjects();
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the game map for rendering.
     * This method iterates through the array and calls addToMap for each non-null object.
     * 
     * @param {Array} object - An array of game objects to add to the map.
     */
    addObjects(object) {
        if (object !== null) {
            object.forEach(o => {
                this.addToMap(o);
            });
        }
    }

    /**
     * Adds a single object to the game map.
     * This method handles flipping the image if necessary, drawing the object, and flipping the image back.
     * 
     * @param {Object} object - The game object to add to the map.
     */
    addToMap(object) {
        if (object !== null) {
            if (object.otherDirection) {
                this.flipImage(object);
            }
            object.draw(this.ctx);
            //object.drawHitBox(this.ctx);
            if (object.otherDirection) {
                this.flipImageBack(object);
            }
        }
    }

    /**
     * Flips the image horizontally for drawing.
     * This method is used when an object is facing the opposite direction.
     * 
     * @param {Object} draw - The game object whose image needs to be flipped.
     */
    flipImage(draw) {
        this.ctx.save();
        this.ctx.translate(draw.width, 0);
        this.ctx.scale(-1, 1);
        draw.x = draw.x * -1;
    }

    /**
     * Flips the image back to its original orientation after drawing.
     * This method restores the canvas state after an object's image has been flipped.
     * 
     * @param {Object} draw - The game object whose image was flipped.
     */
    flipImageBack(draw) {
        draw.x = draw.x * -1;
        this.ctx.restore();
    }

    /**
     * Draws the background objects and clouds.
     * This method adds background objects and clouds to the game map for rendering.
     */
    backGroundObjects() {
        this.addObjects(this.level.backgroundObjects);
        this.addObjects(this.level.clouds);
    }

    /**
     * Draws fixed objects that are unaffected by camera movement.
     * This includes UI elements like status bars and collectable numbers.
     */
    fixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.numbersForCollectables();
        this.addObjects(this.level.statusBarChar);
        this.addObjects(this.level.statusBarEndboss);
        this.addObjects(this.level.statusBarCoin);
        this.addObjects(this.level.statusBarThrowObject);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws dynamic game objects including enemies, characters, and throwables.
     * This method adds all active game objects to the map for rendering.
     */
    gameObjects() {
        this.addObjects(this.level.collectableThrowObjects);
        this.addObjects(this.level.coin);
        this.addObjects(this.level.normalEnemy);
        this.addObjects(this.level.smallEnemy);
        this.addObjects(this.level.endboss);
        this.addObjects(this.level.throwObject);
        this.addObjects(this.level.character);
    }

    /**
     * Displays the numbers for collectable items on the screen.
     * This method renders the current storage of throw objects and coins in the game UI.
     */
    numbersForCollectables() {
        this.ctx.font = '40px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${throwObjectsStorage}`, 110, 162);
        this.ctx.fillText(`${coinStorage}`, 110, 102);
    }
}