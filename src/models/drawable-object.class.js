class DrawableObject {
    x;               // default x-coordinate
    y;               // default y-coordinate
    height;          // default height
    width;           // default width
    img;                   // image object
    imageCache = {};       // cache for multiple images
    currentImage = 0;      // current image index for animations
    offsetYU;          // offset for hitbox from top
    offsetYD;          // offset for hitbox from bottom
    offsetXR;          // offset for hitbox from right
    offsetXL;          // offset for hitbox from left


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

    /**
     * Plays the animation by cycling through a series of images.
     * This method sequentially accesses images in an array to create an animation effect.
     * The current image is determined by the remainder of currentImage divided by the number of images.
     *
     * @param {Array} images - An array of image paths used for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Draws a hitbox around the object if it's one of the specified types.
     * This method is used for debugging or visualizing the collision area of the object.
     * It creates a rectangular outline based on the object's dimensions and offset values.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the hitbox.
     */
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

    /**
     * Determines if the object should have a hitbox drawn.
     * This method checks the type of the object against a list of specified types that require a hitbox.
     *
     * @returns {boolean} - True if the object is one of the types that requires a hitbox, false otherwise.
     */
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