class World {
    canvas = document.getElementById('canvas');;
    ctx = canvas.getContext('2d');
    keyboard;
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = new ThrowableObject();
    endBoss = this.level.endboss[0];
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    /**
 * Draw the object on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Load an image for the object.
     * @param {string} path - Path to the image resource.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Load multiple images for the object (e.g., for animations).
     * @param {Array<string>} set - An array of image paths.
     */
    loadImages(set) {
        set.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawHitBox(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Chicken) {
            ctx.beginPath();
            ctx.rect(
                this.x + this.offsetXL,
                this.y + this.offsetYU,
                this.width - this.offsetXL - this.offsetXR,
                this.height - this.offsetYU - this.offsetYD
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    }


    setWorld() {
        this.character.world = this;
        this.throwableObjects.world = this;
        this.statusBar.world = this;
        this.endBoss.world = this;
    }



}