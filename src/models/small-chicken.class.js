class SmallChicken extends MovableObject {

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    DEAD_SET = [
        'src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.DEAD_SET);
        this.x = x + Math.random() * 500; this.y = 375;
        this.width = 70; this.height = 55;
        this.offsetXL = 10; this.offsetXR = 10;
        this.offsetYU = 20; this.offsetYD = 0;
        this.speed = 0.5 + Math.random() * 1.5;
        this.smallEnemyHealth = 100;
        this.smallChickenMove();
        this.animate();
        this.applyGravity();
    }

    /**
     * Handles the movement of a small chicken character.
     * This method sets an interval for the small chicken to move left and perform interval jumps,
     * provided it is not dead and the game is not stopped.
     */
    smallChickenMove() {
        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.moveLeft();
                this.intervalJump();
            }
        }, 1000 / 60);
    }

    /**
     * Manages the animation of the character.
     * This method sets an interval to play the walking animation when the character is alive and the game is not stopped,
     * and switches to the dead animation set if the character is dead.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.playAnimation(this.WALKING_SET);
            } else if (this.isDead()) {
                this.playAnimation(this.DEAD_SET)
            }
        }, 100);
    }

    /**
     * Triggers a jump at random intervals.
     * This method allows the character to jump with a random time variation, provided it's on the ground
     * and not currently in the middle of a jump.
     */
    intervalJump() {
        let JUMP_TIME = 1 + Math.random() * 0.8
        if (!this.isNotOnGround() && !this.isJumped(JUMP_TIME)) {
            this.lastJump = new Date().getTime();
            this.speedY += 23;
        }
    }

    /**
     * Checks if the character has recently jumped.
     * It determines if the time elapsed since the last jump is less than the specified jump interval.
     * 
     * @param {number} JUMP_TIME - The interval time in seconds within which the character cannot jump again.
     * @returns {boolean} - True if the character has jumped within the specified interval, false otherwise.
     */
    isJumped(JUMP_TIME) {
        return this.timeSince(this.lastJump) < JUMP_TIME;
    }
}