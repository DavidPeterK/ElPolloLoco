class Cloud extends MovableObject {
    y = 20;               // y-coordinate of the cloud
    x;                   // x-coordinate, will be set in the constructor
    width = 500;         // default width
    height = 250;        // default height
    speed = 0.2;         // speed at which the cloud moves

    /**
     * Constructor for the Cloud class.
     * @param {string} image - Path to the image resource.
     * @param {number} x - x-coordinate where the cloud should be placed.
     */
    constructor(image, x) {
        super().loadImage(image);
        this.x = x;
        this.animate();
    }

    /**
     * Animate the cloud by moving it to the left.
     * If it goes beyond a certain point, reset its position.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x <= -320) {
                this.x = 5200;
            }
        }, 1000 / 60);
    }
}
