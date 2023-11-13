class Cloud extends MovableObject {
    speed = 0.2;         // speed at which the cloud moves

    /**
     * Constructor for the Cloud class.
     * @param {string} image - Path to the image resource.
     * @param {number} x - x-coordinate where the cloud should be placed.
     */
    constructor(image, x) {
        super().loadImage(image);
        this.x = x; this.y = 20;
        this.width = 500; this.height = 250;
        this.offsetXL = 0; this.offsetXR = 0;
        this.offsetYU = 0; this.offsetYD = 0;
        this.animate();
    }

    /**
     * Animate the cloud by moving it to the left.
     * If it goes beyond a certain point, reset its position.
     */
    animate() {
        setInterval(() => {
            if (!gameStop) {
                this.moveLeft();
                if (this.x <= -320) {
                    this.x = 5200;
                }
            }
        }, 1000 / 60);
    }
}
