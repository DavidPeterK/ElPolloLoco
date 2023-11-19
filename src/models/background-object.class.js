class BackgroundObject extends MovableObject {

    y = 0;               // y-coordinate, initialized to 0
    width = 720;         // default width
    height = 480;        // default height

    /**
     * Constructor for the BackgroundObject class.
     * @param {string} imagePath - Path to the image resource.
     * @param {number} x - x-coordinate where the object should be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
