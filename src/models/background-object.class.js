class BackgroundObject extends MovableObject {

    /**
     * Constructor for the BackgroundObject class.
     * @param {string} imagePath - Path to the image resource.
     * @param {number} x - x-coordinate where the object should be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}
