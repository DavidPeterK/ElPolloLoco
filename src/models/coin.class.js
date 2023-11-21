class Coin extends MovableObject {

    ACTIV_SET = [
        'src/img/8_coin/coin_1.png',
        'src/img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super().loadImage('src/img/8_coin/coin_1.png');
        this.loadImages(this.ACTIV_SET);
        this.x = x; this.y = y;
        this.width = 140; this.height = 140;
        this.offsetXL = 50; this.offsetXR = 50;
        this.offsetYU = 50; this.offsetYD = 50;
        this.animate();
    }

    /**
     * Regularly triggers a specific animation for the object.
     * This method uses a setInterval function to continuously play the animation defined in the ACTIV_SET.
     * The interval is set to 650 milliseconds, creating a loop that ensures the animation
     * is played repeatedly at a consistent rate.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.ACTIV_SET);
        }, 650);
    }
}