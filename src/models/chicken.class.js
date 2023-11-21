class Chicken extends MovableObject {

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.x = x + Math.random() * 600;
        this.speed = 0.3 + Math.random() * 1.5;
        this.y = 345;
        this.width = 90; this.height = 75;
        this.offsetXL = 15; this.offsetXR = 15;
        this.offsetYU = 15; this.offsetYD = 0;
        this.animate();
    }

    /**
     * Initiates the animation process for the object.
     * This method sets two intervals: one for moving the object to the left (if it's not dead and the game is not stopped)
     * and another for playing the walking animation under the same conditions. If the object is dead,
     * it loads the dead image instead. This method ensures the continuous animation of the object
     * based on its state (alive or dead) and the game status.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.playAnimation(this.WALKING_SET);
            } else if (this.isDead()) {
                this.loadImage('src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
            }
        }, 100);
    }

}