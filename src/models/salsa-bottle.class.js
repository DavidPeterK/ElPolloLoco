class SalsaBottle extends MovableObject {

    ACTIV_SET = [
        'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/salsa_bottle.png',
        'src/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/salsa_bottle.png',
    ];

    constructor(x, image) {
        super().loadImage(image);
        this.loadImages(this.ACTIV_SET)
        this.x = x; this.y = 335;
        this.width = 100; this.height = 100;
        this.offsetXL = 30; this.offsetXR = 30;
        this.offsetYU = 20; this.offsetYD = 0;
        this.animate();
    }

    /**
     * Initiates a periodic animation based on the vertical position of the object and the game state.
     * The method sets an interval that triggers the animation from the ACTIV_SET when certain conditions are met,
     * specifically when the object's vertical position is greater than 300 and the game is not stopped.
     * The animation is played at an interval of 400 milliseconds.
     */
    animate() {
        setInterval(() => {
            if (this.y > 300 && !gameStop) {
                this.playAnimation(this.ACTIV_SET)
            }
        }, 400);
    }
}