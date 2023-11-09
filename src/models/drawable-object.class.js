class DrawableObject {
    x = 120;               // default x-coordinate
    y = 280;               // default y-coordinate
    height = 150;          // default height
    width = 100;           // default width
    img;                   // image object
    imageCache = {};       // cache for multiple images
    currentImage = 0;      // current image index for animations
    offsetYU = 0;          // offset for hitbox from top
    offsetYD = 0;          // offset for hitbox from bottom
    offsetXR = 0;          // offset for hitbox from right
    offsetXL = 0;          // offset for hitbox from left


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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    drawHitBox(ctx) {
        if (this.objectsWithHitBox()) {
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

    objectsWithHitBox() {
        return this instanceof CharacterPepe
            || this instanceof EndbossChicken
            || this instanceof ThrowableBottle
            || this instanceof Chicken
            || this instanceof SmallChicken
            || this instanceof SalsaBottle
            || this instanceof Coin
    }


}